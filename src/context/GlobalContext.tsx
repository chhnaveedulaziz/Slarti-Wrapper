/* eslint-disable prettier/prettier */
/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import React, { useState, createContext } from 'react';

interface ContextValues {
  // step 1
  isMigrating?: boolean;
  setMigrating?: () => void;
  dupPluginZip?: any;
  setPluginZip?: ((file: any) => void | undefined) | undefined;
  dupPluginIns?: any;
  setPluginIns?: ((file: any) => void | undefined) | undefined;
  // step 2
  obtainNewSsl?: boolean;
  setNewSsl?: () => void;
  generateCsr?: boolean;
  setNewCsr?: () => void;
  ownSslCert?: any;
  setOwnSSL?: ((file: any) => void | undefined) | undefined;
  setCSR?: ((csr: any) => void) | undefined;
  ownCsr?: any;
  setOwnCsr?: ((file: any) => void | undefined) | undefined;
  csrData?: any;
  setCSRData?:
    | ((
        countryCode: any,
        state: any,
        locality: any,
        organization: any,
        orgUnit: any,
        commonName: any,
        alternativeChips: any
      ) => void | undefined)
    | undefined;
  CSR?: string;
  verMethod?: string;
  verEmail?: string;
  certGenerated?: boolean;
  setCertGenerated?: () => void;
  setVerificationMethod?: ((method: string) => void) | undefined;
  setVerificationEmail?: ((method: string) => void) | undefined;
  cName?: string[];
  setCnameRecords?: ((method: string[]) => void) | undefined;
  cValues?: string[];
  setCnameRecordsValues?: ((method: string[]) => void) | undefined;
  emailsForVerification?: string[];
  setEmailsForVerification?: (arr: string[]) => void;
  // step 3
  azurAcessKey?: string;
  setAzureAccessKey?: (key: string) => void;
  azureSecretKey?: string;
  setAzureSecretKey?: (key: string) => void;
  azureRegion?: string;
  setAzureRegion?: ((key: any) => void) | undefined;
  azureZone?: string;
  setAzureZone?: (key: string) => void;
  // step 4
  setScalable?: () => void;
  scalable?: boolean;
  platAsService?: boolean;
  setPlatAsService?: () => void;
  instanceCount?: number;
  setInstanceCount?: ((count: number) => void) | undefined;
  instanceType?: { value: string; label: string };
  setInstanceType?: (instance: any) => void;
  instanceTypeArray?: string[];
  setInstanceTypeArray?: (array: any) => void;
  instanceSeries?: { value: string; label: string };
  setInstanceSeries?: (array: any) => void;
  payment?: string;
  setPayment?: (payment: any) => void;
  paymentType?: string;
  setPaymentType?: (as: any) => void;
  productPrice?: string;
  setProductPrice?: (as: any) => void;
  currency?: { value: string; label: string };
  setCurrency?: (as: any) => void;
  // step 5
  flexibleServer?: boolean;
  setFlexibleServer?: () => void;
  stepFinstanceType?: { label: string; value: string };
  setStepFinstanceType?: ((e: any) => void) | undefined;
  stepFinstanceTypeArray?: string[];
  setStepFInstanceTypeArray?: ((e: any) => void) | undefined;
  stepFinstanceSeries?: { label: string; value: string };
  setStepFInstanceSeries?: ((e: any) => void) | undefined;
  stepFcurrency?: {
    value: string;
    label: string;
  };
  setStepFcurrency?: (e: any) => void;
  stepFpaymentType?: string;
  setStepFPaymentType?: (e: any) => void;
  stepFDatabasePrice?: number;
  setStepFDatabasePrice?: (price: any) => void;
  stepFTotal?: number;
  setStepFTotal?: (total: any) => void;
}
const GlobalContext = createContext<ContextValues>({});

