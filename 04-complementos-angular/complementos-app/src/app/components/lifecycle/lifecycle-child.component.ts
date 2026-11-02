import { Component, inject, input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { LifecycleLogService } from '../../services/lifecycle-log.service';

@Component({
  selector: 'app-lifecycle-child',
  templateUrl: './lifecycle-child.component.html',
})
export class LifecycleChildComponent implements OnChanges, OnInit {
  private logService = inject(LifecycleLogService);

  name = input('');

  constructor() {
    this.logService.log('constructor');
  }

  // Se ejecuta cada vez que cambia un input, incluso antes de ngOnInit.
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
}
