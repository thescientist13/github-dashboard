import * as React from 'react';
import { Link } from 'react-router';
import { shallow } from 'enzyme';
import Navigation from './navigation';

describe('Navigation Component', () => {
  let navigation;

  beforeEach(() => {
    navigation = shallow(<Navigation/>);
  });

  it('renders without crashing', () => {
    expect(navigation.length).toEqual(1);
  });

  it('should render within a nav tag and two links', () => {
    expect(navigation.find('nav').length).toEqual(1);
    expect(navigation.find('li').length).toEqual(2);
  });

  it('should render the personal link correctly', () => {
    const link = <li><Link to="/personal">Personal</Link></li>;

    expect(navigation.contains(link)).toEqual(true);
  });

  it('should render the following link correctly', () => {
    const link = <li><Link to="/following">Following</Link></li>;

    expect(navigation.contains(link)).toEqual(true);
  });

});