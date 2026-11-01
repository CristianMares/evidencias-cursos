import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import { Character } from '../../interfaces/character.interface';

@Component({
  selector: 'dragonball-character-list',
  imports: [NgClass],
  templateUrl: './dragonball-character-list.component.html',
})
export class DragonballCharacterListComponent {
  // Signal input: el padre le manda los personajes.
  characters = input.required<Character[]>();
}
