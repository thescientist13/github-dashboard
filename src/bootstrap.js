'use strict';

import $ from 'jquery';

// TODO get config
var CREDENTIALS = {};

$.ajax({
  async: false,
  url: './credentials.json',
  success: function(response) {
    CREDENTIALS = response;
  },
  error: function (response) {
    console.error(response);
  }
});


// TODO use custom elements
import OwnerDetails from './components/owner-details/owner-details';
import RepositoryList from './components/repository-list/repository-list';