import React from 'react';
import {shallow } from 'enzyme';
import SearchBar from '../../components/SearchBar';

import {createSerializer} from 'enzyme-to-json';
 
expect.addSnapshotSerializer(createSerializer({mode: 'deep'}));

test('test Search Bar', () => {

    const wrapper = shallow(<SearchBar />);
    expect(wrapper).toMatchSnapshot();


});