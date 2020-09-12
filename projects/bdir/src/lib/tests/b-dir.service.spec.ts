import { DEFAULT_LANGUAGE, RTL_LANGUAGES_LIST } from '../b-dir.models';
import { BDirService } from '../b-dir.service';

describe('BDirService', () => {
  let directionService: BDirService;
  beforeEach(() => {
    directionService = new BDirService(RTL_LANGUAGES_LIST, DEFAULT_LANGUAGE);
    expect.hasAssertions();
  });

  it('should be created with default lang', () => {
    expect(directionService.value).toEqual('ltr');

    directionService = new BDirService(RTL_LANGUAGES_LIST, 'he');
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

  it('should return opposite direction for "LTR"', done => {
    directionService = new BDirService(RTL_LANGUAGES_LIST, 'he');
    directionService.oppositeDirChanges.subscribe(x => {
      expect(x).toBe('rtl');
      done();
    });
    directionService.setDir('ltr');
  });

  it('should return opposite direction for "RTL"', done => {
    directionService.oppositeDirChanges.subscribe(x => {
      expect(x).toBe('ltr');
      done();
    });
    directionService.setDir('rtl');
  });
});
