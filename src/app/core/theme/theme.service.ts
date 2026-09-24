import { isPlatformBrowser } from '@angular/common';
import { effect, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

export type Theme = 'light' | 'dark' | 'system';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly _platformId = inject(PLATFORM_ID);
  private readonly _storageKey = 'moga-theme';

  // Le signal contient l'état actuel.
  public readonly currentTheme = signal<Theme>('dark');

  constructor() {
    // Sécurité SSR : on ne lit/écrit dans le DOM et le localStorage que côté navigateur
    if (isPlatformBrowser(this._platformId)) {
      this.loadTheme();

      effect(() => {
        const theme = this.currentTheme();
        this.applyThemeToDOM(theme);
        localStorage.setItem(this._storageKey, theme);
      });
    }
  }

  public setTheme(theme: Theme): void {
    this.currentTheme.set(theme);
  }

  private loadTheme(): void {
    const storedTheme = localStorage.getItem(this._storageKey) as Theme | null;
    if (storedTheme) {
      this.currentTheme.set(storedTheme);
    }
  }

  private applyThemeToDOM(theme: Theme): void {
    const isDark =
      theme === 'dark' ||
      (theme === 'system' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);

    const html = document.documentElement;

    if (isDark) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }
}
