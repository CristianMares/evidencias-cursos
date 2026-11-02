import { Component } from '@angular/core';
import { GifListComponent } from '../../components/gif-list/gif-list.component';

@Component({
  selector: 'app-trending-page',
  imports: [GifListComponent],
  template: `
    <h2 class="text-3xl font-bold mb-4">Trending</h2>
    <gifs-gif-list />
  `,
})
export default class TrendingPageComponent {}
