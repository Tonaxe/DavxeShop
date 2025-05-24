export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface ShippingInfo {
  name: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface PaymentInfo {
  method: string;
  cardLastFour?: string;
}