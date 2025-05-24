import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product, ShippingInfo, PaymentInfo } from '../../models/pago.model';

@Component({
  selector: 'app-pago',
  standalone: false,
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent {
  products: Product[] = [];
  shippingInfo!: ShippingInfo;
  paymentInfo!: PaymentInfo;
  orderId: string = '';
  orderDate!: Date;
  estimatedDeliveryDate!: Date;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state;

    if (!state || !state['products'] || !state['shippingInfo'] || !state['paymentInfo']) {
      this.router.navigate(['/home']);
      return;
    }

    this.products = state['products'];
    this.shippingInfo = state['shippingInfo'];
    this.paymentInfo = state['paymentInfo'];
    this.orderId = state['orderId'] || 'ORD-' + Math.floor(Math.random() * 1000000);
    this.orderDate = new Date(state['orderDate']) || new Date();

    this.estimatedDeliveryDate = new Date(this.orderDate);
    this.estimatedDeliveryDate.setDate(this.orderDate.getDate() + 3);
  }

  get subtotal(): number {
    return this.products.reduce((sum, p) => sum + (p.price * p.quantity), 0);
  }

  get shippingCost(): number {
    return 5.99;
  }

  get total(): number {
    return this.subtotal + this.shippingCost;
  }

  printOrder() {
    const printWindow = window.open('', '_blank');

    if (!printWindow) {
      alert('No se pudo abrir la ventana de impresión');
      return;
    }

    const printContent = document.querySelector('.confirmation-container')?.outerHTML || '<p>No hay contenido para imprimir.</p>';

    const styles = `
  <style>
    @page {
      size: A4;
      margin: 20mm;
    }
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      margin: 0;
      padding: 0;
      color: #222;
      background: #fff;
      font-size: 14px;
      line-height: 1.6;
    }
    .confirmation-container {
      max-width: 800px;
      margin: auto;
      padding: 20px;
      border: 1px solid #ddd;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }
    h1, h2, h3 {
      margin-bottom: 0.5em;
      color: #333;
    }
    h1 {
      font-size: 24px;
      border-bottom: 2px solid #4CAF50;
      padding-bottom: 5px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
    }
    th, td {
      border: 1px solid #ccc;
      padding: 8px 12px;
      text-align: left;
    }
    th {
      background-color: #f5f5f5;
    }
    tfoot td {
      font-weight: bold;
      font-size: 16px;
    }
    .section {
      margin-bottom: 20px;
    }
    .section-title {
      font-weight: 600;
      color: #4CAF50;
      margin-bottom: 10px;
      border-bottom: 1px solid #ccc;
      padding-bottom: 5px;
    }
    .details p {
      margin: 4px 0;
    }
    .no-print {
      display: none !important;
    }
    @media print {
      .product-item img {
        display: none !important;
      }
    }
  </style>
`;


    printWindow.document.write(`
    <html>
      <head>
        <title>Comprobante de Pago</title>
        ${styles}
      </head>
      <body>
        ${printContent}
        <script>
          document.addEventListener('DOMContentLoaded', () => {
            window.print();
            window.close();
          });
        </script>
      </body>
    </html>
  `);

    printWindow.document.close();
  }

}
