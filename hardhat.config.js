require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config()
require("hardhat-gas-reporter")
require("solidity-coverage")
require("hardhat-deploy")
require("@nomiclabs/hardhat-ethers")

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.8",
};
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config()
require("hardhat-gas-reporter")
require("solidity-coverage")
// require("./tasks/block-number")


/** @type import('hardhat/config').HardhatUserConfig */

const RPC_URL = process.env.RPC_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY
const Etherscan_API_KEY = process.env.Etherscan_API_KEY
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    sepolia: {
      url: RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 11155111,
      api_key: Etherscan_API_KEY,
      blockConfirmation: 6,
    },
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337
    },
  },
  //solidity: "0.8.7",
  solidity:{
    compilers: [{version:"0.8.8"}, {version:"0.6.6"}],
  },
  Etherscan: {
    apiKey: Etherscan_API_KEY,
    private_key: PRIVATE_KEY,
 
  }, 
  gasReporter: {
    enabled: true,
    outputFile: "gas-report.txt",
   noColors: true,
   currency: "USD",
   coinmarketcap: COINMARKETCAP_API_KEY,
  //  token: "Matic",
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
    users: {
      default: 1,
    }
  }
};
