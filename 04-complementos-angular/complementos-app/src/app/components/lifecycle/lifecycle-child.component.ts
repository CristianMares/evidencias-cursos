import { Component, inject, OnInit } from '@angular/core';
import { LifecycleLogService } from '../../services/lifecycle-log.service';

@Component({
  selector: 'app-lifecycle-child',
  templateUrl: './lifecycle-child.component.html',
})
export class LifecycleChildComponent implements OnInit {
  private logService = inject(LifecycleLogService);

  constructor() {
    this.logService.log('constructor');
  }

  ngOnInit() {
    this.logService.log('ngOnInit');
  }
}
