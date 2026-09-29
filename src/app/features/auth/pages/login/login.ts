import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmCard } from '@spartan-ng/helm/card';
import { HlmInput } from '@spartan-ng/helm/input';
import { HlmLabel } from '@spartan-ng/helm/label';
import { AuthService } from '../../services/auth.service';
import { TranslocoPipe } from '@jsverse/transloco';
import { AuthLayout } from '../../components/auth-layout/auth-layout';
import {
  form,
  FormField,
  FormRoot,
  minLength,
  pattern,
  required,
} from '@angular/forms/signals';
import { FieldError } from '../../../../shared/components/atoms/field-error/field-error';

@Component({
  selector: 'moga-login',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    HlmButton,
    HlmInput,
    HlmLabel,
    HlmCard,
    TranslocoPipe,
    AuthLayout,
    FormRoot,
    FormsModule,
    FormField,
    FieldError,
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
  // Services
  private readonly _authService = inject(AuthService);

  // State signals
  protected readonly isLoading = signal<boolean>(false);

  // Signal model for form
  protected readonly loginModel = signal({
    login: '',
    password: '',
    rememberMe: false,
  });

  // Form
  protected readonly loginForm = form(this.loginModel, schema => {
    // Username constraints
    required(schema.login, { message: 'validation.user.username.required' });
    // Password constraints
    required(schema.password, {
      message: 'validation.user.password.required',
    });
    minLength(schema.password, 8, {
      message: 'validation.user.password.size',
    });
    pattern(
      schema.password,
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      {
        message: 'validation.user.password.pattern',
      },
    );
  });

  protected onSubmit(): void {
    if (this.loginForm().invalid()) {
      return;
    }

    this.isLoading.set(true);

    const credentials = this.loginForm().value();

    // TODO: Brancher l'appel API réel
    console.log('Données soumises :', credentials);
    setTimeout(() => {
      this.isLoading.set(false);
    }, 1500);
  }
}
