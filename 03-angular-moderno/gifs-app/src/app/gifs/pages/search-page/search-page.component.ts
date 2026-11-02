import { Component, inject, signal } from '@angular/core';
import { GifListComponent } from '../../components/gif-list/gif-list.component';
import { Gif } from '../../interfaces/gif.interface';
import { GifService } from '../../services/gifs.service';

@Component({
  selector: 'app-search-page',
  imports: [GifListComponent],
  template: `
    <h2 class="text-3xl font-bold mb-4">Buscador</h2>

    <div class="flex gap-2 mb-6">
      <input
        #txtSearch
        type="text"
        placeholder="Busca un gif"
        class="w-full rounded border border-slate-300 px-3 py-2"
        (keyup.enter)="onSearch(txtSearch.value)"
      />
      <button class="rounded bg-blue-600 px-4 py-2 text-white" (click)="onSearch(txtSearch.value)">
        Buscar
      </button>
    </div>

    <gifs-gif-list [gifs]="gifs()" />
  `,
})
export default class SearchPageComponent {
  gifService = inject(GifService);
  gifs = signal<Gif[]>([]);

  onSearch(query: string) {
    if (query.trim().length === 0) return;

    this.gifService.searchGifs(query).subscribe((resp) => {
      this.gifs.set(resp);
    });
  }
}
