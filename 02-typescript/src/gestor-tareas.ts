// Mini proyecto: gestor de tareas por consola.
// Junta lo visto en el curso: tipos, funciones, clases, enum, Array y Map.
export {};

enum Prioridad {
  Baja = "baja",
  Media = "media",
  Alta = "alta",
}

class Tarea {
  id: number;
  titulo: string;
  prioridad: Prioridad;
  completada: boolean;

  constructor(id: number, titulo: string, prioridad: Prioridad) {
    this.id = id;
    this.titulo = titulo;
    this.prioridad = prioridad;
    this.completada = false;
  }
}

class GestorTareas {
  tareas: Tarea[] = [];
  private siguienteId: number = 1;

  agregar(titulo: string, prioridad: Prioridad): Tarea {
    const tarea = new Tarea(this.siguienteId, titulo, prioridad);
    this.siguienteId++;
    this.tareas.push(tarea);
    return tarea;
  }

  completar(id: number): boolean {
    for (const tarea of this.tareas) {
      if (tarea.id === id) {
        tarea.completada = true;
        return true;
      }
    }
    return false;
  }

  eliminar(id: number): boolean {
    const antes = this.tareas.length;
    this.tareas = this.tareas.filter((tarea) => tarea.id !== id);
    return this.tareas.length < antes;
  }

  contarPorPrioridad(): Map<Prioridad, number> {
    const conteo = new Map<Prioridad, number>();
    for (const tarea of this.tareas) {
      const actual = conteo.get(tarea.prioridad) ?? 0;
      conteo.set(tarea.prioridad, actual + 1);
    }
    return conteo;
  }

  mostrar(): void {
    if (this.tareas.length === 0) {
      console.log("No hay tareas");
      return;
    }
    for (const tarea of this.tareas) {
      const marca = tarea.completada ? "[x]" : "[ ]";
      console.log(`${marca} #${tarea.id} ${tarea.titulo} (${tarea.prioridad})`);
    }
  }
}

// Demo
const gestor = new GestorTareas();
gestor.agregar("Terminar el curso de TypeScript", Prioridad.Alta);
gestor.agregar("Practicar Git", Prioridad.Media);
gestor.agregar("Leer sobre Angular", Prioridad.Baja);
gestor.agregar("Subir evidencias a GitHub", Prioridad.Alta);

console.log("--- Tareas iniciales ---");
gestor.mostrar();

gestor.completar(2);
gestor.eliminar(3);

console.log("--- Despues de completar la 2 y eliminar la 3 ---");
gestor.mostrar();

console.log("--- Tareas por prioridad ---");
for (const [prioridad, cantidad] of gestor.contarPorPrioridad()) {
  console.log(prioridad, cantidad);
}
