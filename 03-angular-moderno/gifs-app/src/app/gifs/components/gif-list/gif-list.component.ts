import { Component, input } from '@angular/core';
import { GifListItemComponent } from './gif-list-item.component';

@Component({
  selector: 'gifs-gif-list',
  imports: [GifListItemComponent],
  template: `
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
      @for (imageUrl of imageUrls(); track imageUrl) {
        <gifs-gif-list-item [imageUrl]="imageUrl" />
      }
    </div>
  `,
})
export class GifListComponent {
  imageUrls = input.required<string[]>();
}
