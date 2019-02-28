import React from 'react';
import { mount } from 'enzyme';
import NotesContainer from '../../components/NotesContainer';
import { MemoryRouter } from 'react-router-dom';
import { createSerializer } from 'enzyme-to-json';

expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));

let notes, handleRemoveNote, wrapper;

beforeEach(() => {
    handleRemoveNote = jest.fn();
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
        <MemoryRouter>
            <NotesContainer
                notes={notes}
                handleRemoveNote={handleRemoveNote} />
        </MemoryRouter>
    );

})

test('test Grid View ', () => {

    expect(wrapper).toMatchSnapshot();

});