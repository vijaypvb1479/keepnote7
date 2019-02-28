import React, { Fragment } from 'react';
import welcome from '../images/welcome.jpg';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
    img: {
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: theme.spacing.unit * 3,
        width: '40%',
        [theme.breakpoints.down('sm')]: {
            width: '60%',
        },
    },
});

const WelcomePage = (props) => (
    <Fragment>

    <img src={welcome} alt="welcome" className={props.classes.img} />
    </Fragment>
);

export default withStyles(styles)(WelcomePage);