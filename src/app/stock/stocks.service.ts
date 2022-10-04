import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';

import { Stock } from './stock.component';

@Injectable()
export class StocksService {

  mockStocks: Record<string, Stock> = {
    'apple': {
      name: 'apple',
      price: 50,
      oldPrice: 60,
      lastTrade: new Date(),
      vol: 2000
    },
    'alphabet': {
      name: 'alphabet',
      price: 100,
      oldPrice: 120,
      lastTrade: new Date(),
      vol: 3000
    },
    'microsoft': {
      name: 'microsoft',
      price: 1050,
      oldPrice: 1060,
      lastTrade: new Date(),
      vol: 4000
    },
    'tesla': {
      name: 'tesla',
      price: 5020,
      oldPrice: 5500,
      lastTrade: new Date(),
      vol: 8000
    },
  }

  constructor() { }

  getStock(name: string): Observable<Stock> {
    return new Observable((observer: any) => {
      observer.next('Observable One is alive!');
      observer.next(this.mockStocks[name]);

      let randomInterval = Math.floor(Math.random() * 10000) + 2000;
      setInterval(() => {
        observer.next(this.updateStock(this.mockStocks[name]));
      }, randomInterval);
    });
  }

  updateStock(stock: Stock): Stock {
    const sign = Math.round(Math.random()) === 1 ? 1 : -1;
    const differance = Math.floor(Math.random() * 10);

    this.mockStocks[stock.name] = {
      name: stock.name,
      price: stock.price + sign * (differance / 100) * stock.price,
      oldPrice: +stock.price.toFixed(2),
      lastTrade: new Date(),
      vol: Math.floor(stock.vol + sign * (differance / 100) * stock.vol),
    };
    return this.mockStocks[stock.name];
  }
}
