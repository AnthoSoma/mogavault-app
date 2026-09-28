import { inject, Injectable } from '@angular/core';
import { Translation, TranslocoLoader } from '@jsverse/transloco';
import { HttpClient } from '@angular/common/http';
import { APP_ENV } from '../config/env.token';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  private _http = inject(HttpClient);
  private _env = inject(APP_ENV);

  getTranslation(lang: string) {
    // Méthode locale qui va chercher dans le folder "public"
    // return this.http.get<Translation>(`/i18n/${lang}.json`);
    return this._http.get<Translation>(`${this._env.apiUrl}/i18n/${lang}`);
  }
}
