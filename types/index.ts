export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

export interface ShippingDetails {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface PaymentDetails {
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
  paymentMethod: 'credit' | 'debit';
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  tax: number;
  shipping: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: Date;
  shippingDetails: ShippingDetails;
  paymentDetails?: PaymentDetails;
} 