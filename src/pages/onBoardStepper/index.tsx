/* eslint-disable prettier/prettier */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useContext } from 'react';
import {
  makeStyles,
  Theme,
  createStyles,
  withStyles,
} from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { StepIconProps } from '@material-ui/core/StepIcon';
import { Grid } from '@material-ui/core';
import Check from '@material-ui/icons/Check';
import background1 from '../../../assets/step1-background.png';
import background2 from '../../../assets/step2-background.png';
import background3 from '../../../assets/step3-background.png';
import background4 from '../../../assets/step4-background.png';
import background5 from '../../../assets/step5-background.png';
import successBackground from '../../../assets/success-background.png';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import StepFour from './StepFour';
import StepFive from './StepFive';
import Terraform from './Terraform';
import GlobalContext from '../../context/GlobalContext';

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    '& $line': {
      backgroundColor: '#362C63',
    },
  },
  completed: {
    '& $line': {
      backgroundColor: '#362C63',
    },
    backgroundColor: '#362C63',
  },
  line: {
    backgroundColor: '#362C63',
    height: 3,
    border: 0,
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    zIndex: 1,
    color: '#fff',
    width: 40,
    height: 40,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#362C63',
    border: '2px solid #493F77',
    boxSizing: 'border-box',
  },
  active: {
    background: '#362C63',
    border: '2px solid #0097A9',
    boxSizing: 'border-box',
    boxShadow: '0px 0px 20px rgba(0, 151, 169, 0.51)',
  },
  completed: {
    backgroundColor: '#0097A9',
    boxShadow: '0px 0px 20px rgba(0, 151, 169, 0.51)',
  },

  textIconActive: {
    color: '#0097A9',
    fontSize: '20px',
  },
  textIcon: {
    color: '#493F77',
    fontSize: '20px',
  },

  checkIcon: {
    color: '#362C63',
    fontSize: '20px',
  },
});

function ColorlibStepIcon(props: StepIconProps) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: completed ? (
      <Check className={classes.checkIcon} />
    ) : (
      <Typography
        className={active ? classes.textIconActive : classes.textIcon}
      >
        1
      </Typography>
    ),
    2: completed ? (
      <Check className={classes.checkIcon} />
    ) : (
      <Typography
        className={active ? classes.textIconActive : classes.textIcon}
      >
        2
      </Typography>
    ),
    3: completed ? (
      <Check className={classes.checkIcon} />
    ) : (
      <Typography
        className={active ? classes.textIconActive : classes.textIcon}
      >
        3
      </Typography>
    ),

    4: completed ? (
      <Check className={classes.checkIcon} />
    ) : (
      <Typography
        className={active ? classes.textIconActive : classes.textIcon}
      >
        4
      </Typography>
    ),

    5: completed ? (
      <Check className={classes.checkIcon} />
    ) : (
      <Typography
        className={active ? classes.textIconActive : classes.textIcon}
      >
        5
      </Typography>
    ),
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    button: {
      marginRight: theme.spacing(1),
      backgroud: 'white',
    },
    instructions: {
      color: 'white',
    },
    instructions2: {
      color: '#493F77',
    },
    stepperGrid: {
      '& .MuiPaper-root': {
        backgroundColor: 'rgb(0,0,0,0.000)',
        paddingLeft: '16%',
        paddingRight: '16%',
        marginTop: '2%',
        transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      },
      marginLeft: '15%',
      marginRight: '15%',
    },

    activeStepText: {
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: '12px',
      lineHeight: '14px',
      /* identical to box height */

      textAlign: 'center',
      textTransform: 'uppercase',

      color: ' #0097A9',
    },

    stepText: {
      // fontFamily: 'Open Sans',
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: '12px',
      lineHeight: '14px',
      /* identical to box height */

      textAlign: 'center',
      textTransform: 'uppercase',

      color: '#493F77',
    },
  })
);

function getSteps() {
  return ['Step ', 'Step ', 'Step ', 'Step ', 'Step ', 'Step '];
}

function getStepContent(
  step: number,
  handleNext: () => void,
  handleBack: () => void,
  setScreen: (arg0: string) => void
) {
  switch (step) {
    case 0:
      return (
        <StepOne
          setScreen={setScreen}
          handleNext={handleNext}
          handleBack={handleBack}
          activeStep={step}
          steps={getSteps()}
        />
      );
    case 1:
      return (
        <StepTwo
          handleNext={handleNext}
          handleBack={handleBack}
          activeStep={step}
          steps={getSteps()}
        />
      );
    case 2:
      return (
        <StepThree
          handleNext={handleNext}
          handleBack={handleBack}
          activeStep={step}
          steps={getSteps()}
        />
      );
    case 3:
      return (
        <StepFour
          handleNext={handleNext}
          handleBack={handleBack}
          activeStep={step}
          steps={getSteps()}
        />
      );
    case 4:
      return (
        <StepFive
          handleNext={handleNext}
          handleBack={handleBack}
          activeStep={step}
          steps={getSteps()}
        />
      );
    default:
      return 'Unknown step';
  }
}

interface Iprops {
  setScreen: (arg0: string) => void;
}

export default function CustomizedSteppers({ setScreen }: Iprops) {
  const classes = useStyles();
  const gContext = useContext(GlobalContext);
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  const handleNext = () => {
    if (gContext?.scalable) {
      setActiveStep((prevActiveStep) => prevActiveStep + 2);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }

    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    window.scrollTo(0, 0);
  };

  const handleReset = () => {
    setActiveStep(0);
    gContext?.setScalable();
    window.scrollTo(0, 0);
  };

  return (
    <Grid
      style={{
        width: '100%',
        minHeight: '100vh',
        height: '100%',
        backgroundImage: `url(${
          activeStep === 0
            ? background1
            : activeStep === 1
            ? background2
            : activeStep === 2
            ? background3
            : activeStep === 3
            ? background4
            : activeStep === steps.length
            ? successBackground
            : background5
        })`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        top: '0px',
        left: '0px',
        padding: '5px 0',
        // border:'1px solid'
      }}
    >
      <Grid>
        <Grid className={classes.stepperGrid}>
          <Stepper
            alternativeLabel
            activeStep={activeStep}
            connector={<ColorlibConnector />}
          >
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel StepIconComponent={ColorlibStepIcon}>
                  <Typography
                    className={
                      activeStep === index
                        ? classes.activeStepText
                        : classes.stepText
                    }
                  >
                    {label}
                    {index + 1}
                  </Typography>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Grid>
        <div>
          {activeStep === steps.length ? (
            <div>
              <Terraform />
              <Button
                onClick={handleReset}
                className={classes.button}
                variant="contained"
              >
                Reset
              </Button>
            </div>
          ) : (
            <div>
              <Typography className={classes.instructions}>
                {getStepContent(activeStep, handleNext, handleBack, setScreen)}
              </Typography>
            </div>
          )}
        </div>
      </Grid>
    </Grid>
  );
}
