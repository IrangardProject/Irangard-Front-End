import React from 'react';
import { shallow } from 'enzyme';
import { create } from 'react-test-renderer';
import SwipeableTemporaryDrawer from '../Sidebar';
import userEvent from '@testing-library/user-event';



describe('SwipeableTemporaryDrawer', () => {
  test('renders correctly', () => {
    const component = shallow(<SwipeableTemporaryDrawer />);
    expect(component.exists()).toBe(true);
  });
});
