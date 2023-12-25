/* eslint-disable prettier/prettier */
/* eslint-disable consistent-return */
/* eslint-disable prettier/prettier */
/* eslint-disable spaced-comment */
/* eslint-disable prefer-template */
/* eslint-disable no-console */
/* eslint-disable vars-on-top */
/* eslint-disable prettier/prettier */
const forge = require('node-forge');

const csrGenerator = (
  countryCode,
  state,
  locality,
  organization,
  orgUnit,
  commonName,
  alternativeNames
) => {
 
  console.log('Generating 2048-bit key-pair...');
  const keys = forge.pki.rsa.generateKeyPair({bits: 2048, e: 0x10001});
  console.log('Key-pair created.');

  console.log('Creating certification request (CSR) ...');
  const csr = forge.pki.createCertificationRequest();
  csr.publicKey = keys.publicKey;
  csr.setSubject([
    {
      name: 'commonName',
      value: commonName,
    },
    {
      name: 'countryName',
      value: countryCode?.value,
    },
    {
      shortName: 'ST',
      value: state,
    },
    {
      name: 'localityName',
      value: locality,
    },
    {
      name: 'organizationName',
      value: organization,
    },
    {
      shortName: 'OU',
      value: orgUnit,
    },
  ]);
  // set (optional) attributes
  const alternateNameArr = alternativeNames?.map((name) => {
    return {
      type: 2,
      value: name,
    };
  });
  console.log('alternateNameArr', alternateNameArr);
  if (alternateNameArr?.length > 0) {
    csr.setAttributes([
      {
        name: 'extensionRequest',
        extensions: [
          {
            name: 'subjectAltName',
            altNames: alternateNameArr,
          },
        ],
      },
    ]);
  }

  // sign certification request
  csr.sign(keys.privateKey /*, forge.md.sha256.create()*/);
  console.log('Certification request (CSR) created.');

  // PEM-format keys and csr
  const pem = {
    privateKey: forge.pki.privateKeyToPem(keys.privateKey),
    publicKey: forge.pki.publicKeyToPem(keys.publicKey),
    csr: forge.pki.certificationRequestToPem(csr),
  };

  console.log('\nKey-Pair:');
  //   console.log(pem.privateKey);
  //   console.log(pem.publicKey);

  console.log('\nCertification Request (CSR):');
  console.log(pem.csr);
  // get extensions array
  const getAt = csr.getAttribute({ name: 'extensionRequest' })?.extensions;
  console.log('attributes receiveed', getAt);

  // verify certification request
  try {
    if (csr.verify()) {
      console.log('Certification request (CSR) verified.');
    }
  } catch (err) {
    console.log(
      'Certification request (CSR) verification failure: ' +
        JSON.stringify(err, null, 2)
    );
  }
  return pem.csr;
};
export default csrGenerator;
