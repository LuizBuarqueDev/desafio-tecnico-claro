import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API_CONFIG } from '../api.config';
import { Order } from '@shared/models/order.model';
import { OrderStatus } from '@shared/models/enums/order-status.enum';
import { Page } from '@app/shared/models/page.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private readonly http = inject(HttpClient);
  private readonly url = `${API_CONFIG.baseUrl}/pedidos`;

  getAll(): Observable<Order[]> {
    return this.http.get<Order[]>(this.url);
  }

  getPage(page = 0, size = 10, search = '') {
    return this.http.get<Page<Order>>(`${this.url}/page`, {
      params: {
        page,
        size,
        search,
      },
    });
  }

  create(order: Order): Observable<Order> {
    return this.http.post<Order>(this.url, order);
  }

  updateStatus(id: string, status: OrderStatus): Observable<Order> {
    return this.http.patch<Order>(`${this.url}/${id}/status`, {
      status,
    });
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  canCreate(): boolean {
    const pedidos = this.getLocal();
    return pedidos.length < 5;
  }

  saveLocal(order: Order): void {
    const pedidos = this.getLocal();
    pedidos.push(order);
    localStorage.setItem('pedidos', JSON.stringify(pedidos));
  }

  getLocal(): Order[] {
    return JSON.parse(localStorage.getItem('pedidos') ?? '[]');
  }

  getAllWithFallback(): Observable<Order[]> {
    return new Observable((observer) => {
      this.getAll().subscribe({
        next: (pedidos) => {
          observer.next(pedidos);
          observer.complete();
        },

        error: () => {
          observer.next(this.getLocal());
          observer.complete();
        },
      });
    });
  }
}
