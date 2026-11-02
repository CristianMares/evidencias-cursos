import { Component, inject } from '@angular/core';
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

  onSubmit() {
    console.log('Formulario enviado', this.contactForm.value);
  }
}
