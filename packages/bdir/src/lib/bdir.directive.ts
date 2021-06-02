import {
  Directive,
  OnInit,
  OnDestroy,
  Input,
  EventEmitter,
  Output,
  SkipSelf,
  HostBinding,
} from '@angular/core';
import { Subject } from 'rxjs';
import { DirectionInput, Position, PositionInput } from './bdir.models';
import { mapOppositeDir } from './bdir.service';
import { takeUntil, tap } from 'rxjs/operators';
import { Directionality, Direction } from '@angular/cdk/bidi';

export const mapPositionToDirection = (
  value: Position,
  dir: Direction = 'ltr'
): Direction => (value === 'start' ? dir : mapOppositeDir(dir));
export const coerceDirectionProperty = (val: DirectionInput): Direction =>
  val === null || val === undefined ? 'ltr' : val;
export const coercePositionProperty = (val: PositionInput): Position =>
  val === null || val === undefined ? 'start' : val;

@Directive({
  selector: '[bdir],[dir]',
  providers: [{ provide: Directionality, useExisting: BDirDirective }],
})
export class BDirDirective implements Directionality, OnInit, OnDestroy {
  static ngAcceptInputType_dir: DirectionInput;
  static ngAcceptInputType_bdir: PositionInput;

  private _destroy$: Subject<void> = new Subject();

  @HostBinding('attr.dir')
  @Input('dir')
  get value(): Direction {
    return this._dir;
  }
  set value(value: Direction) {
    const coerced = coerceDirectionProperty(value);

    if (coerced !== this._dir) {
      this._dir = coerced;
      this.change.emit(coerced);
    }
  }
  private _dir: Direction = 'ltr';

  @Input('bdir') get position(): Position {
    return this._position;
  }
  set position(value: Position) {
    const coerced = coercePositionProperty(value);

    if (coerced !== this._position) {
      this._position = coerced;
      this.value = mapPositionToDirection(coerced, this.directionality?.value);
    }
  }
  private _position: Position = 'start';

  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() change: EventEmitter<Direction> = new EventEmitter<Direction>();

  constructor(@SkipSelf() private directionality: Directionality) {
    this.value = directionality.value;
  }

  ngOnInit() {
    this.directionality.change
      .pipe(
        takeUntil(this._destroy$),
        tap(
          (dir) =>
            (this.value = mapPositionToDirection(
              this.position,
              this.value || dir
            ))
        )
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this.change.complete();
  }
}
