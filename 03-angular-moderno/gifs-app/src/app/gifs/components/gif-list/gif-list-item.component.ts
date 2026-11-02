import { Component, input } from '@angular/core';

@Component({
  selector: 'gifs-gif-list-item',
  template: `
    <div>
      <img class="h-auto w-full rounded-lg" [src]="imageUrl()" alt="Gif" />
    </div>
  `,
})
export class GifListItemComponent {
  imageUrl = input.required<string>();
}
