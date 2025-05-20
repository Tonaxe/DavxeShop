import { Component } from '@angular/core';

@Component({
  selector: 'app-add-product',
  standalone: false,
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  imagenPreview: string | ArrayBuffer | null = null;

  mostrarVistaPrevia(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagenPreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  guardarProducto(event: Event): void {
    event.preventDefault();
    console.log('Producto guardado (simulado)');
  }
}
