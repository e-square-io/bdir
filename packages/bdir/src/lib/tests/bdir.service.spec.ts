import { TestBed } from '@angular/core/testing';
import { BDirService } from '../bdir.service';
import { DEFAULT_LANG } from '../bdir.tokens';

describe('BDirService', () => {
  let directionService: BDirService;

  beforeEach(() => {
    directionService = TestBed.inject(BDirService);
  });

  it('should be created with default lang', async () => {
    expect(directionService.value).toEqual('ltr');

    await TestBed.resetTestingModule()
      .overrideProvider(DEFAULT_LANG, { useValue: 'he' })
      .compileComponents();
    directionService = TestBed.inject(BDirService);

    expect(directionService.value).toEqual('rtl');
  });

  it('should set language', () => {
    directionService.setLang('he');
    expect(directionService.value).toEqual('rtl');
    expect(directionService.getOppositeDir()).toEqual('ltr');

    directionService.setLang('en');
    expect(directionService.value).toEqual('ltr');
    expect(directionService.getOppositeDir()).toEqual('rtl');
  });

  it('should not change direction if its already the current one', () => {
    const spy = spyOn(directionService.change, 'emit');
    directionService.setDir('ltr');
    expect(spy).not.toHaveBeenCalled();
  });

  it('should return opposite direction for "LTR"', async (done) => {
    await TestBed.resetTestingModule()
      .overrideProvider(DEFAULT_LANG, { useValue: 'he' })
      .compileComponents();
    directionService = TestBed.inject(BDirService);

    directionService.oppositeDirChanges.subscribe((x) => {
      expect(x).toBe('rtl');
      done();
    });
    directionService.setDir('ltr');
  });

  it('should return opposite direction for "RTL"', (done) => {
    directionService.oppositeDirChanges.subscribe((x) => {
      expect(x).toBe('ltr');
      done();
    });
    directionService.setDir('rtl');
  });
});
