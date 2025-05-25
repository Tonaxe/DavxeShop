import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { UpdateProfile } from '../../models/user.model';

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
    imageBase64: '',
    password: ''
  };

  isEditing = false;
  originalProfile: any = {};

  constructor(private router: Router, private apiService: ApiService) {}

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
      this.profile.imageBase64 = parsed.imageBase64
    }
  }

  onEditProfile() {
    this.originalProfile = { ...this.profile };
    this.isEditing = true;
  }

 onSaveChanges() {
  const sessionUser = sessionStorage.getItem('user');
  if (!sessionUser) return;

  const user = JSON.parse(sessionUser).user;

  const updateRequest: UpdateProfile = {
    userId: user.userId,
    name: this.profile.name,
    email: this.profile.email,
    birthDate: this.profile.birthDate,
    dni: this.profile.dni,
    city: this.profile.city,
    imageBase64: this.profile.imageBase64,
    password: this.profile.password || undefined
  };

  this.apiService.updateProfile(updateRequest).subscribe({
    next: (response) => {
      const updatedUser = { ...user, ...updateRequest };
      sessionStorage.setItem('user', JSON.stringify({ user: updatedUser }));
      this.originalProfile = { ...this.profile };
      this.isEditing = false;
    },
    error: (err) => {
      console.error('Error al actualizar el perfil:', err);
    }
  });
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
        this.profile.imageBase64 = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
  
}