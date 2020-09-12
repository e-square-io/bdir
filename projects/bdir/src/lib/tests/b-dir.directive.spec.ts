import { Component, DebugElement, EventEmitter, Output } from '@angular/core';
import { TestBed, ComponentFixture, async, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BDirDirective } from '../b-dir.directive';
import { RTL_LANGUAGES_LIST, Position } from '../b-dir.models';
import { BDirService } from '../b-dir.service';
import { RTL_LANGUAGES } from '../b-dir.tokens';
import { Direction, Directionality } from '@angular/cdk/bidi';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'bdir-child',
  template: `
    <div></div>
  `
})
class ChildTestComponent {
  @Output() dir = this._dir.change;

  constructor(private _dir: Directionality) {}
}

@Component({
  template: `
    <div [bdir]="pos"><bdir-child (dir)="dir = $event"></bdir-child></div>
  `
})
class TestDirComponent {
  pos: Position = null;
  dir: Direction;
}

describe('BdirDirective', () => {
  let fixture: ComponentFixture<TestDirComponent>;
  let component: TestDirComponent;
  let dirElem: DebugElement;
  let bdirDirectiveInstance: BDirDirective;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestDirComponent, ChildTestComponent, BDirDirective],
      providers: [
        BDirService,
        { provide: RTL_LANGUAGES, useValue: RTL_LANGUAGES_LIST }
      ]
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
