import { Component, Input } from '@angular/core';
import { Producto } from '../../models/product.model';

@Component({
  selector: 'app-slider',
  standalone: false,
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css'
})
export class SliderComponent {
  @Input() productos: Producto[] = [];
}
