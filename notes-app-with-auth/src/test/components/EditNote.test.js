import React from 'react';
import {mount } from 'enzyme';
import EditNote from '../../components/EditNote';

import  {createSerializer} from 'enzyme-to-json';
 
expect.addSnapshotSerializer(createSerializer({mode: 'deep'}));

let notes, handleRemoveNote, wrapper;

beforeEach(() => {
    const match = { params: { id: '1' } }
    notes = [
        {
            "noteTitle": "note-1",
            "noteDescription": "note-1 description",
            "id": 2
        }, {
            "noteTitle": "note-2",
            "noteDescription": "note-2 description",
            "id": 1
        }];

    wrapper = mount(
        <EditNote
            notes={notes}
            match={match} />
    );

})

test('test Grid View ', () => {

    expect(wrapper).toMatchSnapshot();

});