const networkConfig = {
    11155111: {
        name: "sepolia",
        ethUsdPriceFeed: "0xefa298e63C7342AeCe99632C4701ab51746B6894"
    },
    // to deploy to ploygon
    137: {
        name: "polygon",
        ethUsdPriceFeed: "0xF9680D99D6C9589e2a93a78A04A279e509205945"
    }
}

const developmentChains = ["hardhat", "localhost"]
const decimals = 8
const INITIAL_ANSWER = 200000000000

module.exports ={ networkConfig, developmentChains, decimals, INITIAL_ANSWER}