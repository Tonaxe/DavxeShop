import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from '../../models/product.model';

@Component({
  selector: 'app-comprar',
  standalone: false,
  templateUrl: './comprar.component.html',
  styleUrls: ['./comprar.component.css']
})
export class ComprarComponent {
  producto: Producto;
  direccion: string = '';
  ciudad: string = '';
  codigoPostal: string = '';
  pais: string = '';
  loading: boolean = false;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.producto = navigation?.extras.state?.['producto'] || this.getDefaultProduct();
  }

  private getDefaultProduct(): Producto {
    return {
      productoId: 0,
      nombre: 'Producto no disponible',
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
  }

  cargarDatos() {
    this.loading = true;

    const datosPago = {
      direccion: this.direccion,
      ciudad: this.ciudad,
      codigoPostal: this.codigoPostal,
      pais: this.pais
    };

    // Simular operación de carga
    setTimeout(() => {
      this.loading = false;
      this.router.navigate(['/pago']);
    }, 3000);
  }
}
