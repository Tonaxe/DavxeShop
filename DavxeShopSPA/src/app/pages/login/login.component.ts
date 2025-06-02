import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LogInRequest } from '../../models/logIn.model';
import { ApiService } from '../../services/api.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const form: LogInRequest = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };

      this.apiService.logIn(form).subscribe({
        next: (res) => {
          sessionStorage.setItem('token', res.token);
          const decoded: any = jwtDecode(res.token);
          this.apiService.getUserById(decoded.userId).subscribe({
            next: (user: any) => {
              sessionStorage.setItem('user', JSON.stringify(user));
              if (user.user.rolId == 1) {
                this.router.navigate(['/dashboard']);
              } else {
                this.router.navigate(['/home']);
              }
            },
            error: (err) => {
              console.error('Error al obtener usuario:', err);
            }
          });
        },
        error: (err) => {
          console.error('Error en login:', err);
        }
      });
    } else {
      console.log('Formulario inválido');
    }
  }
}