import * as React from 'react';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import { render } from 'react-dom';
import { UserDetails } from './user-details';

describe('UserDetails Component', () => {
  let store, container, wrapper;

  const mockStore = configureStore();
  const initialState = {
    userDetails: {
      avatar: 'http://api.github.com/v1/img/thescientist13.avatar.jpg',
      username: 'thescientist13'
    }
  };

  function noop () {
  }

  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = mount(<UserDetails store={store} dispatch={ noop }/>)
  });

  it('renders without crashing', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('renders a user\'s details', () => {
    // TODO is this the best way to test state?
    let state = wrapper.props().store.getState();

    expect(wrapper.find('img').length).toEqual(1);
    expect(wrapper.find('h1').length).toEqual(1);

    expect(state.userDetails.username).toEqual(initialState.userDetails.username);
    expect(state.userDetails.avatar).toEqual(initialState.userDetails.avatar);
  })

});