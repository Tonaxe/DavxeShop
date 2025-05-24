import { Component } from '@angular/core';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
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
  products: Product[] = [
    {
      id: 1,
      name: 'Producto Ejemplo 1',
      price: 29.99,
      image: 'assets/logo.png',
      quantity: 1
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
    const printContent = document.querySelector('.confirmation-container')?.outerHTML;
    const styles = `
      <style>
        @media print {
          body { margin: 0; padding: 20px; }
          .actions, .no-print { display: none !important; }
          .confirmation-container {
            box-shadow: none !important;
            border: none !important;
            max-width: 100% !important;
          }
          .product-item {
            display: flex !important;
            margin-bottom: 15px;
          }
        }
      </style>
    `;
    printWindow?.document.write(`
      <html>
        <head>
          <title>Comprobante de Pago</title>
          ${styles}
        </head>
        <body>
          ${printContent}
          <script>
            setTimeout(() => {
              window.print();
              window.close();
            }, 500);
          </script>
        </body>
      </html>
    `);
  }
}
