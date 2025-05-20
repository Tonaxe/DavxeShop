import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { ResetPasswordComponentRequest } from '../../../models/resetPasswordRequest.model';

@Component({
  selector: 'app-reset-password',
  standalone: false,
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit  {
  resetPassword: FormGroup;
  email: string | null = null;

  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router, private route: ActivatedRoute) {
    this.resetPassword = this.fb.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
    this.email = params['email'] ?? null;
    });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  onSubmit() {
    console.log(this.resetPassword);
    console.log(this.email);
    if (this.resetPassword.valid && this.email) {
      const form: ResetPasswordComponentRequest = {
        email: this.email,
        password: this.resetPassword.value.password
      };

      this.apiService.changePassword(form).subscribe(
        (res) => {
          this.router.navigate(["/login"]);
        },
        (error) => {
          console.error("Error al restablecer la contraseña:", error);
        }
      );
    } else {
      console.log('Formulario de restablecimiento inválido o falta el email');
    }
  }
}