import { Component } from '@angular/core';

@Component({
  selector: 'gifs-gif-list-item',
  template: `
    <div>
      <img class="h-auto w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg" alt="Gif" />
    </div>
  `,
})
export class GifListItemComponent {}
