import checkPasswordValidity from '../checkPasswordValidity';

describe('checkPasswordValidity function tests', () => {
  it('should return true if a string contains all necessary characters', () => {
    //it should contain minimum 8 characters, including at least 1 number, 1 capital letter, 1 special character

    expect(checkPasswordValidity('Denis1234$')).toEqual(true);
    expect(checkPasswordValidity('BtD!#$%^&*3</>')).toEqual(true);
    expect(checkPasswordValidity('BtD !#$%^&*3</>')).toEqual(true);
  });
  it('should return false if a string does not contain special character', () => {
    expect(checkPasswordValidity('Denis1234')).toEqual(false);
  });
  it('should return false if a string does not contain at least one capital letter', () => {
    expect(checkPasswordValidity('denis1234$')).toEqual(false);
  });

  it('should return false if a string does not contain at least one digit', () => {
    expect(checkPasswordValidity('Denis$$$')).toEqual(false);
  });

  it('should return false if a string contains cyrillic letters', () => {
    expect(checkPasswordValidity('Денис1234$')).toEqual(false);
  });
});
