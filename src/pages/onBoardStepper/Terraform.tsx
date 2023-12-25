/* eslint-disable prettier/prettier */
import * as React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { XTerm } from 'xterm-for-react';
import { terraformInit, terraformPlan } from '../../cmd/index';
import GlobalContext from '../../context/GlobalContext';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '90%',
      padding: '20px',
      margin: 'auto',
    },
    outputBox: {
      width: '100%',
      border: '1px solid white',
      height: '70vh',
      overflowY: 'scroll',
    },
    resultText: {},
    terminal: {
      color: '#0097A9',
      textAlign: 'center',
    },
  })
);
const Terraform: React.FC = () => {
  const classes = useStyles();
  const gContext = React.useContext(GlobalContext);
  const [state, setstate] = React.useState('Test Text');
  const xtermRef = React.useRef();

  const runTerraform = async () => {
    try {
      xtermRef.current.terminal.writeln('Congrats!!!');
      xtermRef.current.terminal.writeln(
        'We have Started Working on your informations......'
      );
      const res = await terraformInit();
      setstate(res.output);
      xtermRef.current.terminal.writeln(res.output);
      xtermRef.current.terminal.writeln(
        'Creating your Plan, this will take time......'
      );
      const command = `terraform apply -var is_migration=${gContext?.isMigrating} -var duplicator_zip_file =${gContext?.dupPluginZip?.path} -var `;
      const resP = await terraformPlan(command);
      setstate(state + resP.output);
      xtermRef.current.terminal.writeln(state + resP.output);
    } catch (error) {
      xtermRef.current.terminal.writeln(error);
    }
  };
  React.useEffect(() => {
    runTerraform();
  }, []);

  return (
    <div className={classes.root}>
      <Grid container alignItems="center">
        <Grid item lg={12} md={12} sm={12} xs={12}>
          {/* // Create a new terminal and set it's ref/. */}
          <XTerm
            ref={xtermRef}
            className={classes.terminal}
            options={{ lineHeight: 1.5 }}
          />
          {/* <div className={classes.outputBox}>
            <Typography variant="body2" className={classes.resultText}>
              {state}
            </Typography>
          </div> */}
        </Grid>
      </Grid>
    </div>
  );
};

export default Terraform;
