import { Component, input } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { FieldState } from '@angular/forms/signals';

@Component({
  imports: [TranslocoPipe],
  selector: 'moga-field-error',
  styleUrl: './field-error.css',
  templateUrl: './field-error.html',
})
export class FieldError {
  public readonly state = input.required<FieldState<unknown>>();
}
