// const { network } = require("hardhat")
// const {networkConfig, developmentChains} = require("../helper-hardhat-config")
// const { verify } = require("../utils/Verify")








// module.export = async ({getNamedAccounts, deployments}) => {
//     const {deploy, log} = deployments
//     const {deployer} = await getNamedAccounts()
//      const chainId = network.config.chainId


//     // if chainId is x use address y
//     // if chainid is y use address x

//    // const ethUsdPriceFeedAddress = networkConfig[chainId["ethUsdPriceFeed"]]
    
   

//    let ethUsdPriceFeedAddress
//    if (developmentChains.includes(network.name)) {
//     const ethUsdAggregator = await deployments.get("MockV3Aggregator")
//     ethUsdPriceFeedAddress =  ethUsdAggregator.address
    
//    } else {
//     ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
//    }

//     // how to test locally(we create mock contracts)


//     // well what happens when we want to change chains
//     // when going for a local host or hardhat we want to use a mock

//     // to use the deploy function

//     args = ethUsdPriceFeedAddress
//     const fundMe = await deploy("FundMe", {
//         from: deployer,
//         args: args,
//         log: true,
//         waitConfirmations: network.config.blockConfirmations || 1
//     })


//     if (!developmentChains.includes(network.name) && process.env.Etherscan_API_KEY) {
        
//     } {
//         await verify(fundMe.address, args)
//     }

//     log("-----------------------------------------------------------------------------")
    
// }

// //module.exports.tags = ["all", "fundme"] 



const { network } = require("hardhat")
const { networkConfig, developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/Verify")
require("dotenv").config()

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    let ethUsdPriceFeedAddress
    if (chainId == 31337) {
        const ethUsdAggregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddress = ethUsdAggregator.address
    } else {
        ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    }
    log("----------------------------------------------------")
    log("Deploying FundMe and waiting for confirmations...")
    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: [ethUsdPriceFeedAddress],
        log: true,
        // we need to wait if on a live network so we can verify properly
        waitConfirmations: network.config.blockConfirmations || 1,
    })
    log(`FundMe deployed at ${fundMe.address}`)

    if (
        !developmentChains.includes(network.name) &&
        process.env.Etherscan_API_KEY
    ) {
        await verify(fundMe.address, [ethUsdPriceFeedAddress])
    }
}

module.exports.tags = ["all", "fundme"]