import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-filtro',
  standalone: false,
  templateUrl: './filtro.component.html',
  styleUrl: './filtro.component.css'
})
export class FiltroComponent {
  constructor(private router: Router) {}
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
  verDetalle(producto: string) {
    console.log('Ver detalles de:', producto);
  }
  
}
