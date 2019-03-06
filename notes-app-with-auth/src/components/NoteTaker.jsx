import React, { Component, Fragment } from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core';
import { Tooltip } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ColorPicker from 'react-color';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
const styles = theme => ({
    fab: {
        margin: theme.spacing.unit * 2,
    },
    absolute: {
        position: 'absolute',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 3,
    },
    color: {
        width: '36px',
        height: '14px',
        borderRadius: '2px',
        background: 'black',
    },
    swatch: {
        padding: '5px',
        background: '#fff',
        borderRadius: '1px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        display: 'inline-block',
        cursor: 'pointer',
    },
    popover: {
        position: 'fixed',
        zIndex: '2',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
        maxWidth: 300,
      },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
class NoteTaker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            noteTitle: '',
            noteDescription: '',
            color: {
                r: '255',
                g: '255',
                b: '255',
                a: '1',
            },
            background: 'black',
            displayColorPicker: false,
            reminderId: '',
            reminderName: '',
            selectedReminder: [],
        };
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleAddNote = this.handleAddNote.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleNoteTitleChange = this.handleNoteTitleChange.bind(this);
        this.handleNoteDescriptionChange = this.handleNoteDescriptionChange.bind(this);
        this.handleColorClose = this.handleColorClose.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleClickOpen() {
        this.setState({ open: true });
    }

    handleClose() {
        this.setState({
            open: false,
            noteTitle: '',
            noteDescription: '',
            color: {
                r: '255',
                g: '255',
                b: '255',
                a: '1',
            },
            background: 'black',
            selectedReminder: [],
        });
    }

    handleNoteTitleChange(event) {
        this.setState({ noteTitle: event.target.value });
    }

    handleNoteDescriptionChange(event) {
        this.setState({ noteDescription: event.target.value });
    }

    handleAddNote() {
        let selReminders = [];
        if(this.props.reminders.length > 0 && this.state.selectedReminder.length > 0){
        this.state.selectedReminder.forEach(reminderName => {
            let sRem = this.props.reminders.find(reminder => {
                if (reminder.reminderName === reminderName) return reminder;
            });
            selReminders.push(sRem);
        });
    }
        const newNote = {
            id: Math.random() * 2342342,
            noteTitle: this.state.noteTitle,
            noteDescription: this.state.noteDescription,
            color: this.state.color,
            noteCreatedBy: localStorage.getItem('LoggedInUser'),
            reminders: selReminders,
        }
        this.props.handleAddNote(newNote);
        this.handleClose();
    }

    handleClick = () => {
        this.setState({ displayColorPicker: !this.state.displayColorPicker })
    };

    handleColorClose = () => {
        this.setState({ displayColorPicker: false })
    };

    handleChange = (color) => {
        this.setState({ color: color.rgb, background: color.hex })
    };

    handleReminderChange = event => {
        this.setState({ selectedReminder: event.target.value });
      };

    render() {
        const { classes } = this.props;
        const cover = {
            position: 'fixed',
            top: '0px',
            right: '0px',
            bottom: '0px',
            left: '0px',
        }
        const {   reminders } = this.props; 
        return (
            <Fragment>
                <Tooltip title="Add Note" aria-label="Add note">
                    <Fab
                        color="secondary"
                        className={classes.absolute}
                        onClick={this.handleClickOpen}
                    >
                        <AddIcon />
                    </Fab>
                </Tooltip>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="Add note form"
                >
                    <DialogTitle id="Add note form" align="end">
                    <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                        Add Note
                            <div style={styles.swatch} onClick={this.handleClick}>
                            <ColorLensIcon className={classes.iconHover} style={{ fontSize: 30 ,color: this.state.background}} />
                        </div>
                        {this.state.displayColorPicker ? <div className={classes.popover}>
                            <div style={cover} onClick={this.handleColorClose} />
                            <ColorPicker color={this.state.color}
                                onChangeComplete={this.handleChange} />
                        </div> : null}
                        </div>
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="note title"
                            label="Note Title"
                            type="text"
                            fullWidth
                            onChange={this.handleNoteTitleChange}
                            value={this.state.noteTitle}
                        />
                        <TextField
                            margin="dense"
                            id="note description"
                            label="Note Description"
                            type="text"
                            onChange={this.handleNoteDescriptionChange}
                            value={this.state.noteDescription}
                            fullWidth
                        />
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="select-multiple-checkbox">Reminders</InputLabel>
                            <Select
                                multiple
                                value={this.state.selectedReminder}
                                onChange={this.handleReminderChange}
                                input={<Input id="select-multiple-checkbox" />}
                                renderValue={selected => selected.join(', ')}
                                MenuProps={MenuProps}
                            >
                                {reminders.map(reminder => (
                                <MenuItem key={reminder.reminderId} value={reminder.reminderName}>
                                    <Checkbox checked={this.state.selectedReminder.indexOf(reminder.reminderName) > -1} />
                                    <ListItemText primary={reminder.reminderName} />
                                </MenuItem>
                                ))}
                            </Select>
                            </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleAddNote} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment >
        );
    }
}

export default withStyles(styles)(NoteTaker);
