import { Component } from '@angular/core';
import { SidenavComponent } from '@app/shared/components/sidenav/sidenav.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [SidenavComponent],
})
export class DashboardPage {}
