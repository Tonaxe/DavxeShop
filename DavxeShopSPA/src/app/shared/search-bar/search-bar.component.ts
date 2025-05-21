// search-bar.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: false,
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent {
  query: string = '';
  resultados: any[] = [];

  productosSimulados = [
    { productoId: 1, nombre: 'Camiseta Nike', descripcion: 'Camiseta deportiva', categoria: 'Ropa', precio: 25, fechaPublicacion: '2023-12-01', imagenUrl: 'https://via.placeholder.com/150' },
    { productoId: 2, nombre: 'Zapatillas Adidas', descripcion: 'Zapatillas running', categoria: 'Calzado', precio: 50, fechaPublicacion: '2023-11-15', imagenUrl: 'https://via.placeholder.com/150' },
    { productoId: 3, nombre: 'Auriculares Bluetooth', descripcion: 'Auriculares inalámbricos', categoria: 'Tecnología', precio: 35, fechaPublicacion: '2024-01-10', imagenUrl: 'https://via.placeholder.com/150' },
    { productoId: 4, nombre: 'Mochila escolar', descripcion: 'Para estudiantes', categoria: 'Accesorios', precio: 20, fechaPublicacion: '2024-02-20', imagenUrl: 'https://via.placeholder.com/150' }
  ];

  onInputChange(): void {
    const queryLower = this.query.toLowerCase().trim();
    this.resultados = queryLower.length > 0
      ? this.productosSimulados.filter(p =>
          p.nombre.toLowerCase().includes(queryLower) || p.descripcion.toLowerCase().includes(queryLower)
        )
      : [];
  }

  selectResult(producto: any) {
    this.query = producto.nombre;
    this.resultados = [];
    // podrías emitir un evento o redirigir
  }
}
