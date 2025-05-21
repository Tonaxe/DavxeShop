import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  standalone: false,
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'] 
})
export class PerfilComponent implements OnInit {
  profile = {
    name: '',
    email: '',
    birthDate: '',
    dni: '',
    city: '',
    avatar: '',
    password: '',
    card: {
      number: '',
      expiry: '',
      cvv: ''
    }
  };

  isEditing = false;
  originalProfile: any = {};

  constructor(private router: Router) {}

  ngOnInit(): void {
    const sessionUser = sessionStorage.getItem('user');
    if (sessionUser) {
      const parsed = JSON.parse(sessionUser).user;
      console.log(parsed.userId);
      this.profile.name = parsed.name;
      this.profile.email = parsed.email;
      this.profile.birthDate = parsed.birthDate?.split('T')[0];
      this.profile.dni = parsed.dni;
      this.profile.city = parsed.city;
      this.profile.avatar = parsed.imageBase64
    }
  }

  onEditProfile() {
    this.originalProfile = { ...this.profile };
    this.isEditing = true;
  }

  onSaveChanges() {
    this.isEditing = false;
  }

  onCancel() {
    this.profile = { ...this.originalProfile };
    this.isEditing = false;
  }

  onLogout() {
    this.router.navigate(['/login']);
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