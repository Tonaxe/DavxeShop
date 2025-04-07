import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-slider',
  standalone: false,
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css'
})
export class SliderComponent {
  @Input() productos: { nombre: string, imagen: string }[] = [];
}
