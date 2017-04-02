import * as React from 'react';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import { FollowingRepositoriesView } from './following';

describe('Following View Component', () => {
  let store, wrapper;

  const mockStore = configureStore();
  const initialState = {
    repositories: [{}, {}, {}],
    nextReposUrl: 'www'
  };

  function noop () {
  }

  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = mount(<FollowingRepositoriesView store={ store } dispatch={ noop }/>);
  });

  it('renders without crashing', () => {
    expect(wrapper.length).toEqual(1);
    expect(wrapper.find('h3').length).toEqual(1);
    expect(wrapper.find('RepositoriesTable').length).toEqual(1);
  });

  it('it checks the following view has the right data', () => {
    // TODO is this the best way to test state?
    let state = wrapper.props().store.getState();

    expect(state.repositories.length).toEqual(3);
    expect(state.nextReposUrl).toEqual(initialState.nextReposUrl);
  });

});