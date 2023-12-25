import {
  makeStyles,
  TextField,
  InputAdornment,
  IconButton,
} from '@material-ui/core';
import React from 'react';
import PublishIcon from '@material-ui/icons/Publish';

const useStyles = makeStyles(() => ({
  textField: {
    width: '60%',

    '& .MuiInputBase-input': {
      // border: '1px solid #362C63',
      backgroundColor: '#362C63',
      marginLeft: '0px',
      display: 'inline-flex',
      position: 'relative',
      minWidth: '0',
      flexDirection: 'column',
      verticalAlign: 'top',
      padding: '8px 0px 7px 10px',
      borderRadius: '6px 0px 0px 6px',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: '1px solid #362C63',
      borderRadius: '6px',
    },
    '& .MuiButtonBase-root': {
      backgroundColor: '#493F77',
      marginRight: '-13px',
      padding: '4px',
      marginLeft: '-10px',

      borderRadius: '0px 6px 6px 0px',
    },

    '& .MuiIconButton-root': {
      color: '#0097A9',
    },
  },
}));

function CustomTextField() {
  const classes = useStyles();
  return (
    <TextField
      variant="outlined"
      className={classes.textField}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton>
              <PublishIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}

export default CustomTextField;
