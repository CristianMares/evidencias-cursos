import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  inject,
  input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { LifecycleLogService } from '../../services/lifecycle-log.service';

@Component({
  selector: 'app-lifecycle-child',
  templateUrl: './lifecycle-child.component.html',
})
export class LifecycleChildComponent
  implements OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked
{
  private logService = inject(LifecycleLogService);

  name = input('');

  constructor() {
    this.logService.log('constructor');
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
}
