import * as React from 'react';
import { render } from 'react-dom';
import { shallow } from 'enzyme';
import RepositoriesTable from './repositories-table';

describe('RepositoriesTable Component', () => {

  xit('renders without crashing', () => {
    const div = document.createElement('div');

    render(<TableRepositories/>, div);
  });

});