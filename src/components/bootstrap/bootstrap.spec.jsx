import * as React from 'react';
import axios from 'axios';
import configureStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import { shallow } from 'enzyme';
import { Bootstrap } from './bootstrap';

describe('Bootstrap Component', () => {
  let store, mock, wrapper;

  const mockStore = configureStore();
  const initialState = {
    userDetails: {},
    userRepositories: {},
    userSubscriptions: {}
  };

  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = shallow(<Bootstrap store={ store }/>);
    mock = new MockAdapter(axios);
  });

  xit('renders without crashing', () => {
    mock.onGet('https://api.github.com/user').reply(200, {});
    mock.onGet('https://api.github.com/users/thescientist13/subscriptions').reply(200, {});
    mock.onGet('https://api.github.com/users/thescientist13/repos').reply(200, {});
    expect(wrapper.length).toEqual(1);
  });

  xit('should render the shell of the page', () => {
    const footer = shallow(<Bootstrap/>);

    expect(footer.find('header').length).toEqual(1);
    expect(footer.find('user-details').length).toEqual(1);
    expect(footer.find('navigation').length).toEqual(1);
    expect(footer.find('footer').length).toEqual(1);
  });

  xit('should render with initial following tables view', () => {

  });

});