import { RTL_LANGUAGES_LIST, Direction } from '../b-dir.models';
import { BDirService } from '../b-dir.service';
import { of } from 'rxjs';
import { EventEmitter } from '@angular/core';

describe('BDirService', () => {
  const rtlLangs = RTL_LANGUAGES_LIST;
  let directionService: BDirService;
  beforeEach(() => {
    directionService = new BDirService(rtlLangs);
    expect.hasAssertions();
  });

  it('should be created with default lang', () => {
    expect(directionService.getDir()).toEqual('ltr');

    directionService = new BDirService(rtlLangs, 'he');
    expect(directionService.getDir()).toEqual('rtl');
  });

  it('should set language', () => {
    directionService.setLang('he');
    expect(directionService.getDir()).toEqual(Direction.rtl);
    expect(directionService.getOppositeDir()).toEqual(Direction.ltr);

    directionService.setLang('en');
    expect(directionService.getDir()).toEqual(Direction.ltr);
    expect(directionService.getOppositeDir()).toEqual(Direction.rtl);
  });

  it('should not change direction if its already the current one', () => {
    const spy = spyOn(directionService.dirChanges as EventEmitter<Direction>, 'emit');
    directionService.setDir('ltr');
    expect(spy).not.toHaveBeenCalled();
  });

  it('should return opposite direction for "LTR"', done => {
    directionService = new BDirService(rtlLangs, 'he');
    directionService.oppositeDirChanges.subscribe(x => {
      expect(x).toBe(Direction.rtl);
      done();
    });
    directionService.setDir('ltr');
  });

  it('should return opposite direction for "RTL"', done => {
    directionService.oppositeDirChanges.subscribe(x => {
      expect(x).toBe(Direction.ltr);
      done();
    });
    directionService.setDir('rtl');
  });
});
