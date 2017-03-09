import { GithubApi } from './github-api';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe('GitHub API Service', () => {

  it('should test getUserDetails returns correct user data', () => {
    const mock = new MockAdapter(axios);
    const credentials = {
      username: 'thescientist13',
      accessToken: 'xxx'
    };
    const mockUserDetailsResponse = {
      login: 'thescientist13',
      avatar_url: 'https://avatars3.githubusercontent.com/u/895923?v=3'
    };

    mock.onGet('https://api.github.com/user').reply(200, mockUserDetailsResponse);

    new GithubApi(credentials).getUserDetails().then((response) => {
      expect(response.username).toEqual(credentials.username);
      expect(response.avatar).toEqual(mockUserDetailsResponse.avatar_url);
    });

  });
});