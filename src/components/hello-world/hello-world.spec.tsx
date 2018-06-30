import * as React from 'react';
import { shallow } from 'enzyme';

import Hello from './hello-world';

it('renders the heading', () => {
  const result = shallow(<Hello />).contains(<h1>Hello!</h1>);
  
  expect(result).toBeTruthy();
});