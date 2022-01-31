import convertBase64 from '../convertBase64';

const file = new Blob(['Hello world.'], { type: 'text/plain;charset=utf-8' });

describe('ConvertBase64 function', () => {
  it('should convert file to the base64format', async () => {
    const result = await convertBase64(file);

    expect(result).toContain('base64');
  });
});
