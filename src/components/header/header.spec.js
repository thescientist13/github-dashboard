import * as React from 'react';
import { render } from 'react-dom';
import { shallow } from 'enzyme';
import Header from './header';

describe('Header Component', () => {

  it('renders without crashing', () => {
    const section = document.createElement('section');

    render(<Header/>, section);
  });

  it('should render within a footer tag', () => {
    const header = shallow(<Header/>);

    expect(header.find('header').length).toEqual(1);
  });

  it('should render the text correctly', () => {
    const header = shallow(<Header/>);
    const text = <h1 className="header-text">Github Dashboard</h1>;

    expect(header.contains(text)).toEqual(true);
  });

});