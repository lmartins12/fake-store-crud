import { DOCUMENT } from '@angular/common';
import { Injectable, Signal, WritableSignal, effect, inject, signal } from '@angular/core';

const PRIME_THEME_ID = 'prime-theme-link';
const THEME_STORAGE_KEY = 'fake-store-theme';

export type PrimeTheme = 'mdc-light-indigo' | 'mdc-dark-indigo';
export type ThemeAlias = 'light' | 'dark';

const THEME_MAP: Record<ThemeAlias, PrimeTheme> = {
  light: 'mdc-light-indigo',
  dark: 'mdc-dark-indigo',
};

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document: Document = inject(DOCUMENT);
  private readonly storage: Storage | null = this.resolveStorage();
  private readonly themeSignal: WritableSignal<ThemeAlias>;

  readonly theme: Signal<ThemeAlias>;

  constructor() {
    const persistedTheme = this.loadPersistedTheme();
    this.themeSignal = signal(persistedTheme ?? 'light');
    this.theme = this.themeSignal.asReadonly();

    effect(() => {
      const alias = this.themeSignal();
      this.persistTheme(alias);
      this.applyTheme(THEME_MAP[alias]);
    });
  }

  public initTheme(): void {
    this.applyTheme(THEME_MAP[this.themeSignal()]);
  }

  public setTheme(theme: ThemeAlias): void {
    this.themeSignal.set(theme);
  }

  public toggleTheme(): void {
    this.themeSignal.update((current) => (current === 'light' ? 'dark' : 'light'));
  }

  private applyTheme(theme: PrimeTheme): void {
    const head = this.document.head;

    const existingThemeLink = this.document.getElementById(
      PRIME_THEME_ID
    ) as HTMLLinkElement | null;
    const themeHref = `assets/themes/${theme}/theme.css`;

    if (existingThemeLink) {
      if (existingThemeLink.href.endsWith(themeHref)) {
        return;
      }

      existingThemeLink.href = themeHref;
      return;
    }

    const themeLinkElement = this.document.createElement('link');
    themeLinkElement.id = PRIME_THEME_ID;
    themeLinkElement.rel = 'stylesheet';
    themeLinkElement.href = themeHref;
    head.appendChild(themeLinkElement);
  }

  private resolveStorage(): Storage | null {
    return this.document.defaultView?.localStorage ?? null;
  }

  private persistTheme(theme: ThemeAlias): void {
    this.storage?.setItem(THEME_STORAGE_KEY, theme);
  }

  private loadPersistedTheme(): ThemeAlias | null {
    if (!this.storage) {
      return null;
    }

    const storedTheme = this.storage.getItem(THEME_STORAGE_KEY);
    return this.isThemeAlias(storedTheme) ? storedTheme : null;
  }

  private isThemeAlias(value: string | null): value is ThemeAlias {
    return value === 'light' || value === 'dark';
  }
}
