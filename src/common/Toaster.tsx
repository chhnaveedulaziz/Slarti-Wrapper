/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-fragments */
import React, { useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

interface IProps {
  state: boolean;
  message: string;
  setState: (text: boolean) => void;
}
export default function SimpleSnackbar({ state, message, setState }: IProps) {
  useEffect(() => {
    setTimeout(() => {
      setState(false);
    }, 6000);
  }, [state, setState]);

  const handleClose = () => {
    setState(false);
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={false}
        // autoHideDuration={6000}
        onClose={handleClose}
        message={message}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
}
