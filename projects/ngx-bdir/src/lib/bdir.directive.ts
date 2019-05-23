import { Directive, OnInit, OnDestroy, Input, ElementRef, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';
import { Dir, Pos } from './ngx-bdir.models';
import { NgxBdirService } from './ngx-bdir.service';

@Directive({
  selector: '[bdir]'
})
export class BdirDirective implements OnInit, OnDestroy {
  @Input() bdir: Pos = Pos.Start;

  private dirSubscription: Subscription;

  constructor(private directionService: NgxBdirService, private element: ElementRef, private renderer: Renderer2) {}

  public ngOnInit(): void {
    this.dirSubscription = this.getSubscription().subscribe(dir => {
      this.renderer.setAttribute(this.element.nativeElement, 'dir', dir);
    });
  }

  public ngOnDestroy(): void {
    this.dirSubscription.unsubscribe();
  }

  private getSubscription() {
    return this.bdir === Pos.Start ? this.directionService.getDir$() : this.directionService.getOppositeDir$();
  }
}