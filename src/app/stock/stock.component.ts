import { Subscription } from 'rxjs';

import { Component, HostBinding, Input, OnInit } from '@angular/core';

import { StocksService } from './stocks.service';

export type Stock = {
  name: string;
  price: number;
  oldPrice: number;
  lastTrade: Date;
  vol: number;
}

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
  providers: [StocksService],
})
export class StockComponent implements OnInit {
  @Input() name = '';

  active = true;
  stock: Stock | undefined;

  subscription: Subscription | undefined;

  @HostBinding('class') get class(): string {
    if (!this.active) { return ''; }
    return this.differance && this.differance > 0 ? 'increase': 'decrease' ;
  }

  constructor(
    private readonly stocksService: StocksService,
  ) { }

  ngOnInit(): void {
    this.startWatching();
  }

  startWatching() {
     this.subscription = this.stocksService.getStock(this.name).subscribe((stock) => {
      this.stock = stock;
    })
  }

  stopWatching() {
    this.subscription?.unsubscribe();
  }

  onSwitchClick(event: any) {
    console.log("event", event);

    if(event.pointerType.length > 0) { return; }
    this.active = !this.active;
    console.log("active", this.active);

    this.active ? this.subscription?.closed && this.startWatching() : !this.subscription?.closed && this.stopWatching();
  }

  get differance () {
    if (!this.stock) return;
    return +(100 - (this.stock.price * 100) / this.stock.oldPrice).toFixed(2) * -1;
  }

}
