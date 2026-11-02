import { Component } from '@angular/core';

interface MenuOption {
  label: string;
  subLabel: string;
  route: string;
}

@Component({
  selector: 'gifs-side-menu-options',
  templateUrl: './side-menu-options.component.html',
})
export class SideMenuOptionsComponent {
  menuOptions: MenuOption[] = [
    { label: 'Trending', subLabel: 'Gifs populares', route: '/dashboard/trending' },
    { label: 'Buscador', subLabel: 'Buscar gifs', route: '/dashboard/search' },
  ];
}
