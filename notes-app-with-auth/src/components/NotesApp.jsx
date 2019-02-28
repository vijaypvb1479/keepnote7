import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
//import Header from './Header';
import NoteTaker from './NoteTaker';
import NotesContainer from './NotesContainer';
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
        const { notes, handleAddNote, handleRemoveNote,currentPage } = this.props; 
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
                        <NoteTaker handleAddNote={handleAddNote} />
                    </Grid>
                    <Grid item xs={12}>
                        <NotesContainer notes={notes} handleRemoveNote={handleRemoveNote} />
                    </Grid>
                </Grid>
            </MuiThemeProvider>
        );
      }
    }
}

export default NotesApp;