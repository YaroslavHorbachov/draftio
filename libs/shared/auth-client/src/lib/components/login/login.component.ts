import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../services';

@Component({
  selector: 'draftio-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  constructor(private readonly authService: AuthService) {}

  @Output() public readonly save = new EventEmitter();

  public readonly user$ = this.authService.user$;

  public async onGoogleLogin() {
    await this.authService.googleLogin();

    this.onSave();
  }

  public async onGithubLogin() {
    await this.authService.githubLogin();

    this.onSave();
  }

  private onSave() {
    this.save.emit();
  }
}
