import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetPasswordComponentRequest } from '../../models/resetPasswordRequest.model';

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
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { email?: string };
    
    if (state?.email) {
      this.email = state.email;
    }
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  onSubmit() {
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