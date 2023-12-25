/* eslint-disable prettier/prettier */
import React, { useState, useContext } from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
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
    width: '40%',
    marginTop: '4%',
    marginLeft: '30%',
  },
  typo: {
    color: '#FFFFFF',
    margin: '10px 0px 10px 0px',
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
  console.log('csrData', gContext?.csrData?.commanName);

  const command = `terraform apply -var is_migration=${gContext?.isMigrating} -var duplicator_zip_file ='${gContext?.dupPluginZip?.path}' -var ssl_certificate_file='${gContext?.ownSslCert?.path}'`;
  console.log('command', command);
  const [aliCloudAccessKeyError, setAlliCloudAccessKeyError] = useState<string>(
    ''
  );
  const [aliCloudAccessKeyValid, setAlliCloudAccessKeyValid] = useState<string>(
    'unchanged'
  );
  const [aliCloudAccessSecretError, setAlliCloudAccessSecretError] = useState<
    string
  >('');
  const [aliCloudAccessSecretValid, setAlliCloudAccessSecretValid] = useState<
    string
  >('unchanged');

  const [originError, setOriginError] = useState<string>('');
  const [availabilityError, setAvailabilityError] = useState<string>('');

  const disableNext =
    gContext?.azurAcessKey === '' || gContext?.azureSecretKey === '';

  const isValidAccessKey = /^[A-Za-z0-9]{24}$/.test(gContext?.azurAcessKey);
  const isValidAccessSecret = /^[A-Za-z0-9]{30}$/.test(
    gContext?.azureSecretKey
  );

  const regions = [
    {
      value: 'cn-qingdao',
      label: 'cn-qingdao',
      zones: [
        {
          value: 'cn-qingdao-b',
          label: 'cn-qingdao-b',
        },
        {
          value: 'cn-qingdao-c',
          label: 'cn-qingdao-c',
        },
      ],
    },
    {
      value: 'cn-beijing',
      label: 'cn-beijing',
      zones: [
        {
          value: 'cn-beijing-a',
          label: 'cn-beijing-a',
        },
        {
          value: 'cn-beijing-b',
          label: 'cn-beijing-b',
        },
        {
          value: 'cn-beijing-c',
          label: 'cn-beijing-c',
        },
        {
          value: 'cn-beijing-d',
          label: 'cn-beijing-d',
        },
        {
          value: 'cn-beijing-e',
          label: 'cn-beijing-e',
        },
        {
          value: 'cn-beijing-f',
          label: 'cn-beijing-f',
        },
        {
          value: 'cn-beijing-g',
          label: 'cn-beijing-g',
        },
      ],
    },
    {
      value: 'cn-zhangjiakou',
      label: 'cn-zhangjiakou',
      zones: [
        {
          value: 'cn-zhangjiakou-a',
          label: 'cn-zhangjiakou-a',
        },
        {
          value: 'cn-zhangjiakou-b',
          label: 'cn-zhangjiakou-b',
        },
      ],
    },
    {
      value: 'cn-huhehaote',
      label: 'cn-huhehaote',
      zones: [
        {
          value: 'cn-huhehaote-a',
          label: 'cn-huhehaote-a',
        },
        {
          value: 'cn-huhehaote-b',
          label: 'cn-huhehaote-b',
        },
      ],
    },
    {
      value: 'cn-hangzhou',
      label: 'cn-hangzhou',
      zones: [
        {
          value: 'cn-hangzhou-b',
          label: 'cn-hangzhou-b',
        },
        {
          value: 'cn-hangzhou-c',
          label: 'cn-hangzhou-c',
        },
        {
          value: 'cn-hangzhou-d',
          label: 'cn-hangzhou-d',
        },
        {
          value: 'cn-hangzhou-e',
          label: 'cn-hangzhou-e',
        },
        {
          value: 'cn-hangzhou-f',
          label: 'cn-hangzhou-f',
        },
        {
          value: 'cn-hangzhou-g',
          label: 'cn-hangzhou-g',
        },
        {
          value: 'cn-hangzhou-h',
          label: 'cn-hangzhou-h',
        },
      ],
    },

    {
      value: 'cn-shanghai',
      label: 'cn-shanghai',
      zones: [
        {
          value: 'cn-shanghai-a',
          label: 'cn-shanghai-a',
        },
        {
          value: 'cn-shanghai-b',
          label: 'cn-shanghai-b',
        },
        {
          value: 'cn-shanghai-c',
          label: 'cn-shanghai-c',
        },
        {
          value: 'cn-shanghai-d',
          label: 'cn-shanghai-d',
        },
        {
          value: 'cn-shanghai-e',
          label: 'cn-shanghai-e',
        },
        {
          value: 'cn-shanghai-f',
          label: 'cn-shanghai-f',
        },
      ],
    },
    {
      value: 'cn-shenzhen',
      label: 'cn-shenzhen',
      zones: [
        {
          value: 'cn-shenzhen-a',
          label: 'cn-shenzhen-a',
        },
        {
          value: 'cn-shenzhen-b',
          label: 'cn-shenzhen-b',
        },
        {
          value: 'cn-shenzhen-c',
          label: 'cn-shenzhen-c',
        },
        {
          value: 'cn-shenzhen-d',
          label: 'cn-shenzhen-d',
        },
      ],
    },
    {
      value: 'cn-hongkong',
      label: 'cn-hongkong',
      zones: [
        {
          value: 'cn-hongkong-a',
          label: 'cn-hongkong-a',
        },
        {
          value: 'cn-hongkong-b',
          label: 'cn-hongkong-b',
        },
        {
          value: 'cn-hongkong-c',
          label: 'cn-hongkong-c',
        },
      ],
    },
    {
      value: 'ap-northeast-1',
      label: 'ap-northeast-1',
      zones: [
        {
          value: 'ap-northeast-1a',
          label: 'ap-northeast-1a',
        },
      ],
    },
    {
      value: 'ap-southeast-1',
      label: 'ap-southeast-1',
      zones: [
        {
          value: 'ap-southeast-1a',
          label: 'ap-southeast-1a',
        },
        {
          value: 'ap-southeast-1b',
          label: 'ap-southeast-1b',
        },
        {
          value: 'ap-southeast-1c',
          label: 'ap-southeast-1c',
        },
      ],
    },
    {
      value: 'ap-southeast-2',
      label: 'ap-southeast-2',
      zones: [
        {
          value: 'ap-southeast-2a',
          label: 'ap-southeast-2a',
        },
        {
          value: 'ap-southeast-2b',
          label: 'ap-southeast-2b',
        },
      ],
    },
    {
      value: 'ap-southeast-3',
      label: 'ap-southeast-3',
      zones: [
        {
          value: 'ap-southeast-3a',
          label: 'ap-southeast-3a',
        },
        {
          value: 'ap-southeast-3b',
          label: 'ap-southeast-3b',
        },
      ],
    },
    {
      value: 'ap-southeast-5',
      label: 'ap-southeast-5',
      zones: [
        {
          value: 'ap-southeast-5a',
          label: 'ap-southeast-5a',
        },
      ],
    },
    {
      value: 'ap-south-1',
      label: 'ap-south-1',
      zones: [
        {
          value: 'ap-south-1a',
          label: 'ap-south-1a',
        },
        {
          value: 'ap-south-1b',
          label: 'ap-south-1b',
        },
      ],
    },
    {
      value: 'us-east-1',
      label: 'us-east-1',
      zones: [
        {
          value: 'us-east-1a',
          label: 'us-east-1a',
        },
        {
          value: 'us-east-1b',
          label: 'us-east-1b',
        },
      ],
    },
    {
      value: 'us-west-1',
      label: 'us-west-1',
      zones: [
        {
          value: 'us-west-1a',
          label: 'us-west-1a',
        },
        {
          value: 'us-west-1b',
          label: 'us-west-1b',
        },
      ],
    },
    {
      value: 'eu-west-1',
      label: 'eu-west-1',
      zones: [
        {
          value: 'eu-west-1a',
          label: 'eu-west-1a',
        },
        {
          value: 'eu-west-1b',
          label: 'eu-west-1b',
        },
      ],
    },

    {
      value: 'me-east-1',
      label: 'me-east-1',
      zones: [
        {
          value: 'me-east-1a',
          label: 'me-east-1a',
        },
      ],
    },
    {
      value: 'eu-central-1',
      label: 'eu-central-1',
      zones: [
        {
          value: 'eu-central-1a',
          label: 'eu-central-1a',
        },
        {
          value: 'eu-central-1b',
          label: 'eu-central-1b',
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
      width: 300,
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
        Please provide your Azure settings
      </Typography>
      <Typography variant="subtitle1" className={classes.typo}>
        Please provide the following main, mandatory Azure Settings:
      </Typography>
      <CustomInputField
        width="90%"
        title="Azure access key:"
        align="right"
        value={gContext?.azurAcessKey}
        setValue={gContext?.setAzureAccessKey}
        maxLength={24}
        error={
          // eslint-disable-next-line no-nested-ternary
          gContext?.azurAcessKey === ''
            ? aliCloudAccessKeyError
            : isValidAccessKey
            ? ''
            : 'This should be exactly 24 alphanumeric characters only. Only lowercase, uppercase and numeric characters are valid.'
        }
        valid={aliCloudAccessKeyValid}
        // error={organizationError}
        onBlur={() => {
          if (gContext?.azurAcessKey !== '') {
            setAlliCloudAccessKeyValid('right');
          } else {
            setAlliCloudAccessKeyError("Azure Access Key Can't be Empty!");
            setAlliCloudAccessKeyValid('wrong');
          }
        }}
      />

      <CustomInputField
        width="90%"
        title="Azure secret key:"
        align="right"
        value={gContext?.azureSecretKey}
        setValue={gContext?.setAzureSecretKey}
        maxLength={30}
        error={
          // eslint-disable-next-line no-nested-ternary
          gContext?.azureSecretKey === ''
            ? aliCloudAccessSecretError
            : isValidAccessSecret
            ? ''
            : 'This should be exactly 24 alphanumeric characters only. Only lowercase, uppercase and numeric characters are valid.'
        }
        valid={aliCloudAccessSecretValid}
        // error={organizationError}
        onBlur={() => {
          if (gContext?.azureSecretKey !== '') {
            setAlliCloudAccessSecretValid('right');
          } else {
            setAlliCloudAccessSecretError("Azure Secret Key Can't be Empty!");
            setAlliCloudAccessSecretValid('wrong');
          }
        }}
      />

      <Grid
        container
        spacing={2}
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Grid item xs={12} md={3}>
          <Typography align="right" style={{ color: 'white' }}>
            Region:
          </Typography>
        </Grid>
        <Grid item xs={12} md={9}>
          <Select
            value={gContext?.azureRegion}
            options={regions}
            onChange={(e) => {
              gContext?.setAzureRegion(e);
            }}
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

      <Grid
        container
        spacing={2}
        direction="row"
        justify="space-between"
        alignItems="center"
        style={{ paddingBottom: '5%' }}
      >
        <Grid item xs={12} md={3}>
          <Typography align="right" style={{ color: 'white' }}>
            Avaliblity Zones:
          </Typography>
        </Grid>
        <Grid item xs={12} md={9}>
          <Select
            value={gContext?.azureZone}
            options={gContext?.azureRegion?.zones}
            onChange={(e) => gContext?.setAzureZone(e)}
            styles={style}
            setValue={gContext?.setAzureZone}
            onBlur={() => setAvailabilityError("Availability Can't be Empty!")}
          />
          <div>
            <Typography
              className="text-danger"
              color="secondary"
              style={{ fontSize: 12 }}
            >
              {gContext?.azureZone?.value === '' ? availabilityError : ''}
            </Typography>
          </div>
        </Grid>
      </Grid>

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
