//generating the wallet private key
const { ethers } = require("ethers");

// Create a random wallet
const wallet = ethers.Wallet.createRandom();

// Get the private key
console.log(wallet.privateKey); // This is your private key
