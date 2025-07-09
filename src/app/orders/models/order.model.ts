// src/app/orders/models/order.model.ts
export interface Order {
  id: string;
  requesterId: string;
  fuelType: string;
  quantity: number;
  note: string;
  status: string;
  createdAt: string;
}

export interface OrderPay {
  amount: number;
  date: string;
  operation: string;
}
