import { Component, input } from '@angular/core';
import { Gif } from '../../interfaces/gif.interface';
import { GifListItemComponent } from './gif-list-item.component';

@Component({
  selector: 'gifs-gif-list',
  imports: [GifListItemComponent],
  template: `
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
      @for (gif of gifs(); track gif.id) {
        <gifs-gif-list-item [imageUrl]="gif.url" />
      }
    </div>
  `,
})
export class GifListComponent {
  gifs = input.required<Gif[]>();
}
