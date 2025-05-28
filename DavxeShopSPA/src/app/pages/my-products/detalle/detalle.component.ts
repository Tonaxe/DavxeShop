import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto, ProductoResponse } from '../../../models/product.model';
import { ApiService } from '../../../services/api.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-detalle',
  standalone: false,
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.css'
})
export class DetalleComponent implements OnInit {
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
    estado: ''
  };
  categorias: { categoriaId: number; nombre: string }[] = [];

  esProductoMio: boolean | null = null;
  
  constructor(private router: Router, private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit(): void {
    const userJson = sessionStorage.getItem('user');
    if (userJson) {
      this.user = JSON.parse(userJson).user;
    }
    const categoriasJson = sessionStorage.getItem('categorias');
    if (categoriasJson) {
      this.categorias = JSON.parse(categoriasJson);
    }

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.apiService.getProductosByProductoId(+id).subscribe({
        next: (res: ProductoResponse) => {
          this.producto = res.producto;
          this.esProductoMio = this.user?.userId === this.producto?.userId;
        },
        error: (err) => {
          console.error('Error al cargar producto:', err);
        }
      });
    }
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

  editarProducto(): void {
    this.router.navigate(['/add-product'], { state: { producto: this.producto } });
  }

  eliminarProducto(): void {
    // Aquí implementa la lógica para eliminar el producto si quieres
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