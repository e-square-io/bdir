import { Component, DebugElement } from '@angular/core';
import { TestBed, ComponentFixture, async, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BDirDirective } from '../b-dir.directive';
import { RTL_LANGUAGES_LIST, Position } from '../b-dir.models';
import { BDirService } from '../b-dir.service';
import { RTL_LANGUAGES } from '../b-dir.tokens';

@Component({
  template: `
    <div [bdir]="pos"></div>
  `
})
class TestDirComponent {
  pos: Position = null;
}

describe('BdirDirective', () => {
  let fixture: ComponentFixture<TestDirComponent>;
  let component: TestDirComponent;
  let dirElem: DebugElement;
  let bdirDirectiveInstance: BDirDirective;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestDirComponent, BDirDirective],
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
    expect(bdirDirectiveInstance.bdir).toEqual(undefined);
    fixture.detectChanges();
    expect(dirElem.attributes.dir).toEqual('ltr');
    expect(bdirDirectiveInstance.bdir).toEqual('start');
  });

  it('should create a div with default direction when start provided', () => {
    component.pos = Position.Start;
    fixture.detectChanges();
    const DirElem = fixture.debugElement.query(By.directive(BDirDirective));
    expect(DirElem.attributes.dir).toEqual('ltr');
    expect(bdirDirectiveInstance.bdir).toEqual('start');
  });

  it('should create a div with opposite direction when end provided', () => {
    // enabling auto detect in order to cover ngOnChanges code
    fixture.autoDetectChanges(true);
    component.pos = Position.End;
    fixture.detectChanges();
    expect(dirElem.attributes.dir).toEqual('rtl');
    expect(bdirDirectiveInstance.bdir).toEqual('end');
  });
});
