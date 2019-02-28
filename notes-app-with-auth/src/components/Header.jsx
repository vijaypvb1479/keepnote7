import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import SearchBar from './SearchBar';
import { Button } from '@material-ui/core';
import ResponsiveDrawer from './ResponsiveDrawer';
import { firebase, googleProvider } from '../firebase/firebase';

const styles = theme => ({
  root: {
    width: '100%',
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  grow: {
    flexGrow: 1
  },
});

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    }
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleNoteCurrentPage = this.handleNoteCurrentPage.bind(this);
    this.handleRemCurrentPage = this.handleRemCurrentPage.bind(this);
  }

  handleLogin() {
    return firebase.auth().signInWithPopup(googleProvider).then(success => {
      var user = firebase.auth().currentUser;
      if (user != null) {
        let email = user.email;
        localStorage.setItem('LoggedInUser', email);
      }
      localStorage.setItem('isLoggedIn', true);
      this.setState({ isLoggedIn: true });
    })

  }
  handleNoteCurrentPage(){ this.props.handleCurrentPage('notes')}
  handleRemCurrentPage(){ this.props.handleCurrentPage('rem')}
  handleLogout() {
   return firebase.auth().signOut().then(() =>  {
      localStorage.removeItem('isLoggedIn', false);
      localStorage.removeItem('LoggedInUser');
      this.setState({ isLoggedIn: false });
    }).catch(function (error) {
      // An error happened.
    });
    
  }

  render() {
    const { classes, handleSearchNote,currentPage } = this.props;
    const { isLoggedIn } = this.state;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
              Notes
          </Typography>
            <SearchBar handleSearchNote={handleSearchNote}/>
            <div className={classes.grow} />
            <Button className={classes.button} onClick={this.handleNoteCurrentPage}>
              {currentPage === 'notes' ? 'Notes' : 'View Notes'}
            </Button>
            <Button className={classes.button} onClick={this.handleRemCurrentPage}>
            {currentPage === 'rem' ? 'Remainders' : 'View Remainders'}
            </Button>
            <Button className={classes.button} onClick={isLoggedIn ? this.handleLogout : this.handleLogin}>
              {isLoggedIn ? 'Logout' : 'Login'}
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);    // HOC -> Higher Order Component which takes another compoennt as an argument
