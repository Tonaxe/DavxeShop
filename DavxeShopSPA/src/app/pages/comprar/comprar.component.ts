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
  shippingCost: number = 5.99; 

  constructor(private router: Router, private apiService: ApiService) {
    const navigation = this.router.getCurrentNavigation();
    this.producto = navigation?.extras.state?.['producto'] || this.getDefaultProduct();
  }
  
  get subtotal(): number {
    return this.producto.precio; 
  }

  get total(): number {
    return this.subtotal + this.shippingCost;
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
      estado: 0,
      comprado: false,
      favorito: false
    };
  }

  cargarDatos(form: NgForm) {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    this.loading = true;

    const { direccionEnvio, ciudad, codigoPostal, pais, email, tarjeta } = form.value;
    const compraDto = {
      userId: this.producto.userId,
      direccionEnvio,
      ciudad,
      codigoPostal,
      pais,
      email,
      productoIds: [this.producto.productoId],
      total: this.total
    };

    this.apiService.crearCompra(compraDto).subscribe({
      next: (res: CrearCompraResponse) => {
        this.loading = false;

        const orderId = res.numeroPedido;
        const orderDate = new Date(res.fecha);

        const datosPago = {
          products: [
            {
              id: this.producto.productoId,
              name: this.producto.nombre,
              price: this.producto.precio,
              image: this.producto.imagenUrl,
              quantity: 1
            }
          ],
          shippingInfo: {
            name: this.producto.userNombre,
            address: direccionEnvio,
            city: ciudad,
            postalCode: codigoPostal,
            country: pais
          },
          paymentInfo: {
            method: 'Tarjeta de crédito',
            cardLastFour: tarjeta.slice(-4),
            transactionId: 'TXN' + Math.random().toString(36).substring(2, 15)
          },
          orderId,
          orderDate
        };

        this.router.navigate(['/pago'], { state: datosPago });
      },
      error: (err) => {
        this.loading = false;
        alert(`Error al realizar la compra: ${err.error?.message || err.message}`);
      },
    });
  }
}