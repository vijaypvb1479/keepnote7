import React, { Component, Fragment } from 'react';
import { Router, Route, Redirect, Switch } from 'react-router-dom';
import NotesApp from '../components/NotesApp';
import EditNote from '../components/EditNote';
import WelcomePage from '../components/WelcomePage';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { blue, pink } from '@material-ui/core/colors';
import Header from '../components/Header';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();
const theme = createMuiTheme({
    palette: {
        primary: blue,
        secondary: pink,
    },
    typography: {
        useNextVariants: true,
    },
});

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
    <Route {...rest} render={(props) => (
        localStorage.getItem('isLoggedIn')
            ? <Component {...props} {...rest} />
            : <Redirect to="/" />
    )} />
);

class AppRouter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            originalNotes: [],
            notes: [],
            reminders : [],
            currentPage: 'notes',
            
        };
        this.handleAddNote = this.handleAddNote.bind(this);
        this.handleRemoveNote = this.handleRemoveNote.bind(this);
        this.handleUpdateNote = this.handleUpdateNote.bind(this);
        this.handleSearchNote = this.handleSearchNote.bind(this);
        this.handleCurrentPage = this.handleCurrentPage.bind(this);
        this.handleReloadData = this.handleReloadData.bind(this);

        this.handleAddReminder = this.handleAddReminder.bind(this);
        this.handleRemoveReminder = this.handleRemoveReminder.bind(this);
    }

    componentDidMount() {
        let userid = localStorage.getItem('LoggedInUser');
        // Get all the notes
        fetch(`http://localhost:8082/noteservice/api/v1/note/${userid}`)
            .then(response => response.json())
            .then(success => this.setState({
                notes: success,
                originalNotes: success,
            }))
        // Get all the notes
        fetch(`http://localhost:8083/reminderservice/api/v1/reminder/${userid}`)
        .then(response => response.json())
        .then(success => this.setState({
            reminders: success,
        }))               
    }

    handleReloadData() {
        let userid = localStorage.getItem('LoggedInUser');
        // Get all the notes
        fetch(`http://localhost:8082/noteservice/api/v1/note/${userid}`)
            .then(response => response.json())
            .then(success => this.setState({
                notes: success,
                originalNotes: success,
            }));
        // Get all the notes
        fetch(`http://localhost:8083/reminderservice/api/v1/reminder/${userid}`)
        .then(response => response.json())
        .then(success => this.setState({
            reminders: success,
        }))            

    }
    handleCurrentPage(currentPage){
        this.setState((currState) => ({
            currentPage: currentPage,
        }));

    }

    handleAddReminder(reminder) {
        fetch('http://localhost:8083/reminderservice/api/v1/reminder', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(reminder)
        }).then(response => response.json())
          .then(reminder => {
            this.setState((currState) => ({
                reminders: currState.reminders.concat([reminder]),
            }));
                
            });
    }

    handleRemoveReminder(reminderId) {
        let userid = localStorage.getItem('LoggedInUser');
        fetch(`http://localhost:8083/reminderservice/api/v1/reminder/${userid}/${reminderId}`, {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" }
        })
          //  .then(response => response.json())
            .then(response => {
                const reminderIndexToRemove = this.state.reminders.findIndex(reminder => reminder.reminderId === reminderId);
                this.setState((currState) => ({
                    reminders: [...currState.reminders.slice(0, reminderIndexToRemove), ...currState.reminders.slice(reminderIndexToRemove + 1)]
                }));
            });
    }

    handleAddNote(note) {
        console.log(note);
        fetch('http://localhost:8082/noteservice/api/v1/note', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(note)
        }).then(response => response.json())
          .then(note => {
            this.setState((currState) => ({
                notes: currState.notes.concat([note]),
                originalNotes: currState.notes.concat([note])
            }));
                
            });
        // Post a new note
    }


    handleRemoveNote(noteId) {
        let userid = localStorage.getItem('LoggedInUser');
        fetch(`http://localhost:8082/noteservice/api/v1/note/${userid}/${noteId}`, {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" }
        })
          //  .then(response => response.json())
            .then(response => {
                const noteIndexToRemove = this.state.notes.findIndex(note => note.id === noteId);
                this.setState((currState) => ({
                    notes: [...currState.notes.slice(0, noteIndexToRemove), ...currState.notes.slice(noteIndexToRemove + 1)],
                    originalNotes: [...currState.notes.slice(0, noteIndexToRemove), ...currState.notes.slice(noteIndexToRemove + 1)]
                }));
            });
    }

    handleUpdateNote(updatedNote) {
        let userid = localStorage.getItem('LoggedInUser');
        fetch(`http://localhost:8082/noteservice/api/v1/note/${userid}/${updatedNote.id}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedNote)
        })
            .then(response => response.json())
            .then(note => {
                const noteIndexToUpdate = this.state.notes.findIndex(note => note.id === updatedNote.id);
        this.setState((currState) => ({
            notes: [...currState.notes.slice(0, noteIndexToUpdate), { ...updatedNote }, ...currState.notes.slice(noteIndexToUpdate + 1)],
            originalNotes: [...currState.notes.slice(0, noteIndexToUpdate), { ...updatedNote }, ...currState.notes.slice(noteIndexToUpdate + 1)]
        }));
            });
    }

    handleSearchNote(event) {
        let searchCondition = event.target.value.toLowerCase();
        searchCondition ?
            this.setState((currState) => ({
                notes: currState.originalNotes.filter(note => (note.noteTitle.toLowerCase().indexOf(searchCondition) > -1 || note.noteDescription.toLowerCase().indexOf(searchCondition) > -1))
            }))
            : this.setState((currState) => ({
                notes: currState.originalNotes
            }))

    }

    render() {
        return (
            <Fragment>
                <MuiThemeProvider theme={theme}>
                    <Header handleSearchNote={this.handleSearchNote} 
                    handleCurrentPage={this.handleCurrentPage} 
                    currentPage={this.state.currentPage}
                    handleReloadData={this.handleReloadData} />
                    <Router history={history}>
                        <Switch>
                            <Route
                                path="/"
                                render={(props) => (<WelcomePage />)}
                                exact
                            />
                            <PrivateRoute
                                path="/home"
                                exact
                                component={NotesApp}
                                notes={this.state.notes}
                                handleAddNote={this.handleAddNote}
                                handleRemoveNote={this.handleRemoveNote}
                                currentPage={this.state.currentPage}
                                reminders={this.state.reminders}
                                handleAddReminder = {this.handleAddReminder}
                                handleRemoveReminder = {this.handleRemoveReminder}
                            />
                            {/* <Route
                                path="/home"
                                render={(props) => (<NotesApp
                                    {...props}
                                    notes={this.state.notes}
                                    handleAddNote={this.handleAddNote}
                                    handleRemoveNote={this.handleRemoveNote}
                                />)}
                                exact
                            /> */}
                            <PrivateRoute
                                path="/edit-note/:id"
                                exact
                                component={EditNote}
                                notes={this.state.notes}
                                handleUpdateNote={this.handleUpdateNote}
                            />}
                        />
                        </Switch>
                    </Router>
                </MuiThemeProvider>
            </Fragment>
        );
    }
}

export default AppRouter;