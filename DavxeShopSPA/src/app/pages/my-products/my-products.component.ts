import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-products',
  standalone: false,
  templateUrl: './my-products.component.html',
  styleUrl: './my-products.component.css'
})
export class MyProductsComponent {
  constructor(private router: Router) {}
  nombreUsuario: string = "Tonaxea"; // <-- Nueva propiedad
  productos = [
    'Producto 1',
    'Producto 2',
    'Producto 3',
    'Producto 4',
    'Producto 5',
    'Producto 6',
    'Producto 7',
    'Producto 8',
  ];

  navigate() {
    this.router.navigate(['/add-product']);
  }
  verDetalle(producto: string) {
    this.router.navigate(['/detalle']);
  }
}
