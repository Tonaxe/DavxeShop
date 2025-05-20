import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Asegúrate de importar Router

@Component({
  selector: 'app-perfil',
  standalone: false,
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']  // Cambié 'styleUrl' por 'styleUrls' ya que es la forma correcta
})
export class PerfilComponent {
  profile = {
    name: 'tun tun tun sahur',
    email: 'tun tun tun sahurz@example.com',
    phone: '123-456-7890',
    address: 'Calle Ficticia 123',
    avatar: 'assets/said_pf.jpeg',
    password: '',
    birthDate: '',
    card: {
      number: '',
      expiry: '',
      cvv: ''
    }
  };
  

  isEditing = false; // Controla si se está editando o no
  originalProfile: any = {}; // Guarda una copia para cancelar cambios

  constructor(private router: Router) {} // Inyectamos el Router para manejar la navegación

  onEditProfile() {
    console.log('Editando perfil');
    this.originalProfile = { ...this.profile }; // Guardamos copia del perfil actual
    this.isEditing = true;
  }

  onSaveChanges() {
    console.log('Guardando cambios:', this.profile);
    // Aquí podrías validar datos o enviar a un servicio
    this.isEditing = false;
  }

  onCancel() {
    this.profile = { ...this.originalProfile }; // Restauramos datos originales
    this.isEditing = false;
    console.log('Edición cancelada');
  }

  onLogout() {
    console.log('Cerrando sesión');
    this.router.navigate(['/login']); // Navegamos a la página de login
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.profile.avatar = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
}
