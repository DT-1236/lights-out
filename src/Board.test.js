import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Board from './Board';

it('renders without crashing', () => {
  shallow(<Board />);
});
