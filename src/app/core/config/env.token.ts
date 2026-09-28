import { InjectionToken } from '@angular/core';

export interface AppEnvironment {
  production: boolean;
  apiUrl: string;
}

export const APP_ENV = new InjectionToken<AppEnvironment>('APP_ENV');
