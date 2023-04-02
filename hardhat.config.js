/** @type import('hardhat/config').HardhatUserConfig */
require('dotenv').config();
require("@nomiclabs/hardhat-ethers"); 

console.log(process.env.GOERLI_PRIVATE);

module.exports = {
   solidity: "0.8.9",
   defaultNetwork: "goerli",
   networks: {
      hardhat: {},
      goerli: {
         url: `https://eth-goerli.g.alchemy.com/v2/${process.env.ALCHEMY_KEY_GOERLI}`,
         accounts: [`0x${process.env.GOERLI_PRIVATE}`]
      },
      ethereum: {
         url: `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_KEY_MAINNET}`,
         accounts: [`0x${process.env.ETHEREUM_PRIVATE}`]
      }
   },
}
 