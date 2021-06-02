import { Component, DebugElement, Input, Output } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BDirDirective } from '../bdir.directive';
import { Position } from '../bdir.models';
import { BDirService } from '../bdir.service';
import { Direction, Directionality } from '@angular/cdk/bidi';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'bdir-child',
  template: ` <div></div> `,
})
class ChildTestComponent {
  @Output() direction = this._dir.change.pipe(startWith(this._dir.value));

  constructor(private _dir: Directionality) {}
}

@Component({
  template: `
    <div [bdir]="pos">
      <bdir-child (direction)="setDir($event)"></bdir-child>
    </div>
  `,
})
class TestDirComponent {
  @Input() pos?: Position;
  dir?: Direction;

  setDir(dir: Direction) {
    this.dir = dir;
  }
}

describe('BdirDirective', () => {
  let fixture: ComponentFixture<TestDirComponent>;
  let component: TestDirComponent;
  let dirElem: DebugElement;
  let bdirDirectiveInstance: BDirDirective;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestDirComponent, ChildTestComponent, BDirDirective],
      providers: [BDirService],
    }).compileComponents();

    fixture = TestBed.createComponent(TestDirComponent);
    component = fixture.componentInstance;
    dirElem = fixture.debugElement.query(By.directive(BDirDirective));
    bdirDirectiveInstance = dirElem.injector.get(BDirDirective);
  });

  it('should create a div with default direction when none provided', () => {
    expect(bdirDirectiveInstance.position).toEqual('start');
    fixture.detectChanges();
    expect(dirElem.attributes.dir).toEqual('ltr');
    expect(bdirDirectiveInstance.value).toEqual('ltr');
    expect(component.dir).toEqual('ltr');
  });

  it('should create a div with default direction when start provided', () => {
    component.pos = 'start';
    fixture.detectChanges();
    expect(dirElem.attributes.dir).toEqual('ltr');
    expect(bdirDirectiveInstance.value).toEqual('ltr');
    expect(component.dir).toEqual('ltr');
    expect(bdirDirectiveInstance.position).toEqual('start');
  });

  it('should create a div with opposite direction when end provided', () => {
    component.pos = 'end';
    fixture.detectChanges();
    expect(dirElem.attributes.dir).toEqual('rtl');
    expect(bdirDirectiveInstance.value).toEqual('rtl');
    expect(component.dir).toEqual('rtl');
    expect(bdirDirectiveInstance.position).toEqual('end');
  });
});
