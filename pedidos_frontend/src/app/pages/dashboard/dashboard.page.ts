import { Component, computed, inject, OnInit, signal } from '@angular/core';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { OrderService } from '@app/http/services/order.service';
import { Order } from '@app/shared/models/order.model';
import { OrderStatus } from '@app/shared/models/enums/order-status.enum';
import { DashboardCardsComponent } from './components/dashboard-cards/dashboard-cards.component';
import { OrdersBarChartComponent } from './components/orders-bar-chart/orders-bar-chart.component';
import { OrdersLimitChartComponent } from './components/orders-limit-chart/orders-limit-chart.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  imports: [
    MatProgressSpinnerModule,
    DashboardCardsComponent,
    OrdersBarChartComponent,
    OrdersLimitChartComponent,
  ],
})
export class DashboardPage implements OnInit {
  private readonly orderService = inject(OrderService);

  readonly orders = signal<Order[]>([]);
  readonly loading = signal(true);
  readonly hasError = signal(false);

  readonly totalOrders = computed(() => this.orders().length);

  readonly processingOrders = computed(
    () => this.orders().filter((order) => order.status === OrderStatus.EM_PROCESSAMENTO).length,
  );

  readonly pausedOrders = computed(
    () => this.orders().filter((order) => order.status === OrderStatus.PAUSADO).length,
  );

  readonly canceledOrders = computed(
    () => this.orders().filter((order) => order.status === OrderStatus.CANCELADO).length,
  );

  readonly totalItems = computed(() =>
    this.orders().reduce((total, order) => total + order.itens, 0),
  );

  readonly totalWeightKg = computed(() => {
    const totalWeightInGrams = this.orders().reduce((total, order) => total + order.peso, 0);

    return totalWeightInGrams / 1000;
  });

  ngOnInit(): void {
    this.loadOrders();
  }

  private loadOrders(): void {
    this.loading.set(true);
    this.hasError.set(false);

    this.orderService.getAllWithFallback().subscribe({
      next: (orders) => {
        this.orders.set(orders);
        this.loading.set(false);
      },

      error: (error) => {
        console.error('Erro ao carregar dashboard:', error);

        this.hasError.set(true);
        this.loading.set(false);
      },
    });
  }
}
