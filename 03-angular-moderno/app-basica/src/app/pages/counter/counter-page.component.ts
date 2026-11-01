import { Component } from '@angular/core';

@Component({
  selector: 'app-counter-page',
  template: `
    <h1>Counter: {{ counter }}</h1>
    <button (click)="increaseBy(1)">+1</button>
    <button (click)="increaseBy(-1)">-1</button>
  `,
})
export class CounterPageComponent {
  counter = 10;

  increaseBy(value: number) {
    this.counter += value;
  }
}
