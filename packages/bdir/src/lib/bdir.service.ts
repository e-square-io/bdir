import { Injectable, Inject, EventEmitter, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { map, share } from 'rxjs/operators';
import { Language } from './bdir.models';
import { RTL_LANGUAGES, DEFAULT_LANG } from './bdir.tokens';
import { Direction, Directionality } from '@angular/cdk/bidi';

export const mapOppositeDir = (dir: Direction): Direction =>
  dir === 'rtl' ? 'ltr' : 'rtl';

export const mapToOppositeDir = () => map(mapOppositeDir);

/** This is required in order to override value to getter and setter without making typescript throw */
@Injectable()
export abstract class BiDirectionality implements Directionality {
  abstract readonly change: EventEmitter<Direction>;
  abstract set value(dir: Direction);
  abstract get value(): Direction;
  abstract ngOnDestroy(): void;
}

@Injectable({
  providedIn: 'root',
})
export class BDirService extends BiDirectionality implements OnDestroy {
  private _value: Direction = 'ltr';

  readonly change: EventEmitter<Direction> = new EventEmitter();

  /**  A multicasting observable that emits the opposite direction every time the direction changes */
  readonly oppositeDirChanges: Observable<Direction> = this.change.pipe(
    mapToOppositeDir(),
    share()
  );

  get value(): Direction {
    return this._value;
  }

  set value(value) {
    this._value = value;
  }

  constructor(
    @Inject(RTL_LANGUAGES) private rtlLangs: Language[],
    @Inject(DEFAULT_LANG) defaultLang: Language
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
