import * as React from 'react';
import { render } from 'react-dom';
import { shallow } from 'enzyme';
import RepositoriesPersonal from './repositories-personal';

describe('RepositoriesPersonal Component', () => {

  xit('renders without crashing', () => {
    const div = document.createElement('section');

    render(<RepositoriesPersonal/>, div);
  });

});