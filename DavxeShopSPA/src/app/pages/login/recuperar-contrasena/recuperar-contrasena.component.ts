import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-recuperar-contrasena',
  standalone: false,
  templateUrl: './recuperar-contrasena.component.html',
  styleUrl: './recuperar-contrasena.component.css'
})
export class RecuperarContrasenaComponent {
  recPasswordForm: FormGroup;
  codeForm: FormGroup;
  emailSent = false; 
  emailValue = '';

  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router) {
    this.recPasswordForm = this.fb.group({
      email: ['', Validators.required]
    });

    this.codeForm = this.fb.group({
      recoveryCode: ['', Validators.required]
    });
  }

  sendRecoveryEmail() {
    if (this.recPasswordForm.valid) {
      this.emailValue = this.recPasswordForm.value.email;
      
      this.apiService.recoverPassword(this.emailValue).subscribe(
        (res) => {
          this.emailSent = true;
        },
        (error) => {
          console.log("Error al enviar el correo", error);
        }
      );
    } else {
      console.log('Formulario inválido');
    }
  }

  verifyCode() {
    if (this.codeForm.valid) {
      const recoveryData = {
        email: this.emailValue,
        recoveryCode: this.codeForm.value.recoveryCode
      };

      this.apiService.verifyRecoveryCode(recoveryData).subscribe(
        (res) => {
          this.router.navigate(["/reset-password"], { queryParams: { email: this.emailValue } });
        },
        (error) => {
          console.log("Código incorrecto", error);
        }
      );
    } else {
      console.log('Código inválido');
    }
  }
}