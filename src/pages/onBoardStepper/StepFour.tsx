/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unneeded-ternary */
import React, { useEffect, useState, useContext } from 'react';
import {
  Grid,
  makeStyles,
  TextField,
  Typography,
  FormControl,
  IconButton,
} from '@material-ui/core';
import Select from 'react-select';
import clsx from 'clsx';
import axios from 'axios';
import { ArrowDropDown, ArrowDropUp } from '@material-ui/icons';
import Radio from '@material-ui/core/Radio';
import CircularProgress from '@material-ui/core/CircularProgress';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CustomBottomStepControlButtons from '../../common/CustomBottomStepControlButtons';
import CustomSwitchButton from '../../common/CustomSwitchButton';
import GlobalContext from '../../context/GlobalContext';

interface IProps {
  activeStep: number;
  handleNext: () => void;
  handleBack: () => void;
  steps: string[];
}

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
    padding: '5x 0px 5px 0px',
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
  smallText: {
    maxWidth: '50%',
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
    width: '100px',
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
  arrowIconDisabled: {
    border: '1px solid #362C63',
    color: '#8978b8',
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
}));

function StepFour({ activeStep, handleNext, handleBack, steps }: IProps) {
  const gContext = useContext(GlobalContext);
  const classes = useStyles();
  const [currency, setCurrency] = useState({
    value: 'USD',
    label: 'USD',
  });

  const [instanceTypeError, setInstanceTypeError] = useState<string>('');
  const [instanceSeriesError, setInstanceSeriesError] = useState<string>('');
  const [fetchingPriceLoading, setFetchingPriceLoading] = useState<boolean>(
    false
  );

  const getAzurePricing = async () => {
    try {
      console.log(
        'gContext?.instanceSeries?.value',
        gContext?.instanceSeries?.value
      );
      console.log(
        'gContext?.instanceType?.value',
        gContext?.instanceType?.value
      );
      console.log(
        'gContext?.instanceType?.value',
        gContext?.instanceType?.value
      );
      setFetchingPriceLoading(true);
      const res = await axios.get(
        `https://prices.azure.com/api/retail/prices?currencyCode='${
          gContext?.currency?.value
        }'&$filter=priceType eq 'Consumption' and serviceFamily eq 'Compute' and armRegionName eq 'westeurope' and skuName eq '${
          gContext?.instanceSeries?.value
        }' and productName eq '${
          !gContext?.platAsService
            ? `Virtual Machines ${gContext?.instanceType?.value}`
            : `Azure App Service ${gContext?.instanceType?.value} Plan - Linux`
        }'`
      );
      console.log(
        `https://prices.azure.com/api/retail/prices?currencyCode='${
          gContext?.currency?.value
        }'&$filter=priceType eq 'Consumption' and serviceFamily eq 'Compute' and armRegionName eq '${gContext?.azureRegion?.value}' and skuName eq '${
          gContext?.instanceSeries?.value
        }' and productName eq '${
          !gContext?.platAsService
            ? `Virtual Machines ${gContext?.instanceType?.value}`
            : `Azure App Service ${gContext?.instanceType?.value} Plan - Linux`
        }'`
      );
      setFetchingPriceLoading(false);
      // console.log(res?.data);
      if (res?.data?.Items?.length > 0) {
        gContext?.setProductPrice &&
          gContext?.setProductPrice(res?.data?.Items[0]?.retailPrice * 730);
        const rate = gContext?.paymentType;
        const deductionPrice = (
          (parseFloat(res?.data?.Items[0]?.retailPrice) / 100) *
          parseInt(rate, 10)
        ).toFixed(2);
        gContext?.setPayment &&
          gContext
            ?.setPayment(
              gContext?.instanceCount *
                (res?.data?.Items[0]?.retailPrice * 730) +
                parseFloat(deductionPrice)
            )
            .toFixed(2);
      }
    } catch (error) {
      // console.log('error in fetching pricing', error);
      setFetchingPriceLoading(false);
    }
  };

  useEffect(() => {
    if (gContext?.instanceType?.value && gContext?.instanceSeries?.value) {
      getAzurePricing();
    }
  }, [
    gContext?.instanceType,
    gContext?.instanceSeries?.value,
    gContext?.currency,
  ]);

  const disableNext = false;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    gContext?.setPaymentType &&
      gContext?.setPaymentType((event.target as HTMLInputElement).value);
    const rate = (event.target as HTMLInputElement).value;
    const deductionPrice = (
      (parseFloat(gContext?.productPrice) / 100) *
      parseInt(rate, 10)
    ).toFixed(2);
    gContext?.setPayment &&
      gContext?.setPayment(
        (
          gContext?.instanceCount *
          (parseFloat(gContext?.productPrice) + parseFloat(deductionPrice))
        ).toFixed(2)
      );
  };

  // const handleChangeCurrency = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setCurrency((event.target as HTMLInputElement).value);
  // };

  const VirtaulInstances = [
    {
      value: 'BS Series',
      label: 'BS Series',
      type: [
        {
          value: 'B1ls',
          label: 'B1ls: 1 vCPUs, .5GB RAM, 4GB storage',
        },
        {
          value: 'B1s',
          label: 'B1s: 1 vCPUs, 1GB RAM, 4GB storage',
        },
        {
          value: 'B2s',
          label: 'B2s: 2 vCPUs, 2GB RAM, 8GB storage',
        },
        {
          value: 'B1ms',
          label: 'B1ms: 1 vCPUs, 2GB RAM, 4GB storage',
        },
        {
          value: 'B2ms',
          label: 'B2ms: 2 vCPUs, 8GB RAM, 16GB storage',
        },
        {
          value: 'B4ms',
          label: 'B4ms: 4 vCPUs, 16GB RAM, 32GB storage',
        },
      ],
    },
    {
      value: 'D Series',
      label: 'D Series',
      type: [
        {
          value: 'D1',
          label: 'D1: 1 cores, 3.5GB RAM, 50GB storage',
        },
        {
          value: 'D2',
          label: 'D2: 2 cores, 7GB RAM, 100GB storage',
        },
        {
          value: 'D3',
          label: 'D3: 4 cores, 14GB RAM, 200GB storage',
        },
        {
          value: 'D4',
          label: 'D4: 8 cores, 28GB RAM, 400GB storage',
        },
      ],
    },
    {
      value: 'F Series',
      label: 'F Series',
      type: [
        {
          value: 'F1',
          label: 'F1: 1 cores, 2GB RAM, 16GB storage',
        },
        {
          value: 'F2',
          label: 'F2: 2 cores, 4GB RAM, 32GB storage',
        },
        {
          value: 'F4',
          label: 'F4: 4 cores, 8GB RAM, 64GB storage',
        },
        {
          value: 'F8',
          label: 'F8: 8 cores, 16GB RAM, 128GB storage ',
        },
      ],
    },
  ];

  const platformInstances = [
    {
      value: 'Basic',
      label: 'Basic',
      type: [
        {
          value: 'B1',
          label: 'B1 : 1 cores, 1.75GB RAM, 10GB storage',
        },
        {
          value: 'B2',
          label: 'B2: 2 cores, 3.5GB RAM, 10GB storage',
        },
        {
          value: 'B3',
          label: 'B3 : 4 cores, 7GB RAM, 10GB storage',
        },
      ],
    },

    {
      value: 'Standard',
      label: 'Standard',
      type: [
        {
          value: 'S1',
          label: 'S1 : 1 cores, 1.75GB RAM, 50GB storage',
        },
        {
          value: 'S2',
          label: 'S2: 2 cores, 3.5GB RAM, 50GB storage',
        },
        {
          value: 'S3',
          label: 'S3: 4 cores, 7GB RAM, 50GB storage',
        },
      ],
    },
    {
      value: 'Premium v2',
      label: 'Premium v2',
      type: [
        {
          value: 'P1 v2',
          label: 'P1 v2 : 1 cores, 3.5GB RAM, 250GB storage',
        },
        {
          value: 'P2 v2',
          label: 'P2 v2: 2 cores, 7GB RAM, 250GB storage',
        },
        {
          value: 'P3 v2',
          label: 'P3 v2: 4 cores, 14GB RAM, 250GB storage',
        },
      ],
    },
    {
      value: 'Premium v3',
      label: 'Premium v3',
      type: [
        {
          value: 'P1 v3',
          label: 'P1 v3 : 2 cores, 8GB RAM, 250GB storage',
        },
        {
          value: 'P2 v3',
          label: 'P2 v3: 4 cores, 16GB RAM, 250GB storage',
        },
        {
          value: 'P3 v3',
          label: 'P3 v3: 8 cores, 32GB RAM, 250GB storage',
        },
      ],
    },
  ];

  const style = {
    control: (base: any) => ({
      ...base,
      border: 0,
      boxShadow: 'none',
      background: '#362C63',
      color: '#fff',
      width: 'max-content',
      minWidth: '100%',
    }),
    singleValue: (base: any) => ({
      ...base,
      color: '#fff',
      background: '#362C63',
      // width: 400,
    }),
    option: (provided: any) => ({
      ...provided,
      color: '#fff',
      background: '#362C63',
      // width: 400,
    }),
  };

  // console.log('instanceType', instanceType);
  // console.log('instanceSeries', instanceSeries);
  // console.log('payment', payment);
  // console.log('counter', counter);
  // console.log('allInOne', allInOne);
  // console.log('allInOne', allInOne);
  // console.log('virtualMachine', virtualMachine);

  return (
    <Grid className={classes.mainGrid}>
      <Typography className={classes.typo} variant="h4">
        Compute settings
      </Typography>
      <Typography className={classes.smallTypo} variant="subtitle1">
        Please choose an architectural configuration:
      </Typography>

      <CustomSwitchButton
        title="All-in-one"
        label="Scalable"
        isOn={gContext?.scalable}
        setIsOn={gContext?.setScalable}
        disabled={false}
      />

      <Typography className={classes.smallTypo} variant="subtitle1">
        Please choose cloud service type:
      </Typography>

      <CustomSwitchButton
        title="Virtual Machine"
        label="Platform-as-a-service"
        isOn={gContext?.platAsService}
        setIsOn={gContext?.setPlatAsService}
        disabled={!gContext?.scalable}
      />

      <Grid container alignItems="center">
        <Grid item xs={12} md={3}>
          <Typography>Instance count</Typography>
        </Grid>
        <Grid item xs={12} md={9}>
          <div style={{ display: 'flex' }}>
            <TextField
              variant="outlined"
              value={gContext?.instanceCount}
              disabled
              className={classes.couterInput}
            />
            <div>
              <IconButton
                onClick={() => {
                  gContext?.setInstanceCount &&
                    gContext?.setInstanceCount(gContext?.instanceCount + 1);
                  gContext?.setPayment &&
                    gContext?.setPayment(
                      (
                        (gContext?.instanceCount + 1) *
                        parseFloat(gContext?.productPrice)
                      ).toFixed(2)
                    );
                }}
                disabled={!gContext?.scalable}
                className={classes.iconButton}
              >
                <ArrowDropUp
                  className={clsx(
                    gContext?.scalable
                      ? classes.arrowIcon
                      : classes.arrowIconDisabled
                  )}
                />
              </IconButton>
              <IconButton
                onClick={() => {
                  if (gContext?.instanceCount && gContext?.instanceCount > 0) {
                    gContext?.setInstanceCount &&
                      gContext?.setInstanceCount(gContext?.instanceCount - 1);
                    gContext?.setPayment &&
                      gContext?.setPayment(
                        (
                          (gContext?.instanceCount - 1) *
                          parseFloat(gContext?.productPrice)
                        ).toFixed(2)
                      );
                  }
                }}
                disabled={!gContext?.scalable}
                className={classes.iconButton}
              >
                <ArrowDropDown
                  className={clsx(
                    gContext?.scalable
                      ? classes.arrowIcon
                      : classes.arrowIconDisabled
                  )}
                />
              </IconButton>
            </div>
          </div>
        </Grid>
      </Grid>

      <br />

      <Grid container spacing={2} direction="row" alignItems="center">
        <Grid item xs={12} md={3}>
          <Typography style={{ color: 'white' }}>
            Instance Tier / Series:
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Select
            options={
              gContext?.platAsService ? platformInstances : VirtaulInstances
            }
            onChange={(e: any) => {
              // eslint-disable-next-line @typescript-eslint/no-unused-expressions
              gContext?.setInstanceType && gContext?.setInstanceType(e);
              // eslint-disable-next-line @typescript-eslint/no-unused-expressions
              gContext?.setInstanceTypeArray &&
                gContext?.setInstanceTypeArray(e?.type);
              // eslint-disable-next-line @typescript-eslint/no-unused-expressions
              gContext?.setInstanceSeries &&
                gContext?.setInstanceSeries({
                  value: '',
                  label: '',
                });
            }}
            value={gContext?.instanceType}
            styles={style}
            style={{ color: '#fff!important' }}
            error={
              gContext?.instanceType?.value === '' ? instanceTypeError : ''
            }
            onBlur={() => setInstanceTypeError("Regions Can't be Empty!")}
          />
          <div>
            <Typography
              className="text-danger"
              color="secondary"
              style={{ fontSize: 12 }}
            >
              {gContext?.instanceType?.value === '' ? instanceTypeError : ''}
            </Typography>
          </div>
        </Grid>
      </Grid>

      <Grid
        container
        spacing={2}
        direction="row"
        // justify="space-between"
        alignItems="center"
      >
        <Grid item xs={12} md={3}>
          <Typography style={{ color: 'white' }}>Instance Type:</Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Select
            options={gContext?.instanceTypeArray}
            onChange={(e: any) =>
              gContext?.setInstanceSeries && gContext?.setInstanceSeries(e)
            }
            styles={style}
            setValue={gContext?.setInstanceSeries}
            value={gContext?.instanceSeries}
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
              {gContext?.instanceSeries?.value === ''
                ? instanceSeriesError
                : ''}
            </Typography>
          </div>
        </Grid>
      </Grid>

      <br />
      <Grid container alignItems="flex-end">
        <Grid item xs={12} md={6}>
          {!gContext?.platAsService ? (
            <div>
              <Typography className={classes.smallTypo} variant="subtitle1">
                Please choose a savings option:
              </Typography>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="paymentType"
                  name="paymentType"
                  value={gContext?.paymentType}
                  onChange={handleChange}
                  color="primary"
                >
                  <FormControlLabel
                    value="0"
                    control={<Radio color="primary" />}
                    label="Pay-as-you-go"
                  />
                  <FormControlLabel
                    value="-36%"
                    control={<Radio color="primary" />}
                    label="1-year reserved (-36%)"
                  />
                  <FormControlLabel
                    value="-57%"
                    control={<Radio color="primary" />}
                    label="3-year reserved (-57%)"
                  />
                </RadioGroup>
              </FormControl>
            </div>
          ) : (
            ' '
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={12}>
              <Typography className={classes.smallTypo} variant="subtitle1">
                Average monthly cost:
              </Typography>
            </Grid>
            {fetchingPriceLoading ? (
              <Grid item xs={12} md={2}>
                <CircularProgress />
              </Grid>
            ) : (
              ''
            )}
            <Grid item xs={12} md={4}>
              <Select
                options={[
                  { value: 'USD', label: 'USD' },
                  { value: 'EUR', label: 'EURO' },
                ]}
                onChange={(e: any) =>
                  gContext?.setCurrency && gContext?.setCurrency(e)
                }
                value={gContext?.currency}
                styles={style}
                components={{
                  IndicatorSeparator: () => null,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                variant="outlined"
                margin="dense"
                className={classes.input}
                style={{ width: '60%' }}
                value={gContext?.payment ? gContext?.payment : 0.0}
                InputProps={{
                  readOnly: true,
                }}
                // onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                //   setPayment((event.target as HTMLInputElement).value)
                // }
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <br />

      <CustomBottomStepControlButtons
        disableNext={disableNext}
        activeStep={gContext?.scalable ? 4 : activeStep}
        handleBack={handleBack}
        handleNext={handleNext}
        steps={steps}
      />
      <br />
    </Grid>
  );
}

export default StepFour;
