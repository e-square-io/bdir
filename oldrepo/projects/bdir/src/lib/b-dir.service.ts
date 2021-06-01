import { Injectable, Inject, Optional, EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, share } from 'rxjs/operators';
import { Language, DEFAULT_LANGUAGE } from './b-dir.models';
import { RTL_LANGUAGES, DEFAULT_LANG } from './b-dir.tokens';
import { Direction, Directionality } from '@angular/cdk/bidi';
import { DOCUMENT } from '@angular/common';

export const mapOppositeDir = (dir: Direction): Direction => dir === 'rtl' ? 'ltr' : 'rtl';

export const mapToOppositeDir = () => map(mapOppositeDir);

/** This is required in order to override value to getter and setter without making typescript throw */
export abstract class BiDirectionality implements Directionality {
  abstract readonly change: EventEmitter<Direction>;
  abstract set value(dir: Direction);
  abstract get value(): Direction;
  abstract ngOnDestroy(): void
}

@Injectable({
  providedIn: 'root'
})
export class BDirService extends BiDirectionality {
  /** @deprecated use value instead */
  private currentDir: Direction;
  private _value: Direction;
  readonly change: EventEmitter<Direction> = new EventEmitter();


  /**
   * A multicasting observable that emits the direction every time it changes
   * @deprecated use change instead
   */
  readonly dirChanges: Observable<Direction> = this.change;

  /**  A multicasting observable that emits the opposite direction every time the direction changes */
  readonly oppositeDirChanges: Observable<Direction> = this.change.pipe(mapToOppositeDir(), share());

  get value(): Direction {
    return this._value;
  }

  set value(value) {
    this._value = value;
  }

  constructor(
    @Inject(RTL_LANGUAGES) private rtlLangs: Language[],
    @Inject(DEFAULT_LANG) defaultLang: Language,
    @Optional() @Inject(DOCUMENT) doc?: any
  ) {
    super();

    this.setLang(defaultLang);
  }

  /**
   * Setting the current language which will determine the direction value.
   */
  setLang(lang: Language): void {
    this.setDir(this.getDirByLang(lang));
  }

  /**
   * Set the current direction value.
   */
  setDir(dir: Direction): void {
    if (dir !== this.value) {
      this.value = dir;
      this.change.emit(this.value);
    }
  }

  /**
   * @deprecated use value instead
   */
  getDir(): Direction {
    return this.value;
  }

  /**
   * @returns the opposite direction value as string.
   */
  getOppositeDir(): Direction {
    return mapOppositeDir(this.value);
  }

  private getDirByLang(lang: Language): Direction {
    return this.rtlLangs.includes(lang) ? 'rtl' : 'ltr';
  }

  ngOnDestroy(): void {
    this.change.complete();
  }
}
