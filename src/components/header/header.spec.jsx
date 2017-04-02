import * as React from 'react';
import { render } from 'react-dom';
import { shallow } from 'enzyme';
import Header from './header';

describe('Header Component', () => {
  let header;

  beforeEach(() => {
    header = shallow(<Header/>)
  });

  it('renders without crashing', () => {
    expect(header.length).toEqual(1);
  });

  it('should render within a footer tag', () => {
    expect(header.find('header').length).toEqual(1);
  });

  it('should render the text correctly', () => {
    const text = <h1 className="header-text">Github Dashboard</h1>;

    expect(header.contains(text)).toEqual(true);
  });

});