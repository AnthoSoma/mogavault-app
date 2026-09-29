import { Component, computed, input, Signal } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { FieldState } from '@angular/forms/signals';

interface BaseValidationError {
  kind: string;
  message?: string;
}

interface FrontValidationError extends BaseValidationError {
  minLength?: number;
  maxLength?: number;
}

interface BackExtendedValidationError extends BaseValidationError {
  params: {
    min?: number;
    max?: number;
  };
}

@Component({
  imports: [TranslocoPipe],
  selector: 'moga-field-error',
  styleUrl: './field-error.css',
  templateUrl: './field-error.html',
})
export class FieldError {
  public readonly state = input.required<FieldState<unknown>>();

  protected readonly mappedErrors: Signal<BackExtendedValidationError[]> =
    computed(() => {
      const currentErrors = this.state().errors();
      if (!currentErrors) return [];

      return currentErrors.map(rawError => {
        const error = rawError as FrontValidationError;

        return {
          kind: error.kind,
          message: error.message,
          params: {
            ...error,
            ...(error.minLength && { min: error.minLength }),
            ...(error.maxLength && { max: error.maxLength }),
          },
        };
      });
    });
}
