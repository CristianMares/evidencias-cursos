import { Injectable, signal } from '@angular/core';

// Guarda un registro de los hooks que se van ejecutando para mostrarlo en pantalla.
@Injectable({ providedIn: 'root' })
export class LifecycleLogService {
  logs = signal<string[]>([]);

  log(hook: string) {
    const line = `${new Date().toLocaleTimeString()} - ${hook}`;
    console.log(line);
    this.logs.update((list) => [...list, line]);
  }

  clear() {
    this.logs.set([]);
  }
}
