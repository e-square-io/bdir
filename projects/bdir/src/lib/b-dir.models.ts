// An ISO639-1 Lang code standard.
import { Direction } from '@angular/cdk/bidi';

export type Language = string;

export type Position = 'start' | 'end';

export type DirectionInput = Direction | null | undefined;

export const DEFAULT_LANGUAGE: Language = 'en';

export const RTL_LANGUAGES_LIST: Language[] = ['he', 'ar', 'hy', 'dv', 'ff', 'ku', 'fa'];
