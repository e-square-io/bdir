import { Injectable, Inject, Optional, EventEmitter } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import { map, share, shareReplay } from 'rxjs/operators';
import { Direction, Language, DEFAULT_LANGUAGE, IDirection } from './b-dir.models';
import { RTL_LANGUAGES, DEFAULT_LANG } from './b-dir.tokens';

export const mapToOppositeDir = () => map((dir: Direction) => (dir === Direction.rtl ? Direction.ltr : Direction.rtl));
@Injectable()
export class BDirService {
  private currentDir: Direction;

  /**  A multicasting observable that emits the direction every time it changes */
  readonly dirChanges: Observable<Direction> = new EventEmitter();

  /**  A multicasting observable that emits the opposite direction every time the direction changes */
  readonly oppositeDirChanges: Observable<Direction> = this.dirChanges.pipe(mapToOppositeDir(), share());

  constructor(
    @Inject(RTL_LANGUAGES) private rtlLangs: Language[],
    @Optional() @Inject(DEFAULT_LANG) defaultLang: Language = DEFAULT_LANGUAGE
  ) {
    this.setDir(this.getDirByLang(defaultLang));
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
  setDir(dir: Direction | keyof typeof Direction): void {
    if (dir !== this.currentDir) {
      this.currentDir = dir as Direction;
      (this.dirChanges as EventEmitter<Direction>).emit(this.currentDir);
    }
  }

  /**
   * @returns the current direction value as string.
   */
  getDir(): Direction {
    return this.currentDir;
  }

  /**
   * @returns the opposite direction value as string.
   */
  getOppositeDir(): Direction {
    return this.currentDir === Direction.rtl ? Direction.ltr : Direction.rtl;
  }

  private getDirByLang(lang: Language): Direction {
    return this.rtlLangs.includes(lang) ? Direction.rtl : Direction.ltr;
  }
}
