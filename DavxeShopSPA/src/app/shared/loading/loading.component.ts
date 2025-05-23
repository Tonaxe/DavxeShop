import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading',
  standalone:false,
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css'
})
export class LoadingComponent {
  @Input() isLoading: boolean = false;
  @Input() message: string = 'Cargando...';
}
