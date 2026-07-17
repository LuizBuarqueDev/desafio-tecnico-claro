import { Component, Input, OnChanges } from '@angular/core';

import { BaseChartDirective } from 'ng2-charts';

import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-orders-limit-chart',
  standalone: true,
  templateUrl: './orders-limit-chart.component.html',
  styleUrls: ['./orders-limit-chart.component.scss'],
  imports: [BaseChartDirective],
})
export class OrdersLimitChartComponent implements OnChanges {
  @Input({ required: true })
  totalOrders = 0;

  @Input()
  maximumOrders = 5;

  chartData: ChartConfiguration<'doughnut'>['data'] = {
    labels: ['Pedidos cadastrados', 'Vagas disponíveis'],
    datasets: [
      {
        data: [0, 5],
        backgroundColor: ['#1976d2', '#e0e0e0'],
        borderWidth: 0,
      },
    ],
  };

  readonly chartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',

    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  get availableOrders(): number {
    return Math.max(this.maximumOrders - this.totalOrders, 0);
  }

  get percentage(): number {
    if (this.maximumOrders === 0) {
      return 0;
    }

    return Math.min(Math.round((this.totalOrders / this.maximumOrders) * 100), 100);
  }

  ngOnChanges(): void {
    this.chartData = {
      ...this.chartData,

      datasets: [
        {
          ...this.chartData.datasets[0],

          data: [this.totalOrders, this.availableOrders],
        },
      ],
    };
  }
}
