/* eslint-disable prettier/prettier */
import React, { useState, useContext } from 'react';
import { Grid, makeStyles, Typography, Button } from '@material-ui/core';
import Select from 'react-select';
import CustomBottomStepControlButtons from '../../common/CustomBottomStepControlButtons';
import CustomInputField from '../../common/CustomInputField';
import GlobalContext from '../../context/GlobalContext';

const useStyles = makeStyles(() => ({
  migrationInputGrid: {
    width: '40%',
    marginTop: '0px',
    display: 'flex',
    padding: '0px 10px 0px 0px',
    flexDirection: 'row',
  },
  mainGrid: {
    // backgroundColor:'red',
    width: '60%',
    marginTop: '1%',
    marginLeft: '8%',
  },
  typo: {
    color: '#FFFFFF',
    margin: '10px 0px 10px 0px',
  },
  butoon: {
    background: '#0097A9',
    boxShadow: '0px 0px 20px rgba(0, 151, 169, 0.51)',
    borderRadius: '8px',
    width: 100,
    height: 40,
  },
}));

interface IProps {
  activeStep: number;
  handleNext: () => void;
  handleBack: () => void;
  steps: string[];
}
function StepThree({ activeStep, handleNext, handleBack, steps }: IProps) {
  const classes = useStyles();
  const gContext = useContext(GlobalContext);
  // eslint-disable-next-line no-console
  console.log('azureRegion', gContext?.azureRegion?.value);

  const command = `terraform apply -var is_migration=${gContext?.isMigrating} -var duplicator_zip_file ='${gContext?.dupPluginZip?.path}' -var ssl_certificate_file='${gContext?.ownSslCert?.path}'`;
  // eslint-disable-next-line no-console
  console.log('command', command);

  const [subscriptionIdError, setSubscriptionIdError] = useState<string>('');
  const [subscriptionIdValid, setSubscriptionIdValid] = useState<string>(
    'unchanged'
  );

  const [clientSecretError, setClientSecretError] = useState<string>('');
  const [clientSecretValid, setClientSecretValid] = useState<string>(
    'unchanged'
  );

  const [aliCloudAccessSecretError, setAlliCloudAccessSecretError] = useState<
    string
  >('');
  const [aliCloudAccessSecretValid, setAlliCloudAccessSecretValid] = useState<
    string
  >('unchanged');

  const [originError, setOriginError] = useState<string>('');
  // const [availabilityError, setAvailabilityError] = useState<string>('');

  const isValidClientSecret = /^[A-Za-z0-9]{34}$/.test(gContext?.clientSecret);
  const disableNext =
    gContext?.azureRegion === '' ||
    gContext?.subscriptionId === '' ||
    gContext?.tenatId === '' ||
    gContext?.clientId === '' ||
    gContext?.clientSecret === '' ||
    !isValidClientSecret;

  const regions = [
    {
      value: 'eastus',
      label: 'eastus',
    },
    {
      value: 'eastus2',
      label: 'eastus2',
    },
    {
      value: 'southcentralus',
      label: 'southcentralus',
    },
    {
      value: 'westus2',
      label: 'westus2',
    },
    {
      value: 'australiaeast',
      label: 'australiaeast',
    },
    {
      value: 'southeastasia',
      label: 'southeastasia',
    },
    {
      value: 'northeurope',
      label: 'northeurope',
    },
    {
      value: 'uksouth',
      label: 'uksouth',
    },
    {
      value: 'westeurope',
      label: 'westeurope',
    },
    {
      value: 'centralus',
      label: 'centralus',
    },
    {
      value: 'northcentralus',
      label: 'northcentralus',
    },
    {
      value: 'westus',
      label: 'westus',
    },
    {
      value: 'southafricanorth',
      label: 'southafricanorth',
    },
    {
      value: 'centralindia',
      label: 'centralindia',
    },
    {
      value: 'jioindiawest',
      label: 'jioindiawest',
    },
    {
      value: 'koreacentral',
      label: 'koreacentral',
    },
    {
      value: 'canadacentral',
      label: 'canadacentral',
    },
    {
      value: 'francecentral',
      label: 'francecentral',
    },
    {
      value: 'germanywestcentral',
      label: 'germanywestcentral',
    },
    {
      value: 'norwayeast',
      label: 'norwayeast',
    },
    {
      value: 'switzerlandnorth',
      label: 'switzerlandnorth',
    },
    {
      value: 'uaenorth',
      label: 'uaenorth',
    },
    {
      value: 'brazilsouth',
      label: 'brazilsouth',
    },
    {
      value: 'centralusstage',
      label: 'centralusstage',
    },
    {
      value: 'eastusstage',
      label: 'eastusstage',
    },
    {
      value: 'eastus2stage',
      label: 'eastus2stage',
    },
    {
      value: 'westusstage',
      label: 'westusstage',
    },
    {
      value: 'westus2stage',
      label: 'westus2stage',
    },
    {
      value: 'asia',
      label: 'asia',
    },
    {
      value: 'asiapacific',
      label: 'asiapacific',
    },
    {
      value: 'australia',
      label: 'australia',
    },
    {
      value: 'brazil',
      label: 'brazil',
    },
    {
      value: 'canada',
      label: 'canada',
    },
    {
      value: 'europe',
      label: 'europe',
    },
    {
      value: 'global',
      label: 'global',
    },
    {
      value: 'india',
      label: 'india',
    },
    {
      value: 'japan',
      label: 'japan',
    },
    {
      value: 'uk',
      label: 'uk',
    },
    {
      value: 'unitedstates',
      label: 'unitedstates',
    },
    {
      value: 'eastasiastage',
      label: 'eastasiastage',
    },
    {
      value: 'eastus2euap',
      label: 'eastus2euap',
    },
    {
      value: 'westcentralus',
      label: 'westcentralus',
    },
    {
      value: 'westus3',
      label: 'westus3',
    },
    {
      value: 'southafricawest',
      label: 'southafricawest',
    },
    {
      value: 'australiacentral',
      label: 'australiacentral',
    },
    {
      value: 'australiacentral2',
      label: 'australiacentral2',
    },
    {
      value: 'australiasoutheast',
      label: 'australiasoutheast',
    },
    {
      value: 'japanwest',
      label: 'japanwest',
    },
    {
      value: 'koreasouth',
      label: 'koreasouth',
    },
    {
      value: 'southindia',
      label: 'southindia',
    },
    {
      value: 'westindia',
      label: 'westindia',
    },
    {
      value: 'canadaeast',
      label: 'canadaeast',
    },
    {
      value: 'francesouth',
      label: 'francesouth',
    },
    {
      value: 'germanynorth',
      label: 'germanynorth',
    },
    {
      value: 'norwaywest',
      label: 'norwaywest',
    },
    {
      value: 'switzerlandwest',
      label: 'switzerlandwest',
    },
    {
      value: 'ukwest',
      label: 'ukwest',
    },
    {
      value: 'uaecentral',
      label: 'uaecentral',
    },
    {
      value: 'brazilsoutheast',
      label: 'brazilsoutheast',
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
      // width: 300,
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

  return (
    <Grid className={classes.mainGrid}>
      <Typography variant="h3" className={classes.typo}>
        Azure Login
      </Typography>
      <Typography variant="subtitle1" className={classes.typo}>
        Get Started with 12 months of completely free Azure resources Upgrade
        later....
      </Typography>

      <Grid
        container
        spacing={2}
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Grid item xs={12} sm={12} md={3} lg={3} />
        <Grid item xs={12} sm={12} md={9} lg={9} align="right">
          <div
            style={{
              display: 'flex',
              gap: '3%',
              justifyContent: 'space-between',
              marginBottom: '1%',
            }}
          >
            <Typography variant="subtitle1" className={classes.typo}>
              Create your FREE Azure account:
            </Typography>
            <Button
              variant="contained"
              color="primary"
              // onClick={handleNext}
              className={classes.butoon}
              // disabled={disableNext}
            >
              {/* Free */}
              <a
                href="https://azure.microsoft.com/free"
                target="_blank"
                style={{ color: '#fff', textDecoration: 'none' }}
              >
                Free{' '}
              </a>
            </Button>
          </div>
          <div
            style={{
              display: 'flex',
              gap: '3%',
              justifyContent: 'space-between',
              marginBottom: '1%',
              alignItems: 'flex-end',
            }}
          >
            <Typography variant="subtitle1" className={classes.typo}>
              Sign in to you account:
            </Typography>
            <Button
              variant="contained"
              color="primary"
              // onClick={handleNext}
              onClick={() => {
                gContext?.setSubscriptionId('sdfjsldfjskdfjsdlifjw434i');
                gContext?.setTenantId('sdfjsldfjskdfjsdlifjw434i');
                gContext?.setClientId('sdfjsldfjskdfjsdlifjw434i');
                gContext?.setClientSecret('sfjsld2fjssdfsdfsdfkdfjsdlifjw434i');
                setSubscriptionIdValid('right');
                setClientSecretValid('right');
              }}
              className={classes.butoon}
              // disabled={disableNext}
            >
              Sign In
            </Button>
          </div>
        </Grid>
      </Grid>

      <Grid
        container
        spacing={2}
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Grid item xs={12} sm={12} md={3} lg={3} />
        <Grid item xs={12} sm={12} md={9} lg={9} align="right">
          <CustomInputField
            width="100%"
            title="Subscription ID:"
            align="right"
            value={gContext?.subscriptionId}
            setValue={gContext?.setSubscriptionId}
            disabled={true}
            valid={subscriptionIdValid}
            onBlur={() => {
              if (gContext?.subscriptionId !== '') {
                setSubscriptionIdValid('right');
              } else {
                setSubscriptionIdError("Subscription ID Can't be Empty!");
                setSubscriptionIdValid('wrong');
              }
            }}
          />
          <CustomInputField
            width="100%"
            title="Tenant ID:"
            align="right"
            value={gContext?.tenantId}
            setValue={gContext?.setTenantId}
            disabled={true}
            valid={subscriptionIdValid}
            onBlur={() => {
              if (gContext?.tenantId !== '') {
                setSubscriptionIdValid('right');
              } else {
                setSubscriptionIdError("Subscription ID Can't be Empty!");
                setSubscriptionIdValid('wrong');
              }
            }}
          />

          <CustomInputField
            width="100%"
            title="Client ID:"
            align="right"
            value={gContext?.clientId}
            setValue={gContext?.setClientId}
            disabled={true}
            valid={subscriptionIdValid}
            onBlur={() => {
              if (gContext?.clientId !== '') {
                setSubscriptionIdValid('right');
              } else {
                setSubscriptionIdError("Subscription ID Can't be Empty!");
                setSubscriptionIdValid('wrong');
              }
            }}
          />

          <CustomInputField
            width="100%"
            title="Client Secret:"
            align="right"
            value={gContext?.clientSecret}
            setValue={gContext?.setClientSecret}
            maxLength={34}
            type="password"
            disabled={true}
            error={
              // eslint-disable-next-line no-nested-ternary
              gContext?.clientSecret === ''
                ? clientSecretError
                : isValidClientSecret
                ? ''
                : 'This should be exactly 34 alphanumeric characters only. Only lowercase, uppercase and numeric characters are valid.'
            }
            valid={clientSecretValid}
            onBlur={() => {
              if (gContext?.clientSecret !== '') {
                setClientSecretValid('right');
              } else {
                setClientSecretError("Azure Secret Key Can't be Empty!");
                setClientSecretValid('wrong');
              }
            }}
          />
        </Grid>
      </Grid>
      <br />
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Grid item xs={12} sm={12} md={8} lg={8}>
          <Typography style={{ color: 'white' }}>
            Which Azure region would you like to create your new resources?
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} />
      </Grid>
      <br />
      <Grid
        container
        spacing={2}
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Grid item xs={12} sm={12} md={6} lg={6} />
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Select
            value={gContext?.azureRegion}
            options={regions}
            onChange={(e) => {
              gContext?.setAzureRegion(e);
            }}
            menuPlacement="top"
            styles={style}
            style={{ color: '#fff!important' }}
            error={gContext?.azureRegion?.value === '' ? originError : ''}
            onBlur={() => setOriginError("Regions Can't be Empty!")}
          />
          <div>
            <Typography
              className="text-danger"
              color="secondary"
              style={{ fontSize: 12 }}
            >
              {gContext?.azureRegion?.value === '' ? originError : ''}
            </Typography>
          </div>
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
    </Grid>
  );
}

export default StepThree;
