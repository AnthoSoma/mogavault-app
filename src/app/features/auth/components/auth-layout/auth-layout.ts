import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'moga-auth-layout',
  styleUrl: './auth-layout.css',
  templateUrl: './auth-layout.html',
})
export class AuthLayout {
  public readonly title = input.required<string>();
  public readonly subtitle = input<string>('');
}
