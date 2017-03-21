import * as React from 'react';
import { render } from 'react-dom';
import { shallow } from 'enzyme';
import Bootstrap from './bootstrap';

describe('Bootstrap Component', () => {

  xit('renders without crashing', () => {
    const div = document.createElement('section');

    render(<Bootstrap/>, div);
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