import * as React from 'react';
import { render } from 'react-dom';
import { shallow } from 'enzyme';
import UserDetails from './user-details';

describe('UserDetails Component', () => {

  xit('renders without crashing', () => {
    const div = document.createElement('div');

    render(<UserDetails/>, div);
  });

});