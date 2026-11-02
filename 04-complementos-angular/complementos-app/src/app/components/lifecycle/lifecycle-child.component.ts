import {
  afterNextRender,
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  DestroyRef,
  DoCheck,
  ElementRef,
  inject,
  input,
  OnChanges,
  OnDestroy,
  OnInit,
  signal,
  SimpleChanges,
  viewChild,
} from '@angular/core';
import { LifecycleLogService } from '../../services/lifecycle-log.service';

@Component({
  selector: 'app-lifecycle-child',
  templateUrl: './lifecycle-child.component.html',
})
export class LifecycleChildComponent
  implements OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy
{
  private logService = inject(LifecycleLogService);

  name = input('');

  box = viewChild.required<ElementRef<HTMLDivElement>>('box');
  boxHeight = signal(0);

  constructor() {
    this.logService.log('constructor');

    // DestroyRef: otra forma de limpiar, junto al lugar donde se configura.
    inject(DestroyRef).onDestroy(() => {
      this.logService.log('DestroyRef.onDestroy');
    });

    // afterNextRender: corre una vez, cuando Angular ya pinto todo en el DOM.
    // Fase write: escribe estilos. Fase read: lee medidas (recibe lo que devolvio write).
    afterNextRender({
      write: () => {
        this.box().nativeElement.style.padding = '16px';
        return true;
      },
      read: (didWrite) => {
        if (didWrite) {
          this.logService.log('afterNextRender (write y read)');
          this.boxHeight.set(Math.round(this.box().nativeElement.getBoundingClientRect().height));
        }
      },
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    const change = changes['name'];
    if (change) {
      this.logService.log(
        `ngOnChanges: "${change.previousValue ?? ''}" -> "${change.currentValue}" (primer cambio: ${change.firstChange})`,
      );
    }
  }

  ngOnInit() {
    this.logService.log('ngOnInit');
  }

  // Los hooks "Checked" y ngDoCheck se ejecutan muy seguido: solo van a la consola.
  ngDoCheck() {
    console.log('ngDoCheck');
  }

  ngAfterContentInit() {
    this.logService.log('ngAfterContentInit');
  }

  ngAfterContentChecked() {
    console.log('ngAfterContentChecked');
  }

  ngAfterViewInit() {
    this.logService.log('ngAfterViewInit');
  }

  ngAfterViewChecked() {
    console.log('ngAfterViewChecked');
  }

  ngOnDestroy() {
    this.logService.log('ngOnDestroy');
  }
}
