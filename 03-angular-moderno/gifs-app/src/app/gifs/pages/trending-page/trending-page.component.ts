import { Component } from '@angular/core';
import { GifListComponent } from '../../components/gif-list/gif-list.component';

const imageUrls: string[] = [
  'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg',
  'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg',
  'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg',
  'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg',
  'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg',
  'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg',
];

@Component({
  selector: 'app-trending-page',
  imports: [GifListComponent],
  template: `
    <h2 class="text-3xl font-bold mb-4">Trending</h2>
    <gifs-gif-list [imageUrls]="gifs" />
  `,
})
export default class TrendingPageComponent {
  gifs = imageUrls;
}
