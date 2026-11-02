import { Component, inject, signal } from '@angular/core';
import { LifecycleChildComponent } from '../../components/lifecycle/lifecycle-child.component';
import { LifecycleLogService } from '../../services/lifecycle-log.service';

@Component({
  selector: 'app-lifecycle-page',
  imports: [LifecycleChildComponent],
  templateUrl: './lifecycle-page.component.html',
})
export default class LifecyclePageComponent {
  logService = inject(LifecycleLogService);

  name = signal('Angular');
  showChild = signal(true);

  toggleChild() {
    this.showChild.update((value) => !value);
  }
}
