import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { OrderService } from '@app/http/services/order.service';
import { OrderStatus } from '@shared/models/enums/order-status.enum';
import { Order } from '@shared/models/order.model';

@Component({
  selector: 'app-order-create',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './order-create.page.html',
  styleUrls: ['./order-create.page.scss'],
})
export class OrderCreatePage implements OnInit {
  private fb = inject(FormBuilder);
  private service = inject(OrderService);
  private router = inject(Router);
  loading = false;
  errorMessage = '';
  limitReached = false;

  form = this.fb.group({
    cliente: ['', [Validators.required, Validators.minLength(5)]],

    peso: [null, [Validators.required, Validators.min(1)]],

    itens: [null, [Validators.required, Validators.min(1), Validators.pattern(/^[0-9]+$/)]],
  });

  ngOnInit(): void {
    this.checkLimit();
  }

  checkLimit(): void {
    this.limitReached = !this.service.canCreate();
  }

  salvar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (this.limitReached) {
      return;
    }

    const order: Order = {
      id: '',
      displayName: this.form.value.cliente!,
      itens: Number(this.form.value.itens),
      peso: Number(this.form.value.peso),
      status: OrderStatus.EM_PROCESSAMENTO,
    };

    this.loading = true;

    this.service
      .create(order)

      .subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/orders']);
        },

        error: () => {
          this.service.saveLocal(order);
          this.loading = false;
          this.router.navigate(['/orders']);
        },
      });
  }

  voltar(): void {
    this.router.navigate(['/orders']);
  }
}
