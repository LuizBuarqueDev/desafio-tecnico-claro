import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard-cards',
  standalone: true,
  templateUrl: './dashboard-cards.component.html',
  styleUrls: ['./dashboard-cards.component.scss'],
  imports: [CommonModule, MatIconModule],
})
export class DashboardCardsComponent {
  @Input({ required: true })
  totalOrders = 0;

  @Input({ required: true })
  processingOrders = 0;

  @Input({ required: true })
  totalItems = 0;

  @Input({ required: true })
  totalWeightKg = 0;
}
