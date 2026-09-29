import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmCard } from '@spartan-ng/helm/card';
import { HlmInput } from '@spartan-ng/helm/input';
import { HlmLabel } from '@spartan-ng/helm/label';
import { AuthService } from '../../services/auth.service';
import { TranslocoPipe } from '@jsverse/transloco';
import { AuthLayout } from '../../components/auth-layout/auth-layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

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
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
  private readonly _fb = inject(FormBuilder).nonNullable;
  private readonly _authService = inject(AuthService);

  // State signals
  protected readonly isLoading = signal<boolean>(false);
  protected readonly errorMessage = signal<string | null>(null);

  // Form
  protected readonly loginForm = this._fb.group({
    login: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    rememberMe: [false],
  });

  protected readonly isFormValid = toSignal(
    this.loginForm.statusChanges.pipe(map(status => status === 'VALID')),
    { initialValue: this.loginForm.valid },
  );

  protected onSubmit(): void {
    if (this.loginForm.invalid) {
      // Trigger display of errors
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

    const credentials = this.loginForm.getRawValue();

    // TODO: Brancher l'appel API réel
    console.log('Données soumises :', credentials);
    setTimeout(() => {
      this.isLoading.set(false);
    }, 1500);
  }
}
