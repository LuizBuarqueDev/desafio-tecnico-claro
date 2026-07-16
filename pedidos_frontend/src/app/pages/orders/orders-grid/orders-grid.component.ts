import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';

import { Order } from '@models/order.model';
import { OrderStatus } from '@shared/models/enums/order-status.enum';

export interface OrderStatusChange {
  order: Order;
  status: OrderStatus;
}

@Component({
  selector: 'app-orders-grid',
  templateUrl: './orders-grid.component.html',
  styleUrls: ['./orders-grid.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatTooltipModule,
  ],
})
export class OrdersGridComponent {
  @Input({ required: true })
  orders: Order[] = [];

  @Output()
  statusChange = new EventEmitter<OrderStatusChange>();

  @Output()
  deleteOrder = new EventEmitter<Order>();

  readonly OrderStatus = OrderStatus;

  changeStatus(order: Order, status: OrderStatus): void {
    this.statusChange.emit({
      order,
      status,
    });
  }

  confirmDelete(order: Order): void {
    const confirmed = window.confirm(`Deseja realmente excluir o pedido de ${order.displayName}?`);

    if (confirmed) {
      this.deleteOrder.emit(order);
    }
  }

  formatStatus(status: OrderStatus): string {
    const labels: Record<OrderStatus, string> = {
      [OrderStatus.EM_PROCESSAMENTO]: 'Em Processamento',
      [OrderStatus.PAUSADO]: 'Pausado',
      [OrderStatus.CANCELADO]: 'Cancelado',
    };

    return labels[status];
  }
}
