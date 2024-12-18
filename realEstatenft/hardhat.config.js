require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.20", // Ensure this matches your Solidity version
  networks: {
    sepolia: {
      url: process.env.ALCHEMY_API_URL, // Use the Alchemy API URL from your .env file
      accounts: [`0x${process.env.PRIVATE_KEY}`], // Add the private key from your .env file
    },
  },
};