const GlobalProvider = ({ children }: React.ElementType<any> | any) => {
  // for first screen
  const [isMigrating, setIsMigrating] = useState<boolean>(false);
  const [dupPluginZip, setDupPluginZip] = useState<string>('');
  const [dupPluginIns, setDupPluginIns] = useState<string>('');

  const setMigrating = () => {
    console.log('migrating', !isMigrating);
    setIsMigrating(!isMigrating);
  };
  const setPluginZip = (file: any) => {
    setDupPluginZip(file);
  };
  const setPluginIns = (file: any) => {
    setDupPluginIns(file);
  };
  // for Second screen

  const [obtainNewSsl, setObtainNewSsl] = useState<boolean>(false);
  const [generateCsr, setGenerateCsr] = useState<boolean>(false);
  const [ownSslCert, setOwnSslCert] = useState<any>(null);
  const [ownCsr, setownCsr] = useState<any>(null);
  const [csrData, setCsrData] = useState<any>({
    countryCode: '',
    state: '',
    locality: '',
    organization: '',
    orgUnit: '',
    commonName: '',
    alternativeChips: '',
  });
  const [CSR, setCsR] = useState<string>('');
  const [verMethod, setVerMethod] = useState<string>('');
  const [verEmail, setVerEmail] = useState<string>('');
  const [cName, setcName] = useState<string[]>([]);
  const [cValues, setcValues] = useState<string[]>([]);
  const [certGenerated, setcertGenerated] = useState<boolean>(false);
  const [emailsForVerification, setemailsForVerification] = useState<string[]>(
    []
  );
  const [payment, setpayment] = useState<string>('0.00');
  const [instanceCount, setinstanceCount] = useState<number>(1);

  const setEmailsForVerification = (arr: string[]) => {
    setemailsForVerification(arr);
  };
  const setCertGenerated = () => {
    setcertGenerated(true);
  };
  const setNewSsl = () => {
    setObtainNewSsl(!obtainNewSsl);
  };
  const setNewCsr = () => {
    setGenerateCsr(!generateCsr);
  };
  const setOwnSSL = (file: any) => {
    setOwnSslCert(file);
  };
  const setOwnCsr = (file: any) => {
    setownCsr(file);
  };
  const setCSRData = (
    countryCode: any,
    state: any,
    locality: any,
    organization: any,
    orgUnit: any,
    commonName: any,
    alternativeChips: any
  ) => {
    console.log({
      countryCode: countryCode,
      state: state,
      locality: locality,
      organization: organization,
      orgUnit: orgUnit,
      commonName: commonName,
      alternativeChips: alternativeChips,
    });
    setCsrData({
      countryCode: countryCode,
      state: state,
      locality: locality,
      organization: organization,
      orgUnit: orgUnit,
      commonName: commonName,
      alternativeChips: alternativeChips,
    });
  };
  const setCSR = (csr: any) => {
    console.log('CSR in context', csr);
    setCsR(csr);
  };
  const setVerificationEmail = (email: any) => {
    console.log('email in context', email);
    setVerEmail(email);
  };
  const setVerificationMethod = (method: string) => {
    setVerMethod(method);
  };
  const setCnameRecords = (records: string[]) => {
    setcName(records);
  };
  const setCnameRecordsValues = (records: string[]) => {
    setcValues(records);
  };
  // third screen
  const [azurAcessKey, setazurAcessKey] = useState<string>('');
  const setAzureAccessKey = (key: string) => {
    setazurAcessKey(key);
  };
  const [azureSecretKey, setazureSecretKey] = useState<string>('');
  const setAzureSecretKey = (key: string) => {
    setazureSecretKey(key);
  };
  const [azureRegion, setazureRegion] = useState<string>('');
  const setAzureRegion = (region: any) => {
    setazureRegion(region);
  };
  const [azureZone, setazureZone] = useState<string>('');
  const setAzureZone = (zone: string) => {
    setazureZone(zone);
  };
  // fourth screen
  const [scalable, setscalable] = useState<boolean>(false);
  const [instanceType, setinstanceType] = useState<{
    value: string;
    label: string;
  }>({ value: '', label: '' });
  const [instanceSeries, setinstanceSeries] = useState<{
    label: string;
    value: string;
  }>({ value: '', label: '' });
  const setScalable = () => {
    setscalable(!scalable);
    setpayment('0');
    setinstanceCount(1);
    setinstanceType({ value: '', label: '' });
    setinstanceSeries({ value: '', label: '' });
  };
  const [platAsService, setplatAsService] = useState<boolean>(false);

  const setPlatAsService = () => {
    setplatAsService(!platAsService);
    setpayment('0');
    setinstanceCount(1);
    setinstanceType({ value: '', label: '' });
    setinstanceSeries({ value: '', label: '' });
  };
  const setInstanceCount = (count: number) => {
    setinstanceCount(count);
  };

  const setInstanceType = (instance: any) => {
    setinstanceType(instance);
  };
  const [instanceTypeArray, setinstanceTypeArray] = useState<string[]>([]);
  const setInstanceTypeArray = (array: any) => {
    setinstanceTypeArray(array);
  };

  const setInstanceSeries = (series: any) => {
    setinstanceSeries(series);
  };
  const setPayment = (pay: any) => {
    setpayment(pay);
  };
  const [paymentType, setpaymentType] = useState<string>('0');
  const setPaymentType = (as: any) => {
    setpaymentType(as);
  };
  const [productPrice, setproductPrice] = useState<string>('0');
  const setProductPrice = (as: any) => {
    setproductPrice(as);
  };
  const [currency, setcurrency] = useState<{
    value: string;
    label: string;
  }>({
    value: 'USD',
    label: 'USD',
  });
  const setCurrency = (as: any) => {
    setcurrency(as);
  };
  // step 5
  const [flexibleServer, setflexibleServer] = useState<boolean>(false);
  const [stepFinstanceType, setstepFinstanceType] = useState<{
    value: string;
    label: string;
  }>({ value: '', label: '' });
  const [stepFinstanceTypeArray, setstepFinstanceTypeArray] = useState<
    string[]
  >([]);

  const [stepFinstanceSeries, setStepFinstanceSeries] = useState<{
    value: string;
    label: string;
  }>({ value: '', label: '' });
  const [stepFDatabasePrice, setstepFDatabasePrice] = useState<number>(0);
  const [stepFTotal, setstepFTotal] = useState<number>(0);

  const setFlexibleServer = () => {
    setflexibleServer(!flexibleServer);
    setStepFinstanceSeries({ value: '', label: '' });
    setstepFinstanceTypeArray([]);
    setstepFinstanceType({ value: '', label: '' });
    setstepFTotal(0);
    setstepFDatabasePrice(0);
  };
  const setStepFinstanceType = (e: any) => {
    console.log(e);
    setstepFinstanceType(e);
  };
  const setStepFInstanceTypeArray = (e: any) => {
    setstepFinstanceTypeArray(e);
  };
  const setStepFInstanceSeries = (e: any) => {
    setStepFinstanceSeries(e);
  };
  const [stepFcurrency, setstepFcurrency] = useState<{
    value: string;
    label: string;
  }>({
    value: 'USD',
    label: 'USD',
  });
  const setStepFcurrency = (e: any) => {
    setstepFcurrency(e);
  };
  const [stepFpaymentType, setstepFPaymentType] = useState<string>('0');
  const setStepFPaymentType = (e: any) => {
    setstepFPaymentType(e.target.value);
  };
  const setStepFDatabasePrice = (price: any) => {
    setstepFDatabasePrice(price);
  };
  const setStepFTotal = (total: any) => {
    setstepFTotal(total);
  };

  return (
    <GlobalContext.Provider
      value={{
        // step 1
        isMigrating,
        setMigrating,
        dupPluginZip,
        setPluginZip,
        dupPluginIns,
        setPluginIns,
        // step 2
        setNewSsl,
        obtainNewSsl,
        generateCsr,
        setNewCsr,
        ownSslCert,
        setOwnSSL,
        setOwnCsr,
        ownCsr,
        csrData,
        setCSRData,
        setCSR,
        CSR,
        setVerificationMethod,
        verMethod,
        verEmail,
        setVerificationEmail,
        emailsForVerification,
        cName,
        setCnameRecords,
        cValues,
        setCnameRecordsValues,
        certGenerated,
        setCertGenerated,
        // step 3
        azurAcessKey,
        setAzureAccessKey,
        azureSecretKey,
        setAzureSecretKey,
        azureRegion,
        setAzureRegion,
        azureZone,
        setAzureZone,
        // step 4
        scalable,
        setScalable,
        platAsService,
        setPlatAsService,
        instanceCount,
        setInstanceCount,
        instanceType,
        setInstanceType,
        instanceTypeArray,
        setInstanceTypeArray,
        instanceSeries,
        setInstanceSeries,
        payment,
        setPayment,
        paymentType,
        setPaymentType,
        productPrice,
        setProductPrice,
        currency,
        setCurrency,
        // step 5
        flexibleServer,
        setFlexibleServer,
        stepFinstanceType,
        setStepFinstanceType,
        stepFinstanceTypeArray,
        setStepFInstanceTypeArray,
        stepFinstanceSeries,
        setStepFInstanceSeries,
        stepFcurrency,
        setStepFcurrency,
        stepFpaymentType,
        setStepFPaymentType,
        stepFDatabasePrice,
        setStepFDatabasePrice,
        stepFTotal,
        setStepFTotal,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export default GlobalContext;
export { GlobalProvider };
