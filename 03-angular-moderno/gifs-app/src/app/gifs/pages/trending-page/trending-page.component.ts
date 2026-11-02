import { Component, inject } from '@angular/core';
import { GifListComponent } from '../../components/gif-list/gif-list.component';
import { GifService } from '../../services/gifs.service';

@Component({
  selector: 'app-trending-page',
  imports: [GifListComponent],
  template: `
    <h2 class="text-3xl font-bold mb-4">Trending</h2>
    <gifs-gif-list [gifs]="gifService.trendingGifs()" />
  `,
})
export default class TrendingPageComponent {
  gifService = inject(GifService);
}
