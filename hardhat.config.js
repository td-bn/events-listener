require('dotenv').config();
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-web3");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.7",
  paths: {
    sources: "./contracts",
    artifacts: "./src/artifacts"
  },
  networks: {
    hardhat: {
    },
    rinkeby: {
      url: process.env["API_KEY"],
      accounts: [process.env["PRIVATE_KEY"]] 
    }
  },
};