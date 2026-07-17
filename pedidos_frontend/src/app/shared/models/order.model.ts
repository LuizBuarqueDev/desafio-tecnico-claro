import { OrderStatus } from './enums/order-status.enum';

export interface Order {
  id: string;
  displayName: string;
  itens: number;
  peso: number;
  status: OrderStatus;
}
