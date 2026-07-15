import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterModule } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { AuthService } from '@app/http/services/auth.service';
@Component({
  selector: 'app-sidenav',
  standalone: true,
  templateUrl: 'sidenav.component.html',
  styleUrl: 'sidenav.component.scss',
  imports: [MatSidenavModule, MatButtonModule, RouterModule, MatIcon],
})
export class SidenavComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }
}
