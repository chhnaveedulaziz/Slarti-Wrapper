/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable prettier/prettier */
/* eslint-disable import/newline-after-import */
/* eslint-disable promise/always-return */
/* eslint-disable func-names */
/* eslint-disable promise/catch-or-return */
/* eslint-disable no-lonely-if */
/* eslint-disable react/jsx-key */
/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable no-nested-ternary */
/* eslint-disable object-shorthand */
/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
import React, { useState, useMemo, useContext } from 'react';
import { Grid, makeStyles, Typography, Button } from '@material-ui/core';
import axios from 'axios';
import ChipInput from 'material-ui-chip-input';
import countryList from 'react-select-country-list';
import Select from 'react-select';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CircularProgress from '@material-ui/core/CircularProgress';
import Toaster from '../../common/Toaster';
import CustomInputField from '../../common/CustomInputField';
import CustomSwitchButton from '../../common/CustomSwitchButton';
import CsrGenerator from '../../CSR/csrGenerator';
import CustomBottomStepControlButtons from '../../common/CustomBottomStepControlButtons';
import CustomFileUploader from '../../common/CustomFileUploader';
import GlobalContext from '../../context/GlobalContext';
const fsLibrary = require('fs');

const useStyles = makeStyles(() => ({
  mainGrid: {
    width: '80%',
    marginTop: '1%',
    marginLeft: '8%',
  },

  migrationInputGrid: {
    width: '40%',
    marginTop: '0px',
    display: 'flex',
    padding: '0px 10px 0px 0px',
    flexDirection: 'row',
  },
  typo: {
    color: '#FFFFFF',
    margin: '10px 0px 10px 0px',
  },

  headingOne: {
    fontSize: '28px',
  },
  alternativeNames: {
    borderRadius: '6px',
    background: '#362C63',
    height: '80%',
    padding: '5%',
    width: '569px',
    color: 'white',
    outline: 'none !important',
    '&..MuiInputBase-input:focus': {
      outline: 'none',
      color: 'white',
    },
  },
}));

interface IProps {
  activeStep: number;
  handleNext: () => void;
  handleBack: () => void;
  steps: string[];
}
//  zeroSSL access key
const ZEROSSL_ACCESS_KEY = '2a22431b6d92c603e28802440affe108';
// zeroSSL access key

