import { Component, inject, OnInit, signal } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { OrdersGridComponent, OrderStatusChange } from './orders-grid/orders-grid.component';

import { Order } from '@app/shared/models/order.model';
import { OrderService } from '@app/http/services/order.service';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
  standalone: true,
  imports: [OrdersGridComponent, MatSnackBarModule, MatIcon, MatButtonModule],
})
export class OrderPage implements OnInit {
  private readonly orderService = inject(OrderService);
  private readonly snackBar = inject(MatSnackBar);

  readonly orders = signal<Order[]>([]);

  ngOnInit(): void {
    this.loadOrders();
  }

  private loadOrders(): void {
    this.orderService.getAll().subscribe({
      next: (data) => {
        this.orders.set(data);
      },
      error: (err) => {
        console.error('Erro ao buscar pedidos:', err);

        this.showMessage('Não foi possível carregar os pedidos.');
      },
    });
  }

  onStatusChange(event: OrderStatusChange): void {
    this.orderService.updateStatus(event.order.id, event.status).subscribe({
      next: (updatedOrder) => {
        this.orders.update((orders) =>
          orders.map((order) => (order.id === updatedOrder.id ? updatedOrder : order)),
        );

        this.showMessage('Status atualizado com sucesso.');
      },
      error: (err) => {
        console.error('Erro ao atualizar status:', err);

        this.showMessage('Não foi possível atualizar o status do pedido.');
      },
    });
  }

  onDelete(order: Order): void {
    this.orderService.delete(order.id).subscribe({
      next: () => {
        this.orders.update((orders) => orders.filter((item) => item.id !== order.id));

        this.showMessage('Pedido excluído com sucesso.');
      },
      error: (err) => {
        console.error('Erro ao excluir pedido:', err);

        this.showMessage('Não foi possível excluir o pedido.');
      },
    });
  }

  private showMessage(message: string): void {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
