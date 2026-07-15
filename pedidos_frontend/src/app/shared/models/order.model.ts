import { OrderStatus } from './enums/order-status.enum';

export interface Order {
  id: string;
  displayId: string;
  itens: number;
  peso: number;
  orderStatus: OrderStatus;
}