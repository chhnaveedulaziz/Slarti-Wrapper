/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useContext } from 'react';
import {
  Grid,
  makeStyles,
  TextField,
  Typography,
  FormControl,
} from '@material-ui/core';
import Select from 'react-select';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import CustomBottomStepControlButtons from '../../common/CustomBottomStepControlButtons';
import CustomSwitchButton from '../../common/CustomSwitchButton';
import GlobalContext from '../../context/GlobalContext';

const useStyles = makeStyles(() => ({
  mainGrid: {
    width: '60%',
    marginTop: '2%',
    marginLeft: '10%',
  },
  typo: {
    color: 'white',
    paddingBottom: '10px',
  },
  smallTypo: {
    color: 'white',
    padding: '0px 0px 0px 0px',
  },

  textFieldContainerGrid: {
    display: 'flex',
    flexDirection: 'row',
    margin: '10px 0px 10px 0px',
    '& .MuiInput-root': {
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
  input: {
    color: '#fff',
    border: '1px solid transparent',
    backgroundColor: '#362C63',
  },
  select: {
    color: '#fff',
    border: '1px solid #fff',
  },
  couterInput: {
    border: '1px solid #362C63',
    color: '#fff',
    width: '40px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    height: '50px',
  },
  arrowIcon: {
    border: '1px solid #362C63',
    color: '#fff',
    padding: 0,
    margin: 0,
    display: 'block',
  },
  iconButton: {
    color: '#fff',
    padding: 0,
    margin: 0,
    display: 'block',
  },
  arrowIconDisabled: {
    border: '1px solid #362C63',
    color: '#8978b8',
    padding: 0,
    margin: 0,
    display: 'block',
  },
}));

interface IProps {
  activeStep: number;
  handleNext: () => void;
  handleBack: () => void;
  steps: string[];
}
function StepFive({ activeStep, handleNext, handleBack, steps }: IProps) {
  const classes = useStyles();
  const gContext = useContext(GlobalContext);
  const [payment, setPayment] = React.useState('0.00');
  const [instanceTypeError, setInstanceTypeError] = useState<string>('');
  const [instanceSeriesError, setInstanceSeriesError] = useState<string>('');
  const [fetchingData, setfetchingData] = useState<boolean>(false);

  // useEffect(() => {
  //   if (!gContext?.flexibleServer || gContext?.flexibleServer) {
  //     gContext?.setStepFinstanceType && gContext?.setStepFinstanceType(null);
  //     gContext?.setStepFInstanceSeries &&
  //       gContext?.setStepFInstanceSeries(null);
  //   }
  // }, [gContext?.flexibleServer]);

  const disableNext = false;

  const instances = [
    {
      value: 'Basic - Compute Gen5',
      label: 'Basic - Compute Gen5',
      type: [
        {
          value: '1 vCore',
          label: '1 vCore',
        },
        {
          value: '2 vCore',
          label: '2 vCore',
        },
      ],
    },
    {
      value: 'General Purpose - Compute Gen5',
      label: 'General Purpose - Compute Gen5',
      type: [
        {
          value: '1 vCore',
          label: '1 vCore',
        },
        {
          value: '2 vCore',
          label: '2 vCore',
        },
        {
          value: '4 vCore',
          label: '4 vCore',
        },
        {
          value: '8 vCore',
          label: '8 vCore',
        },
      ],
    },
    {
      value: 'Memory Optimized - Compute Gen5',
      label: 'Memory Optimized - Compute Gen5',
      type: [
        {
          value: '1 vCore',
          label: '1 vCore',
        },
        {
          value: '2 vCore',
          label: '2 vCore',
        },
        {
          value: '4 vCore',
          label: '4 vCore',
        },
        {
          value: '8 vCore',
          label: '8 vCore',
        },
      ],
    },
  ];

  const instancesFlexible = [
    {
      value: 'Burstable BS Series',
      label: 'Burstable BS Series',
      type: [
        {
          value: 'Basic',
          label: 'Basic : 1 vCores',
        },
        {
          value: 'B1MS',
          label: 'B1MS: 1 vCores',
        },
        {
          value: 'B2S',
          label: 'B2S : 2 vCores',
        },
      ],
    },
    {
      value: 'General Purpose Dv4 Series',
      label: 'General Purpose Dv4 Series',
      type: [
        {
          value: '1 vCore',
          label: '1 vCore',
        },
        {
          value: '2 vCore',
          label: '2 vCore',
        },
        {
          value: '4 vCore',
          label: '4 vCore',
        },
      ],
    },
    {
      value: 'Memory Optimized Ev4 Series',
      label: 'Memory Optimized Ev4 Series',
      type: [
        {
          value: '1 vCore',
          label: '1 vCore',
        },
        {
          value: '2 vCore',
          label: '2 vCore',
        },
        {
          value: '4 vCore',
          label: '4 vCore',
        },
      ],
    },
  ];

  const style = {
    control: (base: any) => ({
      ...base,
      border: 0,
      // This line disable the blue border
      boxShadow: 'none',
      background: '#362C63',
      color: '#fff',
      width: 'max-content',
      minWidth: '100%',
    }),
    singleValue: (base: any) => ({
      ...base,
      color: '#fff',
      // width: 300,
    }),
    option: (provided: any) => ({
      ...provided,
      color: '#fff',
      background: '#362C63',
      // width: 300,
    }),
  };
  // getting Azure Database Settings
  const getAzureDatabsePrice = async () => {
    console.log('working....');
    try {
      setfetchingData(true);

      const res = await axios.get(
        `https://prices.azure.com/api/retail/prices?currencyCode='${
          gContext?.stepFcurrency?.value
        }'&$filter =armRegionName eq '${
          gContext?.azureRegion?.value
        }' and serviceName eq 'Azure Database for MySQL' and productName eq 'Azure Database for MySQL ${
          !gContext?.flexibleServer ? `Single Server` : `Flexible Server`
        } ${gContext?.stepFinstanceType?.value}' and skuName eq '${
          gContext?.stepFinstanceSeries?.value
        }'`
      );
      console.log('res?.data', res?.data);
      if (res?.data?.Items?.length > 0) {
        gContext?.setStepFDatabasePrice(
          (res?.data?.Items[0].retailPrice).toFixed(2)
        );
        const databsePrice = res?.data?.Items[0]?.retailPrice;
        console.log('gContext?.payment', gContext?.payment);
        const total = (gContext?.payment + databsePrice).toFixed(2);
        console.log('total', total);
        gContext?.setStepFTotal(total);
        setfetchingData(false);
      }
      // console.log('ffound', ffound);
    } catch (error) {
      setfetchingData(false);

      console.log('erorr in getting azure database price', error);
    }
  };
  console.log(
    gContext?.stepFinstanceType,
    gContext?.stepFinstanceSeries,
    gContext?.stepFcurrency
  );
  useEffect(() => {
    if (
      gContext?.stepFinstanceType?.value &&
      gContext?.stepFinstanceSeries?.value &&
      gContext?.stepFcurrency?.value
    ) {
      getAzureDatabsePrice();
    }
  }, [
    gContext?.stepFinstanceType?.value,
    gContext?.stepFinstanceSeries?.value,
    gContext?.stepFcurrency?.value,
  ]);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      console.log('event', event?.target?.value);
      gContext?.setStepFPaymentType && gContext?.setStepFPaymentType(event);
      const rate = event?.target?.value;
      console.log('rate', rate);
      const deductionPrice = (
        (parseFloat(gContext?.stepFTotal) / 100) *
        parseInt(rate, 10)
      ).toFixed(2);
      gContext?.setStepFTotal &&
        gContext?.setStepFTotal(
          (
            parseFloat(gContext?.stepFTotal) + parseFloat(deductionPrice)
          ).toFixed(2)
        );
    } catch (error) {
      console.log('rroe', error);
    }
  };
  return (
    <Grid className={classes.mainGrid}>
      <Typography className={classes.typo} variant="h4">
        Database settings
      </Typography>
      <Typography className={classes.smallTypo} variant="subtitle1">
        Please choose a deployement option:
      </Typography>

      <CustomSwitchButton
        title="Single-server"
        label="Flexible-server"
        isOn={gContext?.flexibleServer}
        setIsOn={gContext?.setFlexibleServer}
        disabled={false}
      />
      <br />

      <Grid container spacing={2} direction="row" alignItems="center">
        <Grid item xs={12} md={3}>
          <Typography style={{ color: 'white' }}>Instance Tier:</Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Select
            options={gContext?.flexibleServer ? instancesFlexible : instances}
            onChange={(e) => {
              gContext?.setStepFinstanceType(e);
              gContext?.setStepFInstanceTypeArray(e?.type);
              gContext?.setStepFInstanceSeries(null);
            }}
            value={gContext?.stepFinstanceType}
            styles={style}
            style={{ color: '#fff!important' }}
            error={gContext?.stepFinstanceType === '' ? instanceTypeError : ''}
            onBlur={() => setInstanceTypeError("Regions Can't be Empty!")}
          />
          <div>
            <Typography
              className="text-danger"
              color="secondary"
              style={{ fontSize: 12 }}
            >
              {gContext?.stepFinstanceType === '' ? instanceTypeError : ''}
            </Typography>
          </div>
        </Grid>
      </Grid>

      <Grid container spacing={2} direction="row" alignItems="center">
        <Grid item xs={12} md={3}>
          <Typography style={{ color: 'white' }}>Instance Type:</Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Select
            options={gContext?.stepFinstanceTypeArray}
            onChange={(e) => gContext?.setStepFInstanceSeries(e)}
            styles={style}
            setValue={gContext?.setStepFInstanceSeries}
            value={gContext?.stepFinstanceSeries}
            onBlur={() =>
              setInstanceSeriesError("Availability Can't be Empty!")
            }
          />
          <div>
            <Typography
              className="text-danger"
              color="secondary"
              style={{ fontSize: 12 }}
            >
              {gContext?.stepFinstanceSeries === '' ? instanceSeriesError : ''}
            </Typography>
          </div>
        </Grid>
      </Grid>

      <br />

      <Grid container alignItems="flex-end">
        <Grid item xs={12} md={6}>
          {!gContext?.flexibleServer ? (
            <div>
              <Typography className={classes.smallTypo} variant="subtitle1">
                Please choose a savings option:
              </Typography>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="paymentType"
                  name="paymentType"
                  value={gContext?.stepFpaymentType}
                  onChange={handleChange}
                  color="primary"
                >
                  <FormControlLabel
                    value="0"
                    control={<Radio color="primary" />}
                    label="Pay-as-you-go"
                  />
                  <FormControlLabel
                    value="-35%"
                    control={<Radio color="primary" />}
                    label="1-year reserved (-35%)"
                  />
                  <FormControlLabel
                    value="-53%"
                    control={<Radio color="primary" />}
                    label="3-year reserved (-53%)"
                  />
                </RadioGroup>
              </FormControl>
            </div>
          ) : (
            ''
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container alignItems="center" spacing={1}>
            <Grid item xs={12}>
              <Typography className={classes.smallTypo} variant="subtitle1">
                Average monthly cost:
              </Typography>
            </Grid>
            <Grid item xs={12} md={4} />
            <Grid item xs={12} md={6}>
              <Grid container alignItems="center">
                <Grid item xs={12} md={6}>
                  <Typography className={classes.smallTypo} variant="subtitle1">
                    Compute
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    variant="outlined"
                    margin="dense"
                    className={classes.input}
                    style={{ width: '80%' }}
                    value={gContext?.payment}
                    InputProps={{
                      readOnly: true,
                    }}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setPayment((event.target as HTMLInputElement).value)
                    }
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={4} />
            <Grid item xs={12} md={6}>
              <Grid container alignItems="center">
                <Grid item xs={12} md={6}>
                  <Typography className={classes.smallTypo} variant="subtitle1">
                    Database
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    variant="outlined"
                    margin="dense"
                    className={classes.input}
                    style={{ width: '80%' }}
                    value={gContext?.stepFDatabasePrice}
                    InputProps={{
                      readOnly: true,
                    }}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setPayment((event.target as HTMLInputElement).value)
                    }
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={4}>
              <Select
                options={[
                  { value: 'USD', label: 'USD' },
                  { value: 'EUR', label: 'EURO' },
                ]}
                onChange={(e) => gContext?.setStepFcurrency(e)}
                value={gContext?.stepFcurrency}
                styles={style}
                components={{
                  IndicatorSeparator: () => null,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid container alignItems="center">
                <Grid item xs={12} md={6}>
                  <Typography className={classes.smallTypo} variant="subtitle1">
                    Totals
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    variant="outlined"
                    margin="dense"
                    className={classes.input}
                    style={{ width: '80%' }}
                    value={gContext?.stepFTotal}
                    InputProps={{
                      readOnly: true,
                    }}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setPayment((event.target as HTMLInputElement).value)
                    }
                  />
                  {fetchingData ? <CircularProgress /> : ''}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <br />
      <CustomBottomStepControlButtons
        disableNext={disableNext}
        activeStep={activeStep}
        handleBack={handleBack}
        handleNext={handleNext}
        steps={steps}
      />
      <br />
    </Grid>
  );
}

export default StepFive;
