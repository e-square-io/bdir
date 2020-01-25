// An ISO639-1 Lang code standard.
export type Language = string;

export enum Direction {
  rtl = 'rtl',
  ltr = 'ltr'
}

export enum Position {
  Start = 'start',
  End = 'end'
}

export type IDirection = Direction;

export const DEFAULT_LANGUAGE: Language = 'en';

export const RTL_LANGUAGES_LIST: Language[] = ['he', 'ar', 'hy', 'dv', 'ff', 'ku', 'fa'];
