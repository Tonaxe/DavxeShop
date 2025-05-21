import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { Producto } from '../../../models/product.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-product',
  standalone: false,
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  form: FormGroup;
  imagenPreview: string | ArrayBuffer | null = null;
  selectedFile!: File;

  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router, private http: HttpClient) {
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
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => this.imagenPreview = reader.result;
      reader.readAsDataURL(file);
    }
  }

  subirImagenACloudinary(): Promise<string> {
    const url = `https://api.cloudinary.com/v1_1/dywl1xsve/image/upload`;
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('upload_preset', 'DavxeShop');

    return this.http.post<any>(url, formData).toPromise().then(res => res.secure_url);
  }
  
  async guardarProducto(): Promise<void> {
    if (this.form.invalid || !this.selectedFile) {
      this.form.markAllAsTouched();
      return;
    }

    try {
      const imageUrl = await this.subirImagenACloudinary();
      this.form.patchValue({ ImagenUrl: imageUrl });
      const producto: Producto = this.form.value;
      this.apiService.addProduct(producto).subscribe({
        next: () => this.router.navigate(['/home']),
        error: (err) => console.error('Error al guardar producto', err)
      });
    } catch (error) {
      console.error('Error al subir imagen a Cloudinary', error);
    }
  }
}