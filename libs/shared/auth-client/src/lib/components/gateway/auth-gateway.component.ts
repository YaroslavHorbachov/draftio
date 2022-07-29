import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CreateUserModel } from '@draftio/shared/common';
import { GatewaySteps } from '../../enums';
import { AuthService } from '../../services';

@Component({
  selector: 'draftio-auth-gateway',
  templateUrl: './auth-gateway.component.html',
  styleUrls: ['./auth-gateway.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthGatewayComponent {
  constructor(private readonly authService: AuthService) {}

  // public readonly isLoading$ = this.authService.isLoading$;

  // public readonly user$ = this.authService.user$;

  public step = GatewaySteps.Login;

  public steps = GatewaySteps;

  public onLoginSave() {
    this.step = GatewaySteps.Register;
  }

  public onRegisterSave(model: Partial<CreateUserModel>) {
    // TODO: Refactor to BSubject
    this.authService.createUser(model).subscribe(() => {
      this.step = GatewaySteps.LoggedIn;
    });
  }
}
