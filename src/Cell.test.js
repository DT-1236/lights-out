import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Cell from './Cell';

it('renders without crashing', () => {
  shallow(<Cell />);
});

it('matches the lit snapshot', () => {
  const wrapper = mount(
    <table>
      <tbody>
        <tr>
          <Cell isLit={true} />
        </tr>
      </tbody>
    </table>
  );
  const serialized = toJson(wrapper);
  expect(serialized).toMatchSnapshot();
});

it('matches the off snapshot', () => {
  const wrapper = mount(
    <table>
      <tbody>
        <tr>
          <Cell isLit={false} />
        </tr>
      </tbody>
    </table>
  );
  const serialized = toJson(wrapper);
  expect(serialized).toMatchSnapshot();
});
