import { InjectionToken } from '@angular/core';
import { Language } from './bdir.models';

export const RTL_LANGUAGES = new InjectionToken<Language[]>('Rtl Languages', {
  factory: function () {
    return ['he', 'ar', 'hy', 'dv', 'ff', 'ku', 'fa'];
  },
});
export const DEFAULT_LANG = new InjectionToken<Language>('Default Lang', {
  factory: function () {
    return 'en';
  },
});
