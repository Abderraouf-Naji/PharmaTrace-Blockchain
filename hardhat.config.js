require("dotenv").config(); 
require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-chai-matchers");
require("@nomiclabs/hardhat-ethers");
const { ethers } = require("hardhat");



module.exports = {
    solidity: "0.8.27",
    networks: {
        hedera: {
            url: "https://testnet.hashio.io/api", 
            accounts: [`0x${process.env.PRIVATE_KEY}`], 
            chainId: 296,
        },
    },
};
