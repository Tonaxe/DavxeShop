import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { User } from '../../models/user.model';
import { Producto, ProductosResponse } from '../../models/product.model';
import { Estado } from '../../models/estado.model';

@Component({
  selector: 'app-my-products',
  standalone: false,
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.css']
})
export class MyProductsComponent implements OnInit {
  user!: User;
  productos: Producto[] = [];
  estados: Estado[] = [];
  miUserId!: number;

  constructor(private router: Router, private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const sessionUser = sessionStorage.getItem('user');
    if (sessionUser) {
      this.miUserId = JSON.parse(sessionUser).user.userId;
    }

    this.route.paramMap.subscribe(params => {
      const userIdParam = params.get('userId');
      if (userIdParam) {
        const userId = Number(userIdParam);
        this.cargarDatosUsuario(userId);
      } else if (sessionUser) {
        this.user = JSON.parse(sessionUser).user as User;
        this.cargarProductos(this.user.userId);
      }
    });

    const estadosJson = sessionStorage.getItem('estados');
    if (estadosJson) {
      this.estados = JSON.parse(estadosJson);
    }
  }

  cargarDatosUsuario(userId: number): void {
    this.apiService.getUserById(userId).subscribe({
      next: (userData: any) => {
        this.user = userData.user;
        this.cargarProductos(userId);
      },
      error: (err) => {
        console.error('Error al cargar usuario', err);
      }
    });
  }

  cargarProductos(userId: number): void {
    this.apiService.getProductosPorUsuario(userId).subscribe({
      next: (res: ProductosResponse) => {
        this.productos = res.productos;
      },
      error: (err) => {
        console.error('Error al cargar productos', err);
      }
    });
  }

  navigateToAddProduct(): void {
    this.router.navigate(['/add-product']);
  }

  verDetalle(producto: Producto): void {
    this.router.navigate(['/detalle', producto.productoId], {
      state: { producto }
    });
  }

  calcularTiempoPublicacion(fechaStr: string): string {
    const fecha = new Date(fechaStr);
    const diff = Math.floor((Date.now() - fecha.getTime()) / (1000 * 60 * 60 * 24));
    return 'Hace ' + diff + ' días';
  }

  formatEstado(estadoId: number): string {
    const estado = this.estados.find(e => e.estadoId === estadoId);
    return estado ? 'estado-' + estado.nombre.toLowerCase().replace(/\s/g, '-') : 'estado-desconocido';
  }

  getNombreEstado(estadoId: number): string {
    const estado = this.estados.find(e => e.estadoId === estadoId);
    return estado ? estado.nombre : 'Desconocido';
  }
}