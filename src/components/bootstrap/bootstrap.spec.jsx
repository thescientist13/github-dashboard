import * as React from 'react';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import { render } from 'react-dom';
import { Bootstrap } from './bootstrap';

describe('Bootstrap Component', () => {
  let store, container, wrapper;

  const mockStore = configureStore();
  const initialState = {
    userDetails: {},
    userRepositories: {},
    userSubscriptions: {}
  };

  function noop () {
  }

  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = mount(<Bootstrap store={ store } dispatch={ noop }/>)
  });

  xit('renders without crashing', () => {
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