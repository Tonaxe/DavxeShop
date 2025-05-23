import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from '../../models/product.model';

@Component({
  selector: 'app-comprar',
  standalone: false,
  templateUrl: './comprar.component.html',
  styleUrls: ['./comprar.component.css']
})
export class ComprarComponent {
  producto: Producto;

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
      imagenUrl: 'https://via.placeholder.com/150',
      userId: 0,
      userNombre: '',
      userCiudad: '',
      estado: ''
    };
  }
  loading: boolean = false;

  cargarDatos() {
    this.loading = true;
    
    // Simular una operación asíncrona
    setTimeout(() => {
      this.loading = false;
      this.router.navigate(['/home']);
    }, 3000);
   
         
  
  }  
}