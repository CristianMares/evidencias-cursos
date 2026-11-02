import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive-form-page',
  imports: [ReactiveFormsModule],
  templateUrl: './reactive-form-page.component.html',
})
export default class ReactiveFormPageComponent {
  private fb = inject(FormBuilder);

  // Cada campo: [valor inicial, validadores].
  contactForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    checkAdult: [false, [Validators.requiredTrue]],
    department: [''],
    comment: ['', [Validators.required, Validators.maxLength(300)]],
  });

  sentValue = signal<string | null>(null);

  // patchValue: cambia solo los campos que le pasas.
  patchName() {
    this.contactForm.patchValue({ name: 'Cristian' });
  }

  // setValue: obliga a pasar TODOS los campos; si falta uno lanza un error.
  setAllValues() {
    this.contactForm.setValue({
      name: 'Cristian Mares',
      checkAdult: true,
      department: 'sistemas',
      comment: 'Hola mundo',
    });
  }

  onSubmit() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    console.log('Formulario enviado', this.contactForm.value);
    this.sentValue.set(JSON.stringify(this.contactForm.value, null, 2));
    this.contactForm.reset();
  }
}
