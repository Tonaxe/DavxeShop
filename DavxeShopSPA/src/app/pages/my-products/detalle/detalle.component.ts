import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto, ProductoResponse } from '../../../models/product.model';
import { ApiService } from '../../../services/api.service';
import { User } from '../../../models/user.model';
import { Estado } from '../../../models/estado.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-detalle',
  standalone: false,
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.css'
})
export class DetalleComponent implements OnInit {
  isEditingProducto = false;
  originalProducto: any;
  esFavorito: boolean = false;
  user: User | null = null;
  producto: Producto = {
    productoId: 0,
    nombre: '',
    descripcion: '',
    precio: 0,
    fechaPublicacion: '',
    categoria: '',
    imagenUrl: '',
    userId: 0,
    userNombre: '',
    userCiudad: '',
    estado: 0
  };
  categorias: { categoriaId: number; nombre: string }[] = [];
  esProductoMio: boolean | null = null;
  productoOriginal: any;
  estados: Estado[] = [];
  selectedImageFile: File | null = null;
  imagenPreviewUrl: string | null = null;

  constructor(private router: Router, private route: ActivatedRoute, private apiService: ApiService, private http: HttpClient) { }

  ngOnInit(): void {
    const userJson = sessionStorage.getItem('user');
    if (userJson) {
      this.user = JSON.parse(userJson).user;
    }

    const categoriasJson = sessionStorage.getItem('categorias');
    if (categoriasJson) {
      this.categorias = JSON.parse(categoriasJson);
    }

    const estadosJson = sessionStorage.getItem('estados');
    if (estadosJson) {
      this.estados = JSON.parse(estadosJson);
    }

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.apiService.getProductosByProductoId(+id).subscribe({
        next: (res: ProductoResponse) => {
          this.producto = res.producto;
          this.esProductoMio = this.user?.userId === this.producto?.userId;
          console.log(res.producto.estado);
          console.log('Estados:', this.estados);
          console.log('Producto estado:', this.producto.estado);

        },
        error: (err: any) => {
          console.error('Error al cargar producto:', err);
        }
      });
    }
  }

  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImageFile = input.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.imagenPreviewUrl = reader.result as string;
        this.producto.imagenUrl = this.imagenPreviewUrl;
      };
      reader.readAsDataURL(this.selectedImageFile);
    }
  }


  getEstadoNombre(estadoId: number): string {
    const estado = this.estados.find(e => e.estadoId === estadoId);
    return estado ? estado.nombre : 'Desconocido';
  }

  onEditarProducto() {
    this.isEditingProducto = true;
    this.productoOriginal = { ...this.producto };
  }

  toggleFavorito(): void {
    this.esFavorito = !this.esFavorito;
  }

  volverAtras(): void {
    this.router.navigate(['/my-products']);
  }

  Chat(): void {
    this.router.navigate(['/chat']);
  }

  comprar(): void {
    this.router.navigate(['/comprar'], { state: { producto: this.producto } });
  }

  async guardarCambios(): Promise<void> {
    try {
      if (this.selectedImageFile) {
        const imageUrl = await this.subirImagenACloudinary(this.selectedImageFile);
        this.producto.imagenUrl = imageUrl;
      }

      this.apiService.editarProducto(this.producto).subscribe({
        next: () => {
          this.isEditingProducto = false;
          this.selectedImageFile = null;
          this.imagenPreviewUrl = null
        },
        error: (err: any) => {
          console.error('Error al actualizar producto:', err);
        }
      });
    } catch (error) {
      console.error('Error al subir imagen a Cloudinary', error);
    }
  }

  subirImagenACloudinary(file: File): Promise<string> {
    const url = `https://api.cloudinary.com/v1_1/dywl1xsve/image/upload`;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'DavxeShop');

    return this.http.post<any>(url, formData).toPromise().then(res => res.secure_url);
  }

  cancelarEdicion() {
    this.producto = { ...this.productoOriginal };
    this.isEditingProducto = false;
  }

  eliminarProducto(): void {
    console.log('Simulando eliminación de producto');
    alert('Producto eliminado (simulado)');
    this.router.navigate(['/my-products']);
  }

  getCategoriaNombre(categoriaId: number): string {
    const categoria = this.categorias.find(cat => cat.categoriaId === categoriaId);
    return categoria ? categoria.nombre : 'Desconocida';
  }

  getFechaPublicacionTexto(fechaISO: string): string {
    if (!fechaISO) return '';
    const fecha = new Date(fechaISO);
    const ahora = new Date();
    const diffMs = ahora.getTime() - fecha.getTime();

    const diffSegundos = Math.floor(diffMs / 1000);
    const diffMinutos = Math.floor(diffSegundos / 60);
    const diffHoras = Math.floor(diffMinutos / 60);
    const diffDias = Math.floor(diffHoras / 24);

    if (diffSegundos < 60) {
      return 'Hace unos segundos';
    } else if (diffMinutos < 60) {
      return `Hace ${diffMinutos} minuto${diffMinutos > 1 ? 's' : ''}`;
    } else if (diffHoras < 24) {
      return `Hace ${diffHoras} hora${diffHoras > 1 ? 's' : ''}`;
    } else if (diffDias < 7) {
      return `Hace ${diffDias} día${diffDias > 1 ? 's' : ''}`;
    } else {
      return fecha.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      });
    }
  }
}
