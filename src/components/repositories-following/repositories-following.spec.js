import * as React from 'react';
import { render } from 'react-dom';
import { shallow } from 'enzyme';
import RepositoriesFollowing from './repositories-following';

describe('RepositoriesFollowing Component', () => {

  xit('renders without crashing', () => {
    const div = document.createElement('section');

    render(<RepositoriesFollowing/>, div);
  });

});