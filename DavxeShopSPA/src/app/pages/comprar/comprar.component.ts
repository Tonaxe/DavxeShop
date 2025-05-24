import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from '../../models/product.model';
import { NgForm } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { CrearCompraResponse } from '../../models/compra.model';

@Component({
  selector: 'app-comprar',
  standalone: false,
  templateUrl: './comprar.component.html',
  styleUrls: ['./comprar.component.css']
})
export class ComprarComponent {
  producto: Producto;
  ciudad: string = '';
  codigoPostal: string = '';
  pais: string = '';
  loading = false;

  constructor(private router: Router, private apiService: ApiService) {
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
      imagenUrl: '',
      userId: 0,
      userNombre: '',
      userCiudad: '',
      estado: '',
    };
  }

  cargarDatos(form: NgForm) {
    console.log("llego1");

    if (form.invalid) {
      console.log("llego2");

      form.control.markAllAsTouched();
      return;
    }

    this.loading = true;
    const { direccionEnvio, ciudad, codigoPostal, pais, email } = form.value;
    const compraDto = {
      userId: this.producto.userId,
      direccionEnvio,
      ciudad,
      codigoPostal,
      pais,
      email,
      productoIds: [this.producto.productoId],
      total: this.producto.precio
    };


    console.log("llego3");
    this.apiService.crearCompra(compraDto).subscribe({
      next: (res: CrearCompraResponse) => {
        this.loading = false;
        this.router.navigate(['/pago']);
      },
      error: (err) => {
        this.loading = false;
        alert(`Error al realizar la compra: ${err.error?.message || err.message}`);
      },
    });

  }
}