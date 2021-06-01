import {
  Directive,
  OnInit,
  OnDestroy,
  Input,
  ElementRef,
  Renderer2,
  OnChanges,
  SimpleChanges,
  EventEmitter,
  Output, SkipSelf, Optional, ChangeDetectorRef
} from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { DirectionInput, Position } from './b-dir.models';
import { BDirService, mapOppositeDir } from './b-dir.service';
import { takeUntil, startWith, switchMap, map, tap, skipWhile } from 'rxjs/operators';
import { Directionality, Direction } from '@angular/cdk/bidi';

export const mapPositionToDirection = (value: Position, dir: Direction = 'ltr'): Direction => value === 'start' ? dir : mapOppositeDir(dir);

@Directive({
  selector: '[bdir],[dir]',
  providers: [{ provide: Directionality, useExisting: BDirDirective }],
  host: { '[attr.dir]': 'value' }
})
export class BDirDirective implements Directionality, OnInit, OnDestroy {
  static ngAcceptInputType_bdir: DirectionInput;
  private _destroy$: Subject<void> = new Subject();
  private _position: Position = 'start';
  private _dir: Direction;
  private _value: Direction;

  @Input() get dir(): Direction {
    return this._dir;
  }

  set dir(value: Direction) {
    if (value !== this._dir) {
      this.value = value;
      this._dir = value;
    }
  }

  @Input('bdir') get position(): Position {
    return this._position;
  }

  set position(value: Position) {
    if (value && value !== this._position) {
      this.value = mapPositionToDirection(value, this.directionality?.value);
      this._position = value;
    }
  }

  get value(): Direction {
    return this._value;
  }

  set value(value) {
    if (value !== this._value) {
      this._value = value;
      this.change.emit(value);
    }
  }

  @Output() change: EventEmitter<Direction> = new EventEmitter<Direction>();

  constructor(@SkipSelf() private directionality: Directionality) {
  }

  ngOnInit() {
    this.directionality.change.pipe(
      takeUntil(this._destroy$),
      startWith(this.dir || this.directionality.value),
      tap(dir => this.value = mapPositionToDirection(this.position, this.dir || dir))
    ).subscribe();
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this.change.complete();
  }
}
