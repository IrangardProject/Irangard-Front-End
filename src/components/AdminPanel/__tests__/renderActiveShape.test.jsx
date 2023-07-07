import React from 'react';
import { shallow } from 'enzyme';
import { Sector } from 'recharts';
import { renderActiveShape, data5 } from '../option5';

describe('renderActiveShape', () => {
    it('should render correctly', () => {
        const wrapper = shallow(<Sector />);
        expect(wrapper).toMatchSnapshot();
    });
    test('should render correctly', () => {
        const wrapper = shallow(<Sector />);
        expect(wrapper).toMatchSnapshot();
    }
    );
    test('should render the correct elements and props', () => {
        const props = {
          cx: 100,
          cy: 100,
          midAngle: 90,
          innerRadius: 20,
          outerRadius: 40,
          startAngle: 0,
          endAngle: 180,
          fill: 'red',
          payload: { name: 'Group A' },
          percent: 0.5,
          value: 400,
        };
        });
      });
      
      describe('data5', () => {
        test('should contain the correct array data', () => {
          expect(data5).toEqual([
            { name: 'Group A', value: 400 },
            { name: 'Group B', value: 300 },
            { name: 'Group C', value: 300 },
            { name: 'Group D', value: 200 },
          ]);
        });
});