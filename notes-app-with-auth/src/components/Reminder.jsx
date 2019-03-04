import React, { Component } from 'react';
import { Card, CardHeader, CardContent, CardActions, withStyles } from '@material-ui/core';
//import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
//import { Link } from 'react-router-dom';

const styles = theme => ({
    deleteIcon: {
        justifyContent: 'flex-end',
    }
});

class Reminder extends Component {
    render() {
        const { classes, handleRemoveReminder, reminder } = this.props;
        return (
            <Card style={{background: `rgba(${ reminder.color.r }, ${ reminder.color.g }, ${ reminder.color.b }, ${ reminder.color.a })`}} >
                <CardHeader
                    title={reminder.reminderName}
                    // action={
                    //     <Link to={`edit-note/${reminder.reminderId}`}>
                    //         <IconButton>
                    //             <EditIcon />
                    //         </IconButton>
                    //     </Link>
                    // }
                />
                <CardContent>
                    {reminder.reminderDescription}
                </CardContent>
                <CardActions className={classes.deleteIcon}>
                    <IconButton onClick={handleRemoveReminder.bind(null, reminder.reminderId)}>
                        <DeleteIcon />
                    </IconButton>
                </CardActions>
            </Card>
        );
    }
}

export default withStyles(styles)(Reminder);