import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Board from './Board';

describe('Basic smoke testing', () => {
  it('renders without crashing', () => {
    shallow(<Board />);
  });

  it('mounts without crashing', () => {
    mount(<Board />);
  });
});

describe('Initial board randomization behaves as expected', () => {
  it('auto-wins for a 1x1 board', () => {
    const wrapper = mount(<Board nrows={1} ncols={1} />);
    const serialized = toJson(wrapper);
    expect(serialized).toMatchSnapshot();
    expect(wrapper.find('p').text()).toEqual('You won! How nice');
  });

  it('2x1 board does not auto-win', () => {
    const wrapper = mount(<Board nrows={2} ncols={1} />);
    const serialized = toJson(wrapper);
    expect(serialized).toMatchSnapshot();
    expect(wrapper.find('.Cell[id="0-0"]').hasClass('Cell-lit')).toBeFalsy();
  });

  it('2x1 board should win with any click', () => {
    const wrapper = mount(<Board nrows={2} ncols={1} />);
    const cell = wrapper.find('.Cell[id="0-0"]');
    cell.simulate('click');
    expect(wrapper.find('p').text()).toEqual('You won! How nice');
  });
});

describe('flip cell behavior', () => {
  it('flips appropriate cells when clicking the middle and ignores the others', () => {
    const wrapper = mount(<Board nrows={3} ncols={3} />);
    const beforeLit = [
      wrapper.find('.Cell[id="1-1"]').hasClass('Cell-lit'),
      wrapper.find('.Cell[id="0-1"]').hasClass('Cell-lit'),
      wrapper.find('.Cell[id="1-0"]').hasClass('Cell-lit'),
      wrapper.find('.Cell[id="1-2"]').hasClass('Cell-lit'),
      wrapper.find('.Cell[id="2-1"]').hasClass('Cell-lit')
    ];
    const beforeNoChange = [
      wrapper.find('.Cell[id="0-0"]').hasClass('Cell-lit'),
      wrapper.find('.Cell[id="0-2"]').hasClass('Cell-lit'),
      wrapper.find('.Cell[id="2-0"]').hasClass('Cell-lit'),
      wrapper.find('.Cell[id="2-2"]').hasClass('Cell-lit')
    ];

    wrapper.find('.Cell[id="1-1"]').simulate('click');
    const afterLit = [
      wrapper.find('.Cell[id="1-1"]').hasClass('Cell-lit'),
      wrapper.find('.Cell[id="0-1"]').hasClass('Cell-lit'),
      wrapper.find('.Cell[id="1-0"]').hasClass('Cell-lit'),
      wrapper.find('.Cell[id="1-2"]').hasClass('Cell-lit'),
      wrapper.find('.Cell[id="2-1"]').hasClass('Cell-lit')
    ];
    const afterNoChange = [
      wrapper.find('.Cell[id="0-0"]').hasClass('Cell-lit'),
      wrapper.find('.Cell[id="0-2"]').hasClass('Cell-lit'),
      wrapper.find('.Cell[id="2-0"]').hasClass('Cell-lit'),
      wrapper.find('.Cell[id="2-2"]').hasClass('Cell-lit')
    ];

    expect(beforeLit.map(bool => !bool)).toEqual(afterLit);
    expect(beforeNoChange).toEqual(afterNoChange);
  });

  it('flips appropriate cells when clicking a corner and ignores the others', () => {
    const wrapper = mount(<Board nrows={3} ncols={3} />);
    const beforeLit = [
      wrapper.find('.Cell[id="0-1"]').hasClass('Cell-lit'),
      wrapper.find('.Cell[id="1-0"]').hasClass('Cell-lit'),
      wrapper.find('.Cell[id="0-0"]').hasClass('Cell-lit')
    ];
    const beforeNoChange = [
      wrapper.find('.Cell[id="1-1"]').hasClass('Cell-lit'),
      wrapper.find('.Cell[id="1-2"]').hasClass('Cell-lit'),
      wrapper.find('.Cell[id="2-1"]').hasClass('Cell-lit'),
      wrapper.find('.Cell[id="0-2"]').hasClass('Cell-lit'),
      wrapper.find('.Cell[id="2-0"]').hasClass('Cell-lit'),
      wrapper.find('.Cell[id="2-2"]').hasClass('Cell-lit')
    ];

    wrapper.find('.Cell[id="0-0"]').simulate('click');
    const afterLit = [
      wrapper.find('.Cell[id="0-1"]').hasClass('Cell-lit'),
      wrapper.find('.Cell[id="1-0"]').hasClass('Cell-lit'),
      wrapper.find('.Cell[id="0-0"]').hasClass('Cell-lit')
    ];
    const afterNoChange = [
      wrapper.find('.Cell[id="1-1"]').hasClass('Cell-lit'),
      wrapper.find('.Cell[id="1-2"]').hasClass('Cell-lit'),
      wrapper.find('.Cell[id="2-1"]').hasClass('Cell-lit'),
      wrapper.find('.Cell[id="0-2"]').hasClass('Cell-lit'),
      wrapper.find('.Cell[id="2-0"]').hasClass('Cell-lit'),
      wrapper.find('.Cell[id="2-2"]').hasClass('Cell-lit')
    ];

    expect(beforeLit.map(bool => !bool)).toEqual(afterLit);
    expect(beforeNoChange).toEqual(afterNoChange);
  });
});
