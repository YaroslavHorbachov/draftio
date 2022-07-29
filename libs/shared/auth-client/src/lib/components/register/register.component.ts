import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CreateUserModel } from '@draftio/shared/common';

@Component({
  selector: 'draftio-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  constructor(private readonly formBuilder: FormBuilder) {}

  @Output() public readonly save = new EventEmitter<Partial<CreateUserModel>>();

  public readonly form = this.formBuilder.nonNullable.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
  });

  public onSubmit() {
    console.log(this.form.value);

    this.save.emit(this.form.value);
  }
}
