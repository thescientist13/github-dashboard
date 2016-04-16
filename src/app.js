'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  ReactDOM.render(
    <h1>Hello, world!</h1>,
    document.getElementById('hello')
  )
);

// $(function() {
//
//   var $list = $('#repo-list');
//   var $owner = {
//     avatar: $('#owner-avatar'),
//     name: $('#owner-name')
//   };
//
//   function renderRepoList(list) {
//     var repo = {};
//     var i = 0;
//     var l = 0;
//
//     for (i = 0, l = list.length; i < l; i += 1) {
//       repo = list[i];
//
//       $list.append('<li><a target="_blank" href="' + repo.html_url + '">' + list[i].name + '</a></li>');
//     }
//   }
//
//   function displayRepoDetails(list) {
//     $owner.avatar.attr('src', list[0].owner.avatar_url);
//     $owner.name.html(list[0].owner.login);
//   }
//
//   // init
//   function init() {
//
//     $.ajax({
//       method: 'GET',
//       url: 'https://api.github.com/users/thescientist13/repos',
//       headers: {
//         'Accept': 'application/vnd.github.v3+json',
//         'Authorization': 'token aaaf5d8024e5aeff295067243b9ea0330cedb39a'
//       }
//     }).done(function(response) {
//       displayRepoDetails(response);
//       renderRepoList(response);
//     }).fail(function() {
//     });
//
//   }
//
//   init();
//
// });