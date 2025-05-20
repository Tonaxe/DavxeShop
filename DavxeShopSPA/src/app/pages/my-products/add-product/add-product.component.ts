import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { Producto } from '../../../models/product.model';

@Component({
  selector: 'app-add-product',
  standalone: false,
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  form: FormGroup;
  imagenPreview: string | ArrayBuffer | null = null;

  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router) {
    const userData = sessionStorage.getItem('user');
    const userId = userData ? JSON.parse(userData).user.userId : null;

    this.form = this.fb.group({
      Nombre: ['', Validators.required],
      Precio: [0, [Validators.required, Validators.min(0)]],
      Descripcion: ['', Validators.required],
      Categoria: ['', Validators.required],
      ImagenUrl: [''],
      FechaPublicacion: [new Date().toISOString()],
      UserId: [userId, Validators.required]
    });
  }

  mostrarVistaPrevia(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagenPreview = reader.result;

        const base64 = (reader.result as string).split(',')[1]; // solo base64

        this.form.patchValue({ ImagenUrl: base64 });
      };
      reader.readAsDataURL(file);
    }
  }
  
  guardarProducto(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const producto: Producto = this.form.value;

    this.apiService.addProduct(producto).subscribe({
      next: () => this.router.navigate(['/home']),
      error: (err) => console.error('Error al guardar producto', err)
    });
  }
}