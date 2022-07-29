import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthGatewayComponent } from './auth-gateway.component';

describe('AuthGatewayComponent', () => {
  let component: AuthGatewayComponent;
  let fixture: ComponentFixture<AuthGatewayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthGatewayComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthGatewayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
