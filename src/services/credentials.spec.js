import { Credentials } from './credentials';

describe('Credentials Service', () => {

  it('should test Credentials service returns expected user credentials', () => {
    const credentials = new Credentials().getCredentials();

    expect(credentials.username).toBeDefined();
    expect(credentials.accessToken).toBeDefined();
  });

});