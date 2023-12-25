/* eslint-disable prettier/prettier */
import React from 'react';
import { Grid, Button, makeStyles } from '@material-ui/core';

interface IProps {
  activeStep: number;
  handleNext: () => void;
  handleBack: () => void;
  steps: string[];
  // eslint-disable-next-line react/require-default-props
  setScreen?: (arg0: string) => void;
  disableNext: boolean;
}

const useStyles = makeStyles(() => ({
  backButton: {
    background: '#362C63',
    border: ' 2px solid #0097A9',
    borderRadius: '8px',
  },
  nextButton: {
    background: '#0097A9',
    boxShadow: '0px 0px 20px rgba(0, 151, 169, 0.51)',
    borderRadius: '8px',
  },
}));

function CustomBottomStepControlButtons({
  activeStep,
  disableNext,
  handleNext,
  handleBack,
  steps,
  setScreen = (arg0: string) => {
    // eslint-disable-next-line no-console
    console.log(arg0);
  },
}: IProps) {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item xs={12} md={3}>
        {activeStep === 0 ? (
          ''
        ) : (
          <Button
            onClick={() => {
              // eslint-disable-next-line @typescript-eslint/no-unused-expressions
              activeStep === 0 ? setScreen('home') : handleBack();
            }}
            className={classes.backButton}
          >
            Back
          </Button>
        )}
      </Grid>

      <Grid xs={12} md={3} />

      <Grid xs={12} md={3} />

      <Grid xs={12} md={3}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNext}
          className={classes.nextButton}
          disabled={disableNext}
        >
          {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </Grid>
    </Grid>
  );
}

export default CustomBottomStepControlButtons;
