import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

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
  menuOptions: MenuOption[] = [
    { label: 'Trending', subLabel: 'Gifs populares', route: '/dashboard/trending' },
    { label: 'Buscador', subLabel: 'Buscar gifs', route: '/dashboard/search' },
  ];
}
