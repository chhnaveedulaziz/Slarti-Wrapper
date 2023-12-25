/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable no-console */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-nested-ternary */
import * as React from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import CustomBottomStepControlButtons from '../../common/CustomBottomStepControlButtons';
import CustomFileUploader from '../../common/CustomFileUploader';
import CustomSwitchButton from '../../common/CustomSwitchButton';
import GlobalContext from '../../context/GlobalContext';

const useStyles = makeStyles(() => ({
  migrationInputGrid: {
    margintop: '10px',
    display: 'flex',
    flexDirection: 'row',
    '& .MuiFilledInput-root': {
      width: '254px',
      height: '36px',
      background: '#362C63',
      paddingBottom: '10px',
      '&&&:before': {
        borderBottom: 'none',
      },
      '&&:after': {
        borderBottom: 'none',
      },
      borderRadius: '6px',
    },
  },
  input: {
    borderRadius: '6px',
    background: '#362C63',
  },
  bigInput: {
    borderRadius: '6px',
    background: '#362C63',
    '& .MuiFilledInput-root': {
      background: '#362C63',
      borderRadius: '6px',
    },
  },
  mainGrid: {
    // backgroundColor:'red',
    width: '50%',
    marginTop: '4%',
    marginLeft: '5%',
  },
  typo: {
    color: 'white',
    marginTop: '8px',
  },
}));

interface IProps {
  activeStep: number;
  handleNext: () => void;
  handleBack: () => void;
  steps: string[];
  setScreen: (arg0: string) => void;
}

function StepOne({
  activeStep,
  handleNext,
  handleBack,
  steps,
  setScreen,
}: IProps) {
  const classes = useStyles();
  const gContext = React.useContext(GlobalContext);
  let displayFields = 'block';

  if (!gContext?.isMigrating) displayFields = 'none';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getInputValue = (e: any) => {
    if (e.target.id === 'zipFileUploader') {
      console.log('(e.target.files', e.target.files);
      gContext?.setPluginZip && gContext?.setPluginZip(e.target.files[0]);
    }
    if (e.target.id === 'zipFileUploaderins') {
      gContext?.setPluginIns && gContext?.setPluginIns(e.target.files[0]);
    }
  };
  console.log('gContext?.dupPluginZip?.name', gContext?.dupPluginZip?.name);
  console.log('gContext?.isMigrating', gContext?.isMigrating);
  console.log(
    'condition',
    gContext?.isMigrating
      ? gContext?.dupPluginZip?.name !== ''
        ? false
        : true
      : false
  );

  return (
    <Grid className={classes.mainGrid}>
      <Typography className={classes.typo} variant="h3">
        Are you migrating?
      </Typography>
      <Typography className={classes.typo} variant="subtitle1">
        Is this a new Wordpress site? OR are you migrating from another hosting
        provider?
      </Typography>

      <CustomSwitchButton
        title="New Site"
        label="Migration"
        isOn={gContext?.isMigrating}
        setIsOn={gContext?.setMigrating}
      />

      <div style={{ display: displayFields }}>
        <Grid style={{ width: '60%' }}>
          <Typography className={classes.typo}>
            You have choosen migration! Please provide the zip file created by
            the Wordpress Duplicator plugin:
          </Typography>
        </Grid>

        <CustomFileUploader
          align="center"
          width="80%"
          title="Duplicator plugin zip file:"
          accept=".zip"
          elemId="zipFileUploader"
          fileName={gContext?.dupPluginZip?.name}
          onChange={(e) => getInputValue(e)}
          disabled={false}
        />

        {/* <CustomFileUploader
          align="center"
          width="80%"
          title="Duplicator plugin installer:"
          accept=".php"
          elemId="zipFileUploaderins"
          fileName={gContext?.dupPluginIns?.name}
          onChange={(e) => getInputValue(e)}
          disabled={false}
        /> */}
      </div>

      <CustomBottomStepControlButtons
        disableNext={
          gContext?.isMigrating && gContext?.dupPluginZip?.path !== ''
            ? false
            : false
        }
        setScreen={setScreen}
        activeStep={activeStep}
        handleBack={handleBack}
        handleNext={handleNext}
        steps={steps}
      />
    </Grid>
  );
}

export default StepOne;
