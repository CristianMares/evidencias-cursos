import { Component } from '@angular/core';
import { SideMenuHeaderComponent } from './side-menu-header.component';
import { SideMenuOptionsComponent } from './side-menu-options.component';

@Component({
  selector: 'gifs-side-menu',
  imports: [SideMenuHeaderComponent, SideMenuOptionsComponent],
  template: `
    <aside class="w-72 h-full bg-slate-800 text-white p-4">
      <gifs-side-menu-header />
      <gifs-side-menu-options />
    </aside>
  `,
})
export class SideMenuComponent {}
