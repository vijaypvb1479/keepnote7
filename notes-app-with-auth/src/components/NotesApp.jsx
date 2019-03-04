import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import RemindersContainer from './RemindersContainer';
import NoteTaker from './NoteTaker';
import NotesContainer from './NotesContainer';
import ReminderTaker from './ReminderTaker';

import { blue, pink } from '@material-ui/core/colors';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: blue,
        secondary: pink,
    },
    typography: {
        useNextVariants: true,
    },
});

class NotesApp extends Component {
    render() {
        const { notes, handleAddNote, handleRemoveNote,currentPage,reminders,handleAddReminder,handleRemoveReminder } = this.props; 
        if (currentPage ==='notes'){
            return (
                <MuiThemeProvider theme={theme}>
                    <Grid container spacing={8}>
                        {/* <Grid item xs={12}>
                            <Header />
                        </Grid> */}
                        <Grid item xs={12}>
                            <NoteTaker handleAddNote={handleAddNote} />
                        </Grid>
                        <Grid item xs={12}>
                            <NotesContainer notes={notes} handleRemoveNote={handleRemoveNote} />
                        </Grid>
                    </Grid>
                </MuiThemeProvider>
            );
        } else if(currentPage === 'rem'){
        return (
            <MuiThemeProvider theme={theme}>
                <Grid container spacing={8}>
                    {/* <Grid item xs={12}>
                        <Header />
                    </Grid> */}
                    <Grid item xs={12}>
                        <ReminderTaker handleAddReminder={handleAddReminder} />
                    </Grid>
                    <Grid item xs={12}>
                        <RemindersContainer reminders={reminders} handleRemoveReminder={handleRemoveReminder} />
                    </Grid>
                </Grid>
            </MuiThemeProvider>
        );
      }
    }
}

export default NotesApp;