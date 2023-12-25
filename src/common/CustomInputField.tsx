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
    minWidth: '446px',
    border: '1px solid transparent',
  },
  input: {
    border: 'none',
    color: 'white',
    height: 25,
    fontSize: 18,
    backgroundColor: '#362C63',
    outline: 'none',
    minWidth: '425px',
  },
  inputBoxError: {
    color: 'white',
    borderRadius: '6px',
    background: '#362C63',
    display: 'flex',
    alignItems: 'center',
    padding: 4,
    border: '1px solid red',
    minWidth: '446px',

  },
  inputBoxSuccess: {
    color: 'white',
    borderRadius: '6px',
    background: '#362C63',
    display: 'flex',
    alignItems: 'center',
    padding: 4,
    border: '1px solid green',
    minWidth: '446px',

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
  disabled,
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
      // justify="space-between"
      alignItems="center"
    >
      <Grid item xs={12} md={4}>
        <Typography style={{ color: 'white' }}>{title}</Typography>
      </Grid>
      <Grid item xs={12} md={8}>
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
            disabled={disabled}
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
