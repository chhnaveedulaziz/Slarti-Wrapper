/* eslint-disable prettier/prettier */
/* eslint-disable react/require-default-props */
import {
  Grid,
  Typography,
  FormControlLabel,
  makeStyles,
  Switch,
  withStyles,
} from '@material-ui/core';
import React, { ChangeEvent } from 'react';

const CustomColorSwitch = withStyles({
  switchBase: {
    color: '#66C1CB',
    '&$checked': {
      color: '#0097A9',
    },
    '&$checked + $track': {
      backgroundColor: '#66C1CB',
    },
  },
  checked: {},
  track: {},
})(Switch);

const useStyles = makeStyles(() => ({
  mainGrid: {
    margintop: '5px',
    display: 'flex',
    padding: '0px 10px 0px 0px',
    flexDirection: 'row',
  },
}));

interface CustomSwitchProps {
  isOn: boolean | undefined;
  setIsOn: ((argo: boolean) => void | undefined) | undefined;
  title: string;
  label: string;
  disabled?: boolean;
}
function CustomSwitchButton({
  isOn,
  setIsOn,
  title,
  label,
  disabled,
}: CustomSwitchProps) {
  const classes = useStyles();

  return (
    <Grid className={classes.mainGrid}>
      <Typography
        variant="subtitle1"
        style={{
          color: 'white',
          marginRight: '14px',
          marginTop: '6px',
          marginBottom: '6px',
        }}
      >
        {title}
      </Typography>
      <FormControlLabel
        disabled={disabled}
        control={
          <CustomColorSwitch
            checked={isOn}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setIsOn(e.target.checked);
            }}
          />
        }
        label={
          <Typography
            variant="subtitle1"
            style={{ color: 'white', marginLeft: '4px' }}
          >
            {label}
          </Typography>
        }
      />
    </Grid>
  );
}

export default CustomSwitchButton;
