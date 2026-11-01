import { Component, inject } from '@angular/core';
import { DragonballCharacterAddComponent } from '../../components/dragonball/dragonball-character-add.component';
import { DragonballCharacterListComponent } from '../../components/dragonball/dragonball-character-list.component';
import { DragonballService } from '../../services/dragonball.service';

@Component({
  selector: 'app-dragonball-super-page',
  imports: [DragonballCharacterListComponent, DragonballCharacterAddComponent],
  templateUrl: './dragonball-super-page.component.html',
})
export class DragonballSuperPageComponent {
  // Inyeccion del servicio: el estado vive en el servicio, no en la pagina.
  public dragonballService = inject(DragonballService);
}
