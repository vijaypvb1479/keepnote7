import React from 'react';
import {shallow } from 'enzyme';
import NoteTaker from '../../components/NoteTaker';

import {createSerializer} from 'enzyme-to-json';
 
expect.addSnapshotSerializer(createSerializer({mode: 'deep'}));

test('test Note Taker', () => {

    const wrapper = shallow(<NoteTaker />);
    expect(wrapper).toMatchSnapshot();


});