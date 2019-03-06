import React, { Component } from 'react';
import { Card, CardHeader, CardContent, CardActions, withStyles, Typography } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
const styles = theme => ({
    deleteIcon: {
        justifyContent: 'flex-end',
    }
});

class Note extends Component {
    render() {
        const { classes, handleRemoveNote, note } = this.props;
        const reminders = note.reminders == null ? [] :note.reminders;
        
        
        return (
            <Card style={{background: `rgba(${ note.color.r }, ${ note.color.g }, ${ note.color.b }, ${ note.color.a })`}} >
                <CardHeader
                    title={note.noteTitle}
                    action={
                        <Link to={`edit-note/${note.id}`}>
                            <IconButton>
                                <EditIcon />
                            </IconButton>
                        </Link>
                    }
                />
                <CardContent>
                   
                    {note.noteDescription}
                    <List component="nav">
                    {reminders.map((item, i) => <ListItem button>     <ListItemText primary={item.reminderName} /></ListItem>  ) }
                    </List>
                </CardContent>
                <CardActions className={classes.deleteIcon}>
                    <IconButton onClick={handleRemoveNote.bind(null, note.id)}>
                        <DeleteIcon />
                    </IconButton>
                </CardActions>
            </Card>
        );
    }
}

export default withStyles(styles)(Note);