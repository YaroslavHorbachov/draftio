import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthService } from '@draftio/shared/auth-client';

@Component({
  selector: 'draftio-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  constructor(private readonly authService: AuthService) {}

  public onLogout() {
    this.authService.logout();
  }
}
