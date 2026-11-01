import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import { Character } from '../../interfaces/character.interface';

@Component({
  selector: 'dragonball-character-list',
  imports: [NgClass],
  templateUrl: './dragonball-character-list.component.html',
})
export class DragonballCharacterListComponent {
  characters = input.required<Character[]>();
  listName = input.required<string>();
}
