// 07 - Clases y enumerados.
export {};

class MiClase {
  name: string;
  age: number;

  // El constructor obliga a dar nombre y edad al crear el objeto.
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

const miObjeto: MiClase = new MiClase("Cristian", 36);
console.log(miObjeto);
console.log(miObjeto.name);

// const sinDatos = new MiClase(); // error: faltan argumentos

// enum: conjunto de valores con nombre.
enum MiEnum {
  Lunes = "lunes",
  Martes = "martes",
  Miercoles = "miercoles",
}

const dia: MiEnum = MiEnum.Martes;
console.log(dia); // "martes"
