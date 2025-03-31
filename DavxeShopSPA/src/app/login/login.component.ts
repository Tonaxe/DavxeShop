import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { LogInRequest } from '../models/logIn.model';

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
      username: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }

  onSubmit() {
    console.log("entro1");
    if (this.loginForm.valid) {
      console.log("entro2");
      const form: LogInRequest = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };

      this.apiService.logIn(form).subscribe(
        (res) => {
          console.log("entro");
          this.router.navigate(["/home"]);
        },
        (error) => {
          console.log("gg?");
        }
      );
    } else {
      console.log('Formulario inválido');
    }
  }
}