/* eslint-disable prettier/prettier */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { ChangeEvent } from 'react';
import { Grid, makeStyles, Typography, TextField } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  inputBox: {
    color: 'white',
    borderRadius: '6px',
    background: '#362C63',
    outline: 'none!important',
    '&.Mui-focus': {
      outline: 'none',
      color: 'white !important',
    },
  },
  bigInput: {
    borderRadius: '6px',
    background: '#362C63',
    '& .MuiFilledInput-root': {
      background: '#362C63',
      borderRadius: '6px',
    },
  },
  inputColor: {
    color: 'white',
  },
}));

interface CustomInputProps {
  title: string;
  align: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  width: string;
  value: string;
  setValue: (arg0: string) => void;
  // eslint-disable-next-line react/require-default-props
  type?: string;
  error: string;
  onBlur: () => void;
  onChange: () => void;
  disabled: boolean;
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
  onChange,
  disabled,
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
        <TextField
          type={type}
          variant="outlined"
          className={classes.bigInput}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          fullWidth
          margin="dense"
          error={!!error}
          disabled={disabled}
        />
        <div>
          <Typography
            className="text-danger"
            color="secondary"
            style={{ fontSize: 12 }}
          >
            {error}
          </Typography>
        </div>
      </Grid>
    </Grid>
  );
}

export default CustomInputField;