function StepTwo({ activeStep, handleNext, handleBack, steps }: IProps) {
  const gContext = useContext(GlobalContext);
  const classes = useStyles();
  const [countryCode, setCountryCode] = useState<string>('');
  const [countryCodeError, setCountryCodeError] = useState<string>('');
  const [verficationMethodCodeError, setVerficationMethodCodeError] = useState<
    string
  >('');
  const [state, setState] = useState<string>('');
  const [stateError, setStateError] = useState<string>('');
  const [locality, setLocality] = useState<string>('');
  const [localityError, setLocalityError] = useState<string>('');
  const [organization, setOrganization] = useState<string>('');
  const [organizationError, setOrganizationError] = useState<string>('');
  const [orgUnit, setOrgUnit] = useState<string>('');
  const [orgUnitError, setOrgUnitError] = useState<string>('');
  const [commonName, setCommonName] = useState<string>('');
  const [commonNameError, setCommonNameError] = useState<string>('');
  const [csr, setCsr] = useState<string>('');
  const [alternativeChips, setAlternativesChips] = useState<string[]>([]);
  const [certificateGenerated, setCertificateGenerated] = useState<boolean>(
    false
  );
  const [csrGenerated, setCsrGenerated] = useState<boolean>(false);
  const [disableCSRFields, setDisableCSRFields] = useState<boolean>(false);
  const [verificationSelection, setverificationSelection] = useState<string>(
    ''
  );
  const [emailForVerification, setEmailForVerification] = useState<string>([]);

  const [certifiateResponse, setCertificateREsponse] = useState<string>('');
  const [showEmailVerification, setshowEmailVerification] = useState<boolean>(
    false
  );
  const [showCnameVerification, setshowCnameVerification] = useState<boolean>(
    false
  );
  const [showToast, setshowToast] = useState<boolean>(false);
  const [verifyingDomain, setverifyingDomain] = useState<boolean>(false);
  const [certificateSaved, setcertificateSaved] = useState<boolean>(false);
  const [showToastText, setshowToastText] = useState<string>('');
  const [downloadedCertificate, setdownloadedCertificate] = useState<string>(
    ''
  );
  const [selectedEmail, setselectedEmail] = useState<string>('');

  const options = useMemo(() => countryList().getData(), []);
  const verificatoinOptions = [
    {
      label: 'Email verification',
      value: 'email',
    },
    {
      label: 'CNAME verification',
      value: 'cname',
    },
    {
      label: 'HTTP file upload',
      value: 'http',
    },
    {
      label: 'HTTPS file upload',
      value: 'https',
    },
  ];

  const changeHandler = (value: any) => {
    setCountryCode(value);
  };
  const changeVerificatonHandler = (value: any) => {
    console.log('value', value);
    gContext?.setVerificationMethod(value);
    if (value?.value === 'email') {
      setshowEmailVerification(true);
      setshowCnameVerification(false);
    }
    if (value?.value === 'cname') {
      setshowEmailVerification(false);
      setshowCnameVerification(true);
    }

    setverificationSelection(value?.value);
  };
  const changeEmailHandler = (value: any) => {
    console.log('value', value);
    gContext?.setVerificationEmail && gContext?.setVerificationEmail(value);
    setselectedEmail(value?.value);
    console.log('gContext?.verEmail', gContext?.verEmail);
  };

  let displayField1 = 'none';
  let displayField2 = 'none';

  if (gContext?.obtainNewSsl) displayField1 = 'block';
  if (gContext?.generateCsr) displayField2 = 'block';

  const getInputValue = (e: any) => {
    if (e.target.id === 'sslCertificate') {
      gContext?.setOwnSSL(e.target.files[0]);
    }
    if (e.target.id === 'csr') {
      // setCsr(e.target.files[0].name);
      gContext?.setOwnCsr(e.target.files[0]);
    }
  };

  const isDomainValid = /^(?!:\/\/)(?=.{1,255}$)((.{1,63}\.){1,127}(?![0-9]*$)[a-z0-9-]+\.?)$/.test(
    commonName
  );

  // eslint-disable-next-line no-nested-ternary
  const conditionOne = gContext?.obtainNewSsl
    ? false
    : gContext?.ownSslCert?.name !== '';

  const conditionSecond = gContext?.generateCsr
    ? false
    : gContext?.ownCsr?.name !== '';

  const conditonThird =
    countryCode === '' ||
    state === '' ||
    locality === '' ||
    organization === '' ||
    orgUnit === '' ||
    commonName === '';
  // eslint-disable-next-line no-nested-ternary
  const disableNext = conditionOne
    ? true
    : conditionSecond
    ? true
    : certificateGenerated
    ? true
    : !conditonThird;

  const style = {
    control: (base: any) => ({
      ...base,
      border: 0,
      // This line disable the blue border
      boxShadow: 'none',
      background: '#362C63',
      color: '#fff',
    }),
    singleValue: (base: any) => ({
      ...base,
      color: '#fff',
    }),
    option: (provided: any) => ({
      ...provided,
      color: '#fff',
      background: '#362C63',
    }),
  };

  console.log(disableNext);
  // generating csr function which sends data to an API and get CSR in repsonse
  const generateCSR = async () => {
    try {
      setDisableCSRFields(true);
      setshowToast(true);
      setshowToastText('Generating CSR...');
      console.log('ZEROSSL_ACCESS_KEY', ZEROSSL_ACCESS_KEY);
      const CSR = await CsrGenerator(
        countryCode,
        state,
        locality,
        organization,
        orgUnit,
        commonName,
        alternativeChips
      );
      if (CSR) {
        gContext?.setCSR(CSR);
        gContext?.setCSRData(
          countryCode,
          state,
          locality,
          organization,
          orgUnit,
          commonName,
          alternativeChips
        );
        setCsrGenerated(true);
        setshowToastText('CSR generated successfully !');
        setTimeout(() => {
          setshowToastText('Creating Certificate...');
        }, 1000);
        const createSSLformdata = new FormData();
        createSSLformdata.append('certificate_csr', CSR);
        createSSLformdata.append('certificate_domains', commonName);
        createSSLformdata.append('certificate_validity_days', '90');

        const sslResponse = await axios.post(
          `http://api.zerossl.com/certificates?access_key=${ZEROSSL_ACCESS_KEY}`,
          createSSLformdata
        );
        console.log('sslResponse', sslResponse?.data);
        if (sslResponse?.data) {
          gContext?.setCertGenerated();

          setshowToastText('Certificate Created successfully !');
          setTimeout(() => {
            setshowToast(false);
          }, 1000);
          setCertificateREsponse(sslResponse?.data);
          const emailForVerify =
            sslResponse?.data?.validation?.email_validation?.[commonName];
          console.log('email foir verification ', emailForVerify);
          const allEmails = emailForVerify?.map((email: any) => {
            return {
              label: email,
              value: email,
            };
          });
          setEmailForVerification(allEmails);
          const cNames = [];
          Object.keys(sslResponse?.data?.validation?.other_methods)?.map(
            (key, index) => {
              cNames[index] = key;
            }
          );
          const allCnames = cNames?.map((name) => {
            return sslResponse?.data?.validation?.other_methods?.[name]
              ?.cname_validation_p1;
          });
          const allCValues = cNames?.map((name) => {
            return sslResponse?.data?.validation?.other_methods?.[name]
              ?.cname_validation_p2;
          });
          // setCnameName();
          gContext?.setCnameRecords(allCnames);
          // setCnameValue();
          gContext?.setCnameRecordsValues(allCValues);
        }
      }
      setDisableCSRFields(false);
    } catch (error) {
      setDisableCSRFields(false);
      console.log('error', error?.message);
    }
  };
  // for domain verification
  const verifyDomain = async () => {
    try {
      setverifyingDomain(true);
      const verifyDomainFormData = new FormData();
      if (verificationSelection === 'email') {
        console.log('email verification');
        verifyDomainFormData.append('validation_method', 'EMAIL');
        verifyDomainFormData.append('validation_email', selectedEmail);
      }
      if (verificationSelection === 'cname') {
        console.log('cname verification');
        verifyDomainFormData.append('validation_method', 'CNAME_CSR_HASH');
        verifyDomainFormData.append('validation_email', 'null');
      }
      if (verificationSelection === 'http') {
        verifyDomainFormData.append('validation_method', 'HTTP_CSR_HASH');
        verifyDomainFormData.append('validation_email', 'null');
      }
      if (verificationSelection === 'https') {
        verifyDomainFormData.append('validation_method', 'HTTPS_CSR_HASH');
        verifyDomainFormData.append('validation_email', 'null');
      }

      const verifyDomainRes = await axios.post(
        `http://api.zerossl.com/certificates/${certifiateResponse?.id}/challenges?access_key=${ZEROSSL_ACCESS_KEY}`,
        verifyDomainFormData
      );

      console.log('verifyDomain', verifyDomainRes);
      if (verifyDomainRes?.data?.id && verifyDomainRes?.data?.success) {
        const downloadCertificate = await axios.get(
          `http://api.zerossl.com/certificates/${certifiateResponse?.id}/download/return?access_key=${ZEROSSL_ACCESS_KEY}`
        );
        if (downloadCertificate?.data) {
          setdownloadedCertificate(downloadCertificate?.data);

          const data = `'certificate.crt': ${downloadCertificate?.data?.['certificate.crt']}\n 'ca_bundle.crt:' ${downloadCertificate?.data?.['ca_bundle.crt']}\n`;
          console.log('downloadCertificate', downloadCertificate);
          setcertificateSaved(true);

          // Write data in 'newfile.txt' .
          fsLibrary.writeFile(
            // 'Downloads',
            'zeroSSL_certificate.txt',
            data,
            (error: any) => {
              // In case of a error throw err exception.
              if (error) {
                console.log(error);
              }
            }
          );
        }

        setverifyingDomain(false);
        setshowToast(true);
        setshowToastText(verifyDomainRes?.data?.status);
      } else {
        setverifyingDomain(false);

        if (verifyDomainRes?.data?.error?.code === 2831) {
          setverifyingDomain(false);

          const downloadCertificate = await axios.get(
            `http://api.zerossl.com/certificates/${certifiateResponse?.id}/download/return?access_key=${ZEROSSL_ACCESS_KEY}`
          );
          if (downloadCertificate?.data) {
            setdownloadedCertificate(downloadCertificate?.data);

            const data = `'certificate.crt': ${downloadCertificate?.data?.['certificate.crt']}\n 'ca_bundle.crt:' ${downloadCertificate?.data?.['ca_bundle.crt']}\n`;
            console.log('downloadCertificate', downloadCertificate);
            // Write data in 'newfile.txt' .
            fsLibrary.writeFile(
              // 'Downloads',
              'zeroSSL_certificate.txt',
              data,
              (error: any) => {
                // In case of a error throw err exception.
                if (error) {
                  console.log(error);
                }
              }
            );
            setcertificateSaved(true);
          }
        } else {
          setverifyingDomain(false);

          setshowToast(true);
          setshowToastText(verifyDomainRes?.data?.error?.type);
        }
      }
    } catch (error) {
      console.log(error);
      setshowToast(true);
      setverifyingDomain(false);

      setshowToastText('error occured');
    }
  };

  const handleAddChip = (chip: string) => {
    const oldChips = alternativeChips;
    oldChips.push(chip);
    setAlternativesChips(oldChips);
  };
  const handleDeleteChip = (chip: string) => {
    const newArray = alternativeChips?.filter((oldChip) => oldChip !== chip);
    setAlternativesChips(newArray);
  };
  // const
  return (
    <Grid className={classes.mainGrid}>
      <Toaster
        state={showToast}
        message={showToastText}
        setState={setshowToast}
      />
      <Typography variant="h4" className={classes.typo}>
        Did you bring your own SSL certificate?
      </Typography>
      <Typography variant="h6" className={classes.typo}>
        Did you bring your own SSL certificate, or shall we obtain a new one
        from ZeroSSL for you?{' '}
      </Typography>

      <CustomSwitchButton
        title="Bring Your Own"
        label="Obtain a new one"
        isOn={gContext?.obtainNewSsl}
        setIsOn={gContext?.setNewSsl}
        disabled={false}
      />

      <div style={{ display: 'flex' }}>
        <CustomFileUploader
          width="50%"
          title="SSL Certificate"
          align="right"
          accept=".crt"
          elemId="sslCertificate"
          fileName={gContext?.ownSslCert?.name}
          onChange={(e) => getInputValue(e)}
          disabled={!!gContext?.obtainNewSsl || downloadedCertificate !== ''}
        />
        {downloadedCertificate !== '' ? (
          <CheckCircleIcon
            style={{
              color: '#2aef2a',
              padding: '16px',
              marginLeft: '-110px',
            }}
          />
        ) : (
          ''
        )}
      </div>

      <div style={{ display: displayField1 }}>
        <Typography variant="h6" className={classes.typo}>
          Did you bring your own CSR (certificate signing request), or shall we
          generate one right now?{' '}
        </Typography>

        <CustomSwitchButton
          title="Bring Your Own"
          label="Generate One"
          isOn={gContext?.generateCsr}
          setIsOn={gContext?.setNewCsr}
          disabled={false}
        />
        <div style={{ display: 'flex' }}>
          <CustomFileUploader
            width="50%"
            title="CSR"
            align="right"
            accept=".csr"
            elemId="csr"
            fileName={gContext?.ownCsr?.name}
            onChange={(e) => getInputValue(e)}
            disabled={!!gContext?.generateCsr || csrGenerated}
          />
          {csrGenerated ? (
            <CheckCircleIcon
              style={{
                color: '#2aef2a',
                padding: '16px',
                marginLeft: '-110px',
              }}
            />
          ) : (
            ''
          )}
        </div>
        <div style={{ display: displayField2 }}>
          {/* CSR Generation */}

          {!gContext?.certGenerated ? (
            <div>
              <Typography variant="h6" className={classes.typo}>
                Please provide the following details for your certificate
                signing request:
              </Typography>

              <Grid
                container
                spacing={2}
                style={{ width: '50%' }}
                direction="row"
                justify="space-between"
                alignItems="center"
                className={classes.migrationInputGrid}
              >
                <Grid item xs={12} md={3}>
                  <Typography align="right" style={{ color: 'white' }}>
                    Country Code
                  </Typography>
                </Grid>
                <Grid item xs={12} md={9}>
                  <Select
                    options={options}
                    isDisabled={disableCSRFields}
                    onChange={changeHandler}
                    styles={style}
                    style={{
                      color: '#fff!important',
                      border: `${
                        !countryCode
                          ? '1px solid green!important'
                          : '1px solid transparent'
                      }`,
                    }}
                    onBlur={() =>
                      setCountryCodeError("Country Code Can't Empty!")
                    }
                  />
                  <div>
                    <Typography
                      className="text-danger"
                      color="secondary"
                      style={{ fontSize: 12 }}
                    >
                      {countryCode === '' ? countryCodeError : ''}
                    </Typography>
                  </div>
                </Grid>
              </Grid>
              <CustomInputField
                width="50%"
                title="State"
                align="right"
                value={state}
                setValue={setState}
                error={state === '' ? stateError : ''}
                onBlur={() => setStateError("State Can't be Empty!")}
                // disabled={disableCSRFields}
              />
              <CustomInputField
                width="50%"
                title="Locality"
                align="right"
                value={locality}
                setValue={setLocality}
                error={locality === '' ? localityError : ''}
                onBlur={() => setLocalityError("Locality Can't be Empty!")}
              />
              <CustomInputField
                width="50%"
                title="Organisation"
                align="right"
                value={organization}
                setValue={setOrganization}
                error={organization === '' ? organizationError : ''}
                onBlur={() =>
                  setOrganizationError("Organization Name Can't be Empty!")
                }
              />
              <CustomInputField
                width="50%"
                title="Org unit"
                align="right"
                value={orgUnit}
                setValue={setOrgUnit}
                error={orgUnit === '' ? orgUnitError : ''}
                onBlur={() =>
                  setOrgUnitError("Org unit Can't be Empty!, e.g Marketing.")
                }
              />
              <CustomInputField
                width="50%"
                title="Common name"
                align="right"
                value={commonName}
                setValue={setCommonName}
                error={
                  // eslint-disable-next-line no-nested-ternary
                  commonName === ''
                    ? commonNameError
                    : isDomainValid
                    ? ''
                    : 'Invalid Name'
                }
                onBlur={() => setCommonNameError("Common Name Can't be Empty!")}
              />

              <Grid container spacing={2} style={{ width: '50%' }}>
                <Grid item md={3}>
                  <Typography align="right" style={{ color: 'white' }}>
                    Alternative names
                  </Typography>
                </Grid>
                <Grid item md={9}>
                  <ChipInput
                    className={classes.alternativeNames}
                    value={alternativeChips}
                    onAdd={(chip) => handleAddChip(chip)}
                    onDelete={(chip) => handleDeleteChip(chip)}
                    disabled={disableCSRFields}
                  />
                </Grid>
              </Grid>
              <Grid
                container
                spacing={2}
                style={{ width: '50%', marginTop: '5%' }}
              >
                <Grid item md={3} />
                <Grid item md={9}>
                  {!disableCSRFields ? (
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={disableCSRFields}
                      onClick={(e) => generateCSR()}
                    >
                      Genrate Csr
                    </Button>
                  ) : (
                    <CircularProgress />
                  )}
                </Grid>
                {/* for verification of domain */}
              </Grid>
            </div>
          ) : (
            ''
          )}

          {/* CSR Generation */}
          {/* Verification */}
          {gContext?.certGenerated ? (
            <div>
              <Typography variant="h6" className={classes.typo}>
                Please indicate how you would like to verify your ownership of
                the domain:
              </Typography>

              <Grid
                container
                spacing={2}
                // style={{ width: '50%' }}
                direction="row"
                justify="space-between"
                alignItems="center"
                className={classes.migrationInputGrid}
              >
                <Grid item xs={12} md={4}>
                  <Typography align="right" style={{ color: 'white' }}>
                    Verification method
                  </Typography>
                </Grid>
                {/* verification method availabale */}
                <Grid item xs={12} md={8}>
                  <Select
                    options={verificatoinOptions}
                    value={gContext?.verMethod}
                    isDisabled={disableCSRFields}
                    onChange={changeVerificatonHandler}
                    styles={style}
                    style={{
                      color: '#fff!important',
                      border: `${
                        !verificationSelection
                          ? '1px solid green!important'
                          : '1px solid transparent'
                      }`,
                    }}
                    onBlur={() =>
                      setVerficationMethodCodeError(
                        'select a verification method'
                      )
                    }
                  />
                  <div>
                    <Typography
                      className="text-danger"
                      color="secondary"
                      style={{ fontSize: 12 }}
                    >
                      {verificationSelection === ''
                        ? verficationMethodCodeError
                        : ''}
                    </Typography>
                  </div>
                </Grid>
                {/* verification method availabale */}
              </Grid>
              {/* if selected email verification */}
              {gContext?.verMethod?.value === 'email' ? (
                <Grid
                  container
                  spacing={2}
                  // style={{ width: '50%' }}
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                  className={classes.migrationInputGrid}
                >
                  <Grid item xs={12} md={4}>
                    <Typography align="right" style={{ color: 'white' }}>
                      Email:
                    </Typography>
                  </Grid>

                  <Grid item xs={12} md={8}>
                    <Select
                      options={emailForVerification}
                      value={gContext?.verEmail}
                      // isDisabled={disableCSRFields}
                      onChange={changeEmailHandler}
                      styles={style}
                      style={{
                        color: '#fff!important',
                        border: `${
                          !verificationSelection
                            ? '1px solid green!important'
                            : '1px solid transparent'
                        }`,
                      }}
                      onBlur={() =>
                        setVerficationMethodCodeError(
                          'select one of the emails'
                        )
                      }
                    />
                    <div>
                      <Typography
                        className="text-danger"
                        color="secondary"
                        style={{ fontSize: 12 }}
                      >
                        {verificationSelection === ''
                          ? verficationMethodCodeError
                          : ''}
                      </Typography>
                    </div>
                  </Grid>
                </Grid>
              ) : (
                // <CustomInputField
                //   width="50%"
                //   title="Email"
                //   align="right"
                //   value={emailForVerification}
                //   // setValue={setCommonName}
                //   disabled={true}
                //   // onBlur={() => setCommonNameError("Common Name Can't be Empty!")}
                // />
                ''
              )}
              {/* if selected email verification */}

              {/* if CNAME verification */}
              {gContext?.verMethod?.value === 'cname' ? (
                <div>
                  <Typography variant="h6" className={classes.typo}>
                    {gContext?.verMethod?.value === 'cname'
                      ? 'Please set the following CNAME record(s)'
                      : 'Please create the following files on your existing website'}
                  </Typography>
                  {gContext?.verMethod?.value === 'cname'
                    ? gContext?.cName?.map((name: any) => {
                        return (
                          <Typography
                            className={classes.typo}
                            variant="subtitle2"
                          >
                            {name}
                          </Typography>
                        );
                      })
                    : gContext?.cName?.slice(0, 1).map((name: any) => {
                        return (
                          <Typography
                            className={classes.typo}
                            variant="subtitle2"
                          >
                            {name}
                          </Typography>
                        );
                      })}

                  <Typography variant="h6" className={classes.typo}>
                    {gContext?.verMethod?.value === 'cname'
                      ? 'Pointing to the domain:'
                      : 'Containing the value'}
                  </Typography>
                  {gContext?.verMethod?.value === 'cname'
                    ? gContext?.cValues?.map((value: any) => {
                        return (
                          <Typography
                            className={classes.typo}
                            variant="subtitle2"
                          >
                            {value}
                          </Typography>
                        );
                      })
                    : gContext?.cValues?.slice(0, 1).map((value: any) => {
                        return (
                          <Typography
                            className={classes.typo}
                            variant="subtitle2"
                          >
                            {value}
                          </Typography>
                        );
                      })}
                </div>
              ) : (
                ''
              )}
              {/* if CNAME verification */}
              {verificationSelection !== '' ? (
                <Grid
                  container
                  spacing={2}
                  style={{ width: '50%', marginTop: '3%' }}
                >
                  <Grid item md={3} />
                  <Grid item md={9}>
                    {!verifyingDomain ? (
                      <Button
                        style={{ marginBottom: '50px' }}
                        variant="contained"
                        color="primary"
                        disabled={disableCSRFields}
                        onClick={() => verifyDomain()}
                      >
                        Verify Domain
                      </Button>
                    ) : (
                      <CircularProgress />
                    )}
                  </Grid>
                  {/* {downloadedCertificate ? (
                    <Typography className={classes.typo} variant="subtitle2">
                      {downloadedCertificate}
                    </Typography>
                  ) : (
                    ''
                  )} */}
                  {/* for verification of domain */}
                </Grid>
              ) : (
                ''
              )}
            </div>
          ) : (
            ''
          )}
          {/* Verification */}
          {/* for verification of domain */}
        </div>
      </div>

      <CustomBottomStepControlButtons
        // disableNext={!disableNext || !certificateSaved}
        disableNext={!disableNext}
        activeStep={activeStep}
        handleBack={handleBack}
        handleNext={handleNext}
        steps={steps}
        // setScreen={setScreen}
      />
    </Grid>
  );
}

export default StepTwo;
