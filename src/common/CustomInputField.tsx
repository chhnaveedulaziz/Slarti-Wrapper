/* eslint-disable prettier/prettier */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/require-default-props */
import React, { ChangeEvent } from 'react';
import { makeStyles, Typography, Grid } from '@material-ui/core';
import clsx from 'clsx';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';

const useStyles = makeStyles(() => ({
  inputBox: {
    color: 'white',
    borderRadius: '6px',
    background: '#362C63',
    display: 'flex',
    alignItems: 'center',
    padding: 4,
    border: '1px solid transparent',
  },
  input: {
    border: 'none',
    color: 'white',
    height: 30,
    fontSize: 18,
    backgroundColor: '#362C63',
    outline: 'none',
    width: '100%',
  },
  inputBoxError: {
    color: 'white',
    borderRadius: '6px',
    background: '#362C63',
    display: 'flex',
    alignItems: 'center',
    padding: 4,
    border: '1px solid red',
  },
  inputBoxSuccess: {
    color: 'white',
    borderRadius: '6px',
    background: '#362C63',
    display: 'flex',
    alignItems: 'center',
    padding: 4,
    border: '1px solid green',
  },
}));

interface CustomInputProps {
  title: string;
  align: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  width: string;
  value?: string;
  setValue?: ((arg0: string) => void) | undefined;
  // eslint-disable-next-line react/require-default-props
  type?: string;
  error: string;
  onBlur: () => void;
  valid?: string;
  maxLength?: number;
}
function CustomInputField({
  title,
  align,
  width,
  value,
  setValue,
  type = 'text',
  error,
  onBlur,
  valid,
  maxLength,
}: CustomInputProps) {
  const classes = useStyles();
  return (
    <Grid
      container
      spacing={2}
      style={{ width }}
      direction="row"
      justify="space-between"
      alignItems="center"
    >
      <Grid item xs={12} md={3}>
        <Typography align={align} style={{ color: 'white' }}>
          {title}
        </Typography>
      </Grid>
      <Grid item xs={12} md={9}>
        <div
          className={clsx(
            valid === 'unchanged'
              ? classes.inputBox
              : value === ''
              ? classes.inputBoxError
              : error
              ? classes.inputBoxError
              : classes.inputBoxSuccess
          )}
        >
          <input
            value={value}
            className={classes.input}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setValue(e.target.value);
            }}
            onBlur={onBlur}
            type={type}
            maxLength={maxLength}
          />
          {valid === 'unchanged' ? (
            ''
          ) : value === '' ? (
            <CancelRoundedIcon style={{ color: 'red', fontSize: '1rem' }} />
          ) : error ? (
            <CancelRoundedIcon style={{ color: 'red', fontSize: '1rem' }} />
          ) : (
            <CheckCircleIcon style={{ color: '#2aef2a', fontSize: '1rem' }} />
          )}
        </div>
        <div>
          <Typography
            className="text-danger"
            color="secondary"
            style={{ fontSize: 12 }}
          >
            {value !== '' ? '' : error}
          </Typography>
        </div>
      </Grid>
    </Grid>
  );
}

export default CustomInputField;
