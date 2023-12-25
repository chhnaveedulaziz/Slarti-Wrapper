import React from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import { Publish } from '@material-ui/icons';
import { truncate } from 'fs/promises';
// import CustomTextField from './CustomTextField';

const useStyles = makeStyles(() => ({
  migrationInputGrid: {
    margintop: '10px',
    display: 'flex',
    padding: '10px 10px 10px 0px',
    flexDirection: 'row',
  },
  input: {
    backgroundColor: 'indigo',
    color: 'white',
    padding: '0.5rem',
    borderRadius: ' 0.3rem',
    cursor: 'pointer',
    marginTop: '1rem',
  },
  chosenFile: {
    marginRight: '0.3rem',
    border: '1px solid #38474d17',
    padding: 5,
    borderRadius: ' 0.3rem',
    backgroundColor: '#8ea2aa19',
    width: 180,
    height: 25,
    overflow: 'hidden',
  },
  choseFileBtn: {
    marginRight: '0.3rem',
    border: '1px solid #4d555818',
    borderRadius: ' 0.3rem',
    backgroundColor: '#8ea2aa19',
    cursor: 'pointer',
    padding: 5,
    display: 'flex',
  },
  title: {},
}));
interface CustomFileUploaderProps {
  title: string;
  align: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  width: string;
  accept: string;
  fileName: string;
  onChange: (event: any) => void;
  elemId: string;
  disabled: boolean;
}
function CustomFileUploader({
  title,
  align,
  width,
  accept,
  fileName,
  onChange,
  elemId,
  disabled,
}: CustomFileUploaderProps) {
  const classes = useStyles();
  return (
    <Grid
      container
      spacing={2}
      style={{ width }}
      direction="row"
      justify="space-between"
      alignItems="center"
      className={classes.migrationInputGrid}
    >
      <Grid item xs={12} md={4}>
        <Typography align={align} style={{ color: 'white' }}>
          {title}
        </Typography>
      </Grid>
      <Grid item xs={12} md={8}>
        <div style={{ display: 'flex', opacity: disabled ? '30%' : '100%' }}>
          <input
            type="file"
            hidden
            className={classes.input}
            accept={accept}
            onChange={onChange}
            aria-invalid="false"
            id={elemId}
            disabled={disabled}
          />
          <span id="file-chosen" className={classes.chosenFile}>
            {fileName}
          </span>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor={elemId} className={classes.choseFileBtn} style={{}}>
            <Publish />
          </label>
        </div>
      </Grid>
    </Grid>
  );
}

export default CustomFileUploader;
