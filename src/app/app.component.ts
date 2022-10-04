import { Component } from '@angular/core';

const STOCKS = ['apple', 'alphabet', 'microsoft', 'tesla'];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  readonly stocks = STOCKS;
}
