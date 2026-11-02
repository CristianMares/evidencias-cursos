import { Component } from '@angular/core';
import { GifListComponent } from '../../components/gif-list/gif-list.component';

@Component({
  selector: 'app-search-page',
  imports: [GifListComponent],
  template: `
    <h2 class="text-3xl font-bold mb-4">Buscador</h2>

    <div class="flex gap-2 mb-6">
      <input
        type="text"
        placeholder="Busca un gif"
        class="w-full rounded border border-slate-300 px-3 py-2"
      />
      <button class="rounded bg-blue-600 px-4 py-2 text-white">Buscar</button>
    </div>

    <gifs-gif-list [gifs]="[]" />
  `,
})
export default class SearchPageComponent {}
