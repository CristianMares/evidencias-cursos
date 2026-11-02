import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { GifListComponent } from '../../components/gif-list/gif-list.component';
import { GifService } from '../../services/gifs.service';

@Component({
  selector: 'app-history-page',
  imports: [GifListComponent],
  template: `
    <h2 class="text-3xl font-bold mb-4">Historial: {{ query() }}</h2>
    <gifs-gif-list [gifs]="gifsByKey()" />
  `,
})
export default class HistoryPageComponent {
  gifService = inject(GifService);

  // El parametro :query de la URL llega como un observable; toSignal lo vuelve senal.
  query = toSignal(inject(ActivatedRoute).params.pipe(map((params) => params['query'])));

  gifsByKey = computed(() => this.gifService.getHistoryGifs(this.query()));
}
