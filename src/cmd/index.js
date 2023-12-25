/* eslint-disable prettier/prettier */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */
const util = require('util');
const exec = util.promisify(require('child_process').exec);

export const terraformInit = async () => {
  const { stdout, stderr } = await exec(`cd terraform && terraform init `);
  return { error: stderr, output: stdout };
};
export const terraformPlan = async (command) => {
  const { stdout, stderr } = await exec(`cd terraform && ${command}`);
  console.log('stdout', stdout);
  return { error: stderr, output: stdout };
};
