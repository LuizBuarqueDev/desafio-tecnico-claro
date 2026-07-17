import { Component } from '@angular/core';
import { SidenavComponent } from '../components/sidenav/sidenav.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [SidenavComponent],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {}
