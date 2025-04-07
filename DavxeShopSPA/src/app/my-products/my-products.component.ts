import { Component } from '@angular/core';

@Component({
  selector: 'app-my-products',
  standalone: false,
  templateUrl: './my-products.component.html',
  styleUrl: './my-products.component.css'
})
export class MyProductsComponent {
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
}
