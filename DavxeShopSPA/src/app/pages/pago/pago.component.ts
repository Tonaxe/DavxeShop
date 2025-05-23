import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface ShippingInfo {
  name: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

interface PaymentInfo {
  method: string;
  cardLastFour?: string;
  transactionId: string;
}

@Component({
  selector: 'app-pago',
  standalone: false,
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent {
  // Datos de ejemplo - en una app real estos vendrían de un servicio
  products: Product[] = [
    {
      id: 1,
      name: 'Producto Ejemplo 1',
      price: 29.99,
      quantity: 2,
      image: 'https://via.placeholder.com/80'
    },
    {
      id: 2,
      name: 'Producto Ejemplo 2',
      price: 49.99,
      quantity: 1,
      image: 'https://via.placeholder.com/80'
    }
  ];

  shippingInfo: ShippingInfo = {
    name: 'Juan Pérez',
    address: 'Calle Falsa 123',
    city: 'Madrid',
    postalCode: '28001',
    country: 'España'
  };

  paymentInfo: PaymentInfo = {
    method: 'Tarjeta de crédito',
    cardLastFour: '1234',
    transactionId: 'TXN' + Math.random().toString(36).substring(2, 15)
  };

  orderId: string = 'ORD-' + Math.floor(Math.random() * 1000000);
  orderDate: Date = new Date();
  estimatedDeliveryDate: Date = new Date(new Date().setDate(this.orderDate.getDate() + 3));

  get subtotal(): number {
    return this.products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
  }

  get shippingCost(): number {
    return 5.99; // Costo fijo de envío para el ejemplo
  }

  get total(): number {
    return this.subtotal + this.shippingCost;
  }

  printOrder() {
    window.print();
  }
}