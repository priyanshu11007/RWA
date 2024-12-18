async function main() {
  const { ethers } = require("hardhat");
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Get the contract factory for Lock.sol
  const Lock = await ethers.getContractFactory("Lock");

  // Get the current base fee from the latest block
  const block = await ethers.provider.getBlock("latest");
  const baseFee = block.baseFeePerGas; // baseFee is a BigNumber

  console.log("Current base fee:", ethers.formatUnits(baseFee, "gwei"));

  // Set max fee and priority fee (maxPriorityFeePerGas)
  const maxPriorityFeePerGas = ethers.parseUnits("2", "gwei"); // Example: 2 gwei as the tip
  const maxFeePerGas = baseFee.add(maxPriorityFeePerGas); // This should work now, as baseFee is a BigNumber

  console.log(
    "Setting maxFeePerGas:",
    ethers.formatUnits(maxFeePerGas, "gwei")
  );

  // Deploy the contract with the required arguments (name, symbol) and gas parameters
  const lockContract = await Lock.deploy("LockToken", "LOCK", {
    maxFeePerGas: maxFeePerGas,
    maxPriorityFeePerGas: maxPriorityFeePerGas,
  });

  // Wait for deployment to finish
  await lockContract.deployed();

  console.log("Lock contract deployed to:", lockContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
