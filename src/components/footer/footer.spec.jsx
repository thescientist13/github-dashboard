import * as React from 'react';
import { render } from 'react-dom';
import { shallow } from 'enzyme';
import Footer from './footer';

describe('Footer Component', () => {

  it('renders without crashing', () => {
    const div = document.createElement('section');

    render(<Footer/>, div);
  });

  it('should render within a footer tag', () => {
    const footer = shallow(<Footer/>);

    expect(footer.find('footer').length).toEqual(1);
  });

  it('should render the text correctly', () => {
    const footer = shallow(<Footer/>);
    const text = <h5>&copy; 2016 - Owen Buckley, The Greenhouse</h5>;

    expect(footer.contains(text)).toEqual(true);
  });

});