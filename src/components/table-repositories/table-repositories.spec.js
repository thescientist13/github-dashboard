import * as React from 'react';
import { render } from 'react-dom';
import { shallow } from 'enzyme';
import TableRepositories from './table-repositories';

describe('TableRepositories Component', () => {

  xit('renders without crashing', () => {
    const div = document.createElement('div');

    render(<TableRepositories/>, div);
  });

});