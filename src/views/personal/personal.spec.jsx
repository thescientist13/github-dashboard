import * as React from 'react';
import { render } from 'react-dom';
import { shallow } from 'enzyme';
import Personal from './personal';

describe('Personal View Component', () => {

  xit('renders without crashing', () => {
    const div = document.createElement('section');

    render(<Personal/>, div);
  });

});