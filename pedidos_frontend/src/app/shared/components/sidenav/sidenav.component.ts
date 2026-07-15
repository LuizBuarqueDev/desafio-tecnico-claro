import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
@Component({
  selector: 'app-sidenav',
  standalone: true,
  templateUrl: 'sidenav.component.html',
  styleUrl: 'sidenav.component.scss',
  imports: [MatSidenavModule, MatButtonModule, RouterModule, MatIcon],
})
export class SidenavComponent {}