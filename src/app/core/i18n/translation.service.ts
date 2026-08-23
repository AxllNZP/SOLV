import { Injectable, PLATFORM_ID, afterNextRender, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Lang, TRANSLATIONS } from './translations';

const STORAGE_KEY = 'solv-lang';

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  // Always starts as 'en' so SSR-rendered markup and the first client
  // render match; a saved preference (if any) is applied right after
  // hydration completes to avoid a hydration mismatch.
  lang = signal<Lang>('en');

  constructor() {
    afterNextRender(() => {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === 'en' || saved === 'es') {
        this.lang.set(saved);
      }
    });
  }

  setLang(lang: Lang): void {
    this.lang.set(lang);
    if (this.isBrowser) {
      window.localStorage.setItem(STORAGE_KEY, lang);
    }
  }

  toggleLang(): void {
    this.setLang(this.lang() === 'en' ? 'es' : 'en');
  }

  t(key: string): string {
    return TRANSLATIONS[this.lang()][key] ?? key;
  }
}
