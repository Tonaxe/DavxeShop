import { Component } from '@angular/core';


@Component({
  selector: 'app-perfil',
  standalone: false,
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {
 // Aquí definimos un objeto 'profile' que contiene la información del usuario
 profile = {
  name: 'tun tun tun sahur',
  email: 'tun tun tun sahurz@example.com',
  phone: '123-456-7890',
  address: 'Calle Ficticia 123',
  avatar: 'assets/avatar.png'  // Aquí pondremos la ruta de la imagen
};
  router: any;

// Métodos para las acciones de editar perfil y cerrar sesión
onEditProfile() {
  console.log('Editando perfil');
  // Lógica para editar el perfil
}

onLogout() {
  console.log('Cerrando sesión');
  // Aquí iría la lógica para cerrar la sesión (ej. eliminar token, limpiar almacenamiento local, etc.)
  
  // Redirigir a la página de login
  this.router.navigate(['/login']);
}
}
