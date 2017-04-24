import * as React from 'react';
import axios from 'axios';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import { Bootstrap } from './bootstrap';
import MockAdapter from 'axios-mock-adapter';

describe('Bootstrap Component', () => {
  let store, mock, wrapper, dispatch;

  const mockStore = configureStore();
  const initialState = {
    userDetails: {
      username: '',
      avatar: ''
    },
    userRepositories: {
      repositories: [],
      nextReposUrl: undefined
    },
    userSubscriptions: {
      repositories: [],
      nextReposUrl: undefined
    }
  };

  beforeEach(() => {
    store = mockStore(initialState);
    dispatch = store.dispatch.bind(store);

    mock = new MockAdapter(axios);
    mock.onGet('https://api.github.com/user').reply(200, {});
    mock.onGet('https://api.github.com/users/thescientist13/repos').reply(200, [], {});
    mock.onGet('https://api.github.com/users/thescientist13/subscriptions').reply(200, [], {});

    wrapper = mount(<Bootstrap store={ store } dispatch={ dispatch }/>);
  });

  it('renders without crashing', () => {
    expect(wrapper.length).toBe(1);
  });

  it('should render the shell of the page with a header component', () => {
    expect(wrapper.find('header').length).toEqual(1);
    expect(wrapper.find('.tgh-header').length).toEqual(1);
  });

  it('should render the shell of the page with a footer component ', () => {
    expect(wrapper.find('footer').length).toEqual(1);
    expect(wrapper.find('.tgh-footer').length).toEqual(1);
  });

  it('should render the shell of the page with a navigation component', () => {
    expect(wrapper.find('nav').length).toEqual(1);
    expect(wrapper.find('.tgh-navigation').length).toEqual(1);
  });

  it('should render the shell of the page with a user details component', () => {
    expect(wrapper.find('.tgh-user-details').length).toEqual(1);
  });

});