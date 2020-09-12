import { InjectionToken } from '@angular/core';
import { DEFAULT_LANGUAGE, Language, RTL_LANGUAGES_LIST } from './b-dir.models';

export const RTL_LANGUAGES = new InjectionToken<Language[]>('Rtl Languages', {
  factory: function() {
    return RTL_LANGUAGES_LIST;
  }
});
export const DEFAULT_LANG = new InjectionToken<Language>('Default Lang', {
  factory: function() {
    return DEFAULT_LANGUAGE;
  }
});
