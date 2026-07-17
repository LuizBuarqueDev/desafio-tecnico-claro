import { Component, inject, OnInit, signal } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { OrderService } from '@app/http/services/order.service';
import { Order } from '@app/shared/models/order.model';
import { OrdersGridComponent, OrderStatusChange } from './orders-grid/orders-grid.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
  standalone: true,
  imports: [
    OrdersGridComponent,
    MatSnackBarModule,
    MatIcon,
    MatButtonModule,
    RouterLink,
    MatPaginator,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class OrderPage implements OnInit {
  private readonly orderService = inject(OrderService);
  private readonly snackBar = inject(MatSnackBar);

  orders = signal<Order[]>([]);
  totalElements = signal(0);
  pageSize = signal(10);
  pageIndex = signal(0);
  search = signal('');

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.orderService
      .getPage(this.pageIndex(), this.pageSize(), this.search())
      .subscribe((page) => {
        this.orders.set(page.content);
        this.totalElements.set(page.totalElements);
        this.pageIndex.set(page.number);
        this.pageSize.set(page.size);
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

  onPageChange(event: PageEvent) {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
    this.loadOrders();
  }

  onSearch(value: string) {
    this.search.set(value);
    this.pageIndex.set(0);
    this.loadOrders();
  }
}
