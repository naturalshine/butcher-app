const fs = require('fs');
const path = require('path');

// Load environment
const env = process.env.REACT_APP_NODE_ENV || 'development';

// Load ABI from file
const loadAbi = () => {
  const abiPath = path.join(__dirname, 'src', 'abis', 'butcher.abi');
  const abiContents = fs.readFileSync(abiPath, 'utf-8');
  return JSON.parse(abiContents);
};

const config = {
  env: env,
  output: path.join(__dirname, 'src', 'generated.js'),
  contracts: [
    {
      name: 'Butcher',
      address: '0x1Fd7beAb7FfFD72656CCF7785287c0ec669d4C1F',
      abi: loadAbi(),
      network: 'goerli',
    },
  ],
};

module.exports = config;
