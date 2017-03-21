import * as React from 'react';
import { render } from 'react-dom';
// import { shallow } from 'enzyme';
import Following from './following';

describe('Following View Component', () => {

  xit('renders without crashing', () => {
    const div = document.createElement('section');

    render(<Following/>, div);
  });

});