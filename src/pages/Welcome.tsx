import { makeStyles, Grid, Typography, Button } from '@material-ui/core';
import React from 'react';

import icon from '../../assets/icon.png';
import welcomeBackground from '../../assets/welcome-page-background.png';

const useStyles = makeStyles(() => ({
  mainDiv: {
    position: 'absolute',
    width: '100%',
    height: '100vh',
    backgroundImage: `url(${welcomeBackground})`,
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'auto',
    top: '0px',
    left: '0px',
  },
  mainContainer: {
    marginLeft: '9%',
    marginTop: '5%',
    maxWidth: '45%',
  },
  heading: {
    // fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: 'bolder',
    fontSize: '48px',
    color: '#FFFFFF',
    margin: '25px 0px',
  },

  paragraph: {
    // fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '18px',
    lineHeight: '25px',
    color: '#FFFFFF',
    margin: '20px 0px',
  },
  logo: {
    maxWidth: '214px',
    maxHeight: '174px',
  },

  button: {
    width: '186px',
    height: '44px',
    color: '#FFFFFF',
    backgroundColor: '#0097A9',
    padding: '5px 10px',
    '&:hover': {
      color: '#0097A9',
      backgroundColor: '#FFFFFF',
    },
  },
  btnText: {
    textTransform: 'none',
  },
}));

interface WelocomeProps {
  setScreen: (arg0: string) => void;
}

function Welcome({ setScreen }: WelocomeProps) {
  const classes = useStyles();
  return (
    <Grid className={classes.mainDiv}>
      <Grid className={classes.mainContainer}>
        <img className={classes.logo} src={icon} alt="" />
        <Typography variant="h3" className={classes.heading}>
          Hello and Welcome
        </Typography>

        <Typography variant="body1" className={classes.paragraph}>
          I am here to help you organise all the things you need to make a new
          world for your valuable Wordpress web presence.{' '}
        </Typography>

        <Typography variant="body1" className={classes.paragraph}>
          Over the next handful of screens we will be gathering a few pieces of
          vital information we need to make a successful transition.{' '}
        </Typography>
        <Typography variant="body1" className={classes.paragraph}>
          I will be here each step of the way to make sure you have all the help
          you need.
        </Typography>

        <Button
          onClick={() => {
            setScreen('onBoard');
          }}
          className={classes.button}
        >
          <Typography className={classes.btnText}>Let's get started</Typography>
        </Button>

        <Button id="SignIn"> Signin </Button>
      </Grid>
    </Grid>
  );
}

export default Welcome;
