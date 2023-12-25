import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    selectField: {
      margin: '5px 0px 5px 0px',
      '& .MuiFormControl-root': {
        backgroundColor: '#362C63',
        marginLeft: '0px',
        display: 'inline-flex',
        position: 'relative',
        minWidth: '60%',
        flexDirection: 'column',
        verticalAlign: 'top',
        padding: '0',
        borderRadius: '6px',
      },
      '& .MuiInputBase-root': {
        border: 'none',
        height: '36px',
      },
    },
  })
);

interface CustomInputProps {
  title: string;
  align: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  width: string;
  value: string;
  items: string[];
  setValue: (arg0: string) => void;
  onBlur: () => void;
  error: string;
}
export default function CustomSelectField({
  title,
  align,
  width,
  value,
  items,
  setValue,
  onBlur,
  error,
}: CustomInputProps) {
  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setValue(event.target.value as string);
  };

  return (
    <Grid
      container
      spacing={2}
      style={{ width }}
      direction="row"
      justify="space-between"
      alignItems="center"
      className={classes.selectField}
    >
      <Grid item xs={12} md={3}>
        <Typography align={align} style={{ color: 'white' }}>
          {title}
        </Typography>
      </Grid>
      <Grid item xs={12} md={9}>
        <FormControl variant="outlined">
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={value}
            onChange={handleChange}
            label="Age"
            onBlur={onBlur}
            fullWidth
            style={{ width: '100%' }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {items.map((v, i) => {
              return (
                <MenuItem value={10} key={i}>
                  {v}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
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
