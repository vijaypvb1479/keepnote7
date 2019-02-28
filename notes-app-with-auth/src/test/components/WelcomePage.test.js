import React from 'react';
import {shallow } from 'enzyme';
import WelcomePage from '../../components/WelcomePage';

import {createSerializer} from 'enzyme-to-json';
 
expect.addSnapshotSerializer(createSerializer({mode: 'deep'}));

test('test welcome page', () => {

    const wrapper = shallow(<WelcomePage />);
    expect(wrapper).toMatchSnapshot();


});