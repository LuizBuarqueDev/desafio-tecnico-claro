import { Component, Input, OnChanges } from '@angular/core';

import { BaseChartDirective } from 'ng2-charts';

import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-orders-bar-chart',
  standalone: true,
  templateUrl: './orders-bar-chart.component.html',
  styleUrls: ['./orders-bar-chart.component.scss'],
  imports: [BaseChartDirective],
})
export class OrdersBarChartComponent implements OnChanges {
  @Input({ required: true })
  processingOrders = 0;

  @Input({ required: true })
  pausedOrders = 0;

  @Input({ required: true })
  canceledOrders = 0;

  chartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Em processamento', 'Pausados', 'Cancelados'],
    datasets: [
      {
        label: 'Pedidos',
        data: [0, 0, 0],
        backgroundColor: ['#2e7d32', '#ed9c1a', '#d32f2f'],
        borderRadius: 4,
      },
    ],
  };

  readonly chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },
    },

    scales: {
      y: {
        beginAtZero: true,

        ticks: {
          stepSize: 1,
          precision: 0,
        },
      },
    },
  };

  ngOnChanges(): void {
    this.chartData = {
      ...this.chartData,

      datasets: [
        {
          ...this.chartData.datasets[0],

          data: [this.processingOrders, this.pausedOrders, this.canceledOrders],
        },
      ],
    };
  }
}
