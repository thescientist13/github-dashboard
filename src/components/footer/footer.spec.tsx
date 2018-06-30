import * as React from 'react';
import { shallow } from 'enzyme';
import Footer from './footer';

describe('Footer Component', () => {
  let footer;

  beforeEach(() => {
    footer = shallow(<Footer/>);
  });

  it('renders without crashing', () => {
    expect(footer.length).toEqual(1);
  });

  it('should render within a footer tag', () => {
    expect(footer.find('footer').length).toEqual(1);
  });

  it('should render the text correctly', () => {
    const text = <h5>&copy; 2016 - Owen Buckley, The Greenhouse</h5>;

    expect(footer.contains(text)).toEqual(true);
  });

});