import { Component } from '@angular/core';
import { GifListItemComponent } from './gif-list-item.component';

@Component({
  selector: 'gifs-gif-list',
  imports: [GifListItemComponent],
  template: `
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
      @for (item of [1, 2, 3, 4, 5, 6]; track item) {
        <gifs-gif-list-item />
      }
    </div>
  `,
})
export class GifListComponent {}
