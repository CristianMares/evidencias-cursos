import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
})
export class HeroPageComponent {
  name = signal('Ironman');
  age = signal(45);

  // Senales computadas: de solo lectura, se recalculan cuando cambian name o age.
  heroDescription = computed(() => `${this.name()} - ${this.age()}`);
  capitalizedName = computed(() => this.name().toUpperCase());

  changeHero() {
    this.name.set('Spiderman');
    this.age.set(22);
  }

  changeAge() {
    this.age.set(60);
  }

  resetForm() {
    this.name.set('Ironman');
    this.age.set(45);
  }
}
