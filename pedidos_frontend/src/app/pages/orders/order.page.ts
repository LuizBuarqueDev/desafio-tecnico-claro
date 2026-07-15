import { Component } from '@angular/core';
import { SidenavComponent } from '@app/shared/components/sidenav/sidenav.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
  standalone: true,
  imports: [SidenavComponent],
})
export class OrderPage {}
