import { Component, Input } from '@angular/core';
import { Producto } from '../../models/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-slider',
  standalone: false,
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css'
})
export class SliderComponent {
  @Input() productos: Producto[] = [];

  constructor(private router: Router) {}

  irDetalle(productoId: number) {
    this.router.navigate(['/detalle', productoId]);
  }
}
