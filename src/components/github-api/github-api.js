'use strict';

import {CREDENTIALS} from '../../credentials';
import $ from 'jquery'

export class GithubAPI {

  constructor(){
    $.ajaxSetup({
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'Authorization': 'token ' +  CREDENTIALS.accessToken
      }
    });
  }

  // TODO this should be private
  makeRequest(method, api, doneCallback) {
    $.ajax({
      method: method || 'GET',
      url: 'https://api.github.com/' + api
    }).done(doneCallback)
  }

  getUserDetails(doneCallback) {
    this.makeRequest('GET', 'user', doneCallback);
  }

  getUserRepositories(doneCallback) {
    this.makeRequest('GET', 'users/' + CREDENTIALS.username + '/repos', doneCallback);
  }

}