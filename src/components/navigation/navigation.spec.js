import * as React from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router';
import { shallow } from 'enzyme';
import Navigation from './navigation';

describe('Navigation Component', () => {

  it('renders without crashing', () => {
    const section = document.createElement('section');

    render(<Navigation/>, section);
  });

  it('should render within a nav tag and two links', () => {
    const nav = shallow(<Navigation/>);

    expect(nav.find('nav').length).toEqual(1);
    expect(nav.find('li').length).toEqual(2);
  });

  it('should render the personal link correctly', () => {
    const nav = shallow(<Navigation/>);
    const link = <li><Link to="/personal">Personal</Link></li>;

    expect(nav.contains(link)).toEqual(true);
  });

  it('should render the following link correctly', () => {
    const nav = shallow(<Navigation/>);
    const link = <li><Link to="/following">Following</Link></li>;

    expect(nav.contains(link)).toEqual(true);
  });

});