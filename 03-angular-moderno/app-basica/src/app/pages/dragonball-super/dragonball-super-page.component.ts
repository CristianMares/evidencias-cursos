import { Component, signal } from '@angular/core';
import { DragonballCharacterAddComponent } from '../../components/dragonball/dragonball-character-add.component';
import { DragonballCharacterListComponent } from '../../components/dragonball/dragonball-character-list.component';
import { Character } from '../../interfaces/character.interface';

@Component({
  selector: 'app-dragonball-super-page',
  imports: [DragonballCharacterListComponent, DragonballCharacterAddComponent],
  templateUrl: './dragonball-super-page.component.html',
})
export class DragonballSuperPageComponent {
  characters = signal<Character[]>([
    { id: 1, name: 'Goku', power: 9001 },
    { id: 2, name: 'Vegeta', power: 8000 },
  ]);

  addCharacter(character: Character) {
    this.characters.update((list) => [...list, character]);
  }
}
