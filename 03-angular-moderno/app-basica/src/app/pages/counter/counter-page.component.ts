import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-counter-page',
  templateUrl: './counter-page.component.html',
  styleUrl: './counter-page.component.css',
})
export class CounterPageComponent {
  counter = signal(10);

  increaseBy(value: number) {
    this.counter.update((current) => current + value);
  }

  resetCounter() {
    this.counter.set(10);
  }
}
