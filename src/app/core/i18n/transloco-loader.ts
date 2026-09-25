import { inject, Injectable } from '@angular/core';
import { Translation, TranslocoLoader } from '@jsverse/transloco';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  private http = inject(HttpClient);

  getTranslation(lang: string) {
    // Méthode locale qui va chercher dans le folder "public"
    // return this.http.get<Translation>(`/i18n/${lang}.json`);
    return this.http.get<Translation>(
      `http://localhost:8080/api/v1/i18n/${lang}`,
    );
  }
}
