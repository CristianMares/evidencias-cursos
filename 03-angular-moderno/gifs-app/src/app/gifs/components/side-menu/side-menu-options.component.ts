import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GifService } from '../../services/gifs.service';

interface MenuOption {
  label: string;
  subLabel: string;
  route: string;
}

@Component({
  selector: 'gifs-side-menu-options',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu-options.component.html',
})
export class SideMenuOptionsComponent {
  gifService = inject(GifService);

  menuOptions: MenuOption[] = [
    { label: 'Trending', subLabel: 'Gifs populares', route: '/dashboard/trending' },
    { label: 'Buscador', subLabel: 'Buscar gifs', route: '/dashboard/search' },
  ];
}
