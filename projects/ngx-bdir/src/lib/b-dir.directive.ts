import { Directive, OnInit, OnDestroy, Input, ElementRef, Renderer2, OnChanges, SimpleChanges } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Position, Direction } from './b-dir.models';
import { BDirService } from './b-dir.service';
import { takeUntil, startWith } from 'rxjs/operators';

@Directive({
  selector: '[bdir]'
})
export class BDirDirective implements OnInit, OnChanges, OnDestroy {
  private destroy$: Subject<void> = new Subject();

  @Input() bdir: Position;


  constructor(private directionService: BDirService, private element: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    if (!this.bdir) {
      this.bdir = Position.Start;
    }
    this.initSubscription();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const bdirChanges = changes.bdir;
    if (bdirChanges && !bdirChanges.firstChange && bdirChanges.currentValue !== bdirChanges.previousValue) {
      this.destroy$.next();
      this.initSubscription();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  private initSubscription(): void {
    this.getSubscription().pipe(
      takeUntil(this.destroy$),
      startWith(this.bdir === Position.Start ? this.directionService.getDir() : this.directionService.getOppositeDir())
    ).subscribe(dir => {
      this.renderer.setAttribute(this.element.nativeElement, 'dir', dir);
    });
  }

  private getSubscription(): Observable<Direction> {
    return this.bdir === Position.Start
      ? this.directionService.dirChanges
      : this.directionService.oppositeDirChanges;
  }
}
