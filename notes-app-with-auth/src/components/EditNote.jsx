import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core';
import ColorPicker from 'react-color';
import ColorLensIcon from '@material-ui/icons/ColorLens';

const styles = theme => ({
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
});

class EditNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
            noteTitle: this.props.notes.filter(note => note.id === parseFloat(this.props.match.params.id))[0].noteTitle,
            noteDescription: this.props.notes.filter(note => note.id === parseFloat(this.props.match.params.id))[0].noteDescription,
            color: this.props.notes.filter(note => note.id === parseFloat(this.props.match.params.id))[0].color,
            background: 'black',
        }
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleUpdateNote = this.handleUpdateNote.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleNoteTitleChange = this.handleNoteTitleChange.bind(this);
        this.handleNoteDescriptionChange = this.handleNoteDescriptionChange.bind(this);
    }

    handleClickOpen() {
        this.setState({ open: true });
    }

    handleClose() {
        this.setState({
            open: false,
            noteTitle: '',
            noteDescription: '',
        });
        this.props.history.push('/home');
    }

    handleNoteTitleChange(event) {
        this.setState({ noteTitle: event.target.value });
    }

    handleNoteDescriptionChange(event) {
        this.setState({ noteDescription: event.target.value });
    }

    handleUpdateNote() {
        const updatedNote = {
            id: parseFloat(this.props.match.params.id),
            noteTitle: this.state.noteTitle,
            noteDescription: this.state.noteDescription,
            color: this.state.color,
        }
        this.props.handleUpdateNote(updatedNote);
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
    render() {
        const { classes } = this.props;
        const cover = {
            position: 'fixed',
            top: '0px',
            right: '0px',
            bottom: '0px',
            left: '0px',
        }
        return (
            <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="Edit note form"
                style={{background: `rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`}} 
            >
                <DialogTitle id="Edit note form">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        Edit Note
                            <div style={styles.swatch} onClick={this.handleClick}>
                            <ColorLensIcon className={classes.iconHover} style={{ fontSize: 30, color: this.state.background }} />
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
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Cancel
                        </Button>
                    <Button onClick={this.handleUpdateNote} color="primary">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default withStyles(styles)(EditNote);