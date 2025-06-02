import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { ApiService } from '../../../services/api.service';
import { Producto } from '../../../models/product.model';
import { Categoria } from '../../../models/categoria.model';
import { Estado } from '../../../models/estado.model';

@Component({
  selector: 'app-add-product',
  standalone: false,
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit {
  form: FormGroup;
  imagenPreview: string | ArrayBuffer | null = null;
  selectedFile!: File;
  categorias: Categoria[] = [];
  estados: Estado[] = [];

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private http: HttpClient
  ) {
    const userData = sessionStorage.getItem('user');
    const userId = userData ? JSON.parse(userData).user.userId : null;

    this.form = this.fb.group({
      Nombre: ['', Validators.required],
      Precio: [0, [Validators.required, Validators.min(0)]],
      Descripcion: ['', Validators.required],
      Categoria: ['', Validators.required],
      Estado: ['', Validators.required],
      ImagenUrl: [''],
      FechaPublicacion: [new Date().toISOString()],
      UserId: [userId, Validators.required]
    });
  }

  ngOnInit(): void {
    this.cargarCategoriasDesdeStorage();
    this.cargarEstadosDesdeStorage();
  }

  private cargarCategoriasDesdeStorage(): void {
    const categoriasStorage = sessionStorage.getItem('categorias');
    if (categoriasStorage) {
      const parsed = JSON.parse(categoriasStorage);
      this.categorias = Array.isArray(parsed) ? parsed : parsed.categorias;
    }
  }

  private cargarEstadosDesdeStorage(): void {
    const estadosStorage = sessionStorage.getItem('estados');
    if (estadosStorage) {
      const parsed = JSON.parse(estadosStorage);
      const rawEstados = Array.isArray(parsed) ? parsed : parsed.estados;
      this.estados = rawEstados.map((e: any) => ({
        ...e,
        estadoId: +e.estadoId
      }));
    }
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
      producto.estado = 1;

      this.apiService.addProduct(producto).subscribe({
        next: () => this.router.navigate(['/home']),
        error: (err) => console.error('Error al guardar producto', err)
      });
    } catch (error) {
      console.error('Error al subir imagen a Cloudinary', error);
    }
  }
}