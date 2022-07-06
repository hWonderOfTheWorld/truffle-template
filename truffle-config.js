require('babel-register');
require('babel-polyfill');
require('dotenv').config();
const fs = require('fs');

//Make sure you have a .env
const HDWalletProvider = require('@truffle/hdwallet-provider');
const privateKeys = process.env.PRIVATE_KEY

module.exports = {
  contracts_directory: "./contracts",
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
      skipDryRun: true 
    }, 
    main: {
      provider: () => new HDWalletProvider(
        privateKeys,
        `https://mainnet.infura.io/v3/...`,
        0,
        10
      ),
       network_id: 1,
       gas: 3000000,
       gasPrice: 60000000000,
       //182000000000 182gwei
       //132000000000 132gwei
       //65000000000 65gwei
       //85000000000 85gwei
       confirmations: 2,
       skipDryRun: false,
       production: true
    },
    testnet: {
       provider: () => new HDWalletProvider(
        privateKeys,
        `https://ropsten.infura.io/v3/...`,
        0,
        10
      ),
      confirmations: 2,
       skipDryRun: true,
       network_id: 3,
       gas: 5000000,
       gasPrice: 80000000000,
    }
  },
  
  plugins: [
    'truffle-plugin-verify', 'truffle-contract-size'
  ],
  api_keys: {
    etherscan: process.env.ETHERSCAN_API_KEY,
    ropstenscan: process.env.ETHERSCAN_API_KEY,
  },
  compilers: {
    solc: {
      version: "0.8.4",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      settings: {          // See the solidity docs for advice about optimization and evmVersion
        optimizer: {
        enabled: true,
        runs: 1000
        },
      evmVersion: "istanbul"
      }
    }
  }
};