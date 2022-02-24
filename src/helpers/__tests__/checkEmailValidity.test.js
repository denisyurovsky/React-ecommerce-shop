import checkEmailValidity from '../checkEmailValidity';

describe('checkEmailValidity function tests', () => {
  it('should return true if a string contains all necessary characters', () => {
    //it should contain some characters, @ sign, dot sign and at least 2 characters after it

    expect(checkEmailValidity('seller1@gmail.com')).toEqual(true);
    expect(checkEmailValidity('admin@born2die.com')).toEqual(true);
    expect(checkEmailValidity('consumer1@gmail.com')).toEqual(true);
  });
  it('should return false if a string does not contain @ sign', () => {
    expect(checkEmailValidity('adminBorn2die.com')).toEqual(false);
  });
  it('should return false if a string does not contain dot sign', () => {
    expect(checkEmailValidity('admin@Born2diecom')).toEqual(false);
  });
  it('should return false if a string does contain @ sign, but after it has no symbols', () => {
    expect(checkEmailValidity('admin@')).toEqual(false);
  });
  it('should return false if a string contains cyrillic symbols', () => {
    expect(checkEmailValidity('денис@яндекс.ру')).toEqual(false);
  });
  it('should return false if a string contains "<", ">" characters', () => {
    expect(checkEmailValidity('adm<in@born2die.com')).toEqual(false);
    expect(checkEmailValidity('adm>in@born2die.com')).toEqual(false);
  });
  it('should return false if a string contains word spaces', () => {
    expect(checkEmailValidity('denis leyn@born2die.com')).toEqual(false);
  });
  it('should return false if a string does contain @ sign, dot sign but after it has 0 or only 1 symbol', () => {
    expect(checkEmailValidity('admin@bo.')).toEqual(false);
    expect(checkEmailValidity('admin@bo.r')).toEqual(false);
  });
});
