import { getJsDoc } from './get-js-doc';

describe('getJsDoc', () => {
  it('should display route name and route method', () => {
    const result = getJsDoc('UserController_getName', 'GET');

    expect(result).toMatch(/^\/\*\* getName\n \* method: GET\n \*\/$/);
  });

  it('should display the route summary', () => {
    const result = getJsDoc(
      'UserController_getName',
      'GET',
      'this is a cool route',
    );

    expect(result).toMatch(/.*\* summary: this is a cool route\n.*/);
  });

  it('should display the route description', () => {
    const result = getJsDoc(
      'UserController_getName',
      'GET',
      'this is a cool route',
      "Heeho let's go",
    );

    expect(result).toMatch(/.*\* description: Heeho let's go\n.*/);
  });
});
