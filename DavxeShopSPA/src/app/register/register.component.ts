import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterRequest } from '../models/register.model';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dni: ['', Validators.required],
      birthDate: ['', Validators.required],
      city: ['', Validators.required], 
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const form: RegisterRequest = {
        dni: this.registerForm.value.dni,
        name: this.registerForm.value.name,
        email: this.registerForm.value.email,
        birthDate: this.registerForm.value.birthDate,
        city: this.registerForm.value.city,
        password: this.registerForm.value.password
      };

      this.apiService.register(form).subscribe(
        (res) => {
          console.log("Registro exitoso:", res);
          this.router.navigate(["/login"]);
        },
        (error) => {
          console.error("Error en el registro:", error);
        }
      );
    } else {
      console.log('Formulario de registro inválido');
    }
  }
}
