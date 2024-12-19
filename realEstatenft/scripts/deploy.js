async function main() {
  const { ethers } = require("hardhat");
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Get the contract factory for Lock.sol
  const Lock = await ethers.getContractFactory("Lock");

  // Get the current base fee from the latest block
  const block = await ethers.provider.getBlock("latest");
  const baseFee = block.baseFeePerGas; // baseFee is a BigInt

  if (!baseFee) {
    throw new Error(
      "baseFeePerGas is undefined. Ensure you're connected to an EIP-1559-compatible network."
    );
  }

  console.log("Current base fee:", ethers.formatUnits(baseFee, "gwei"));

  // Convert baseFee (BigInt) and calculate max fees
  const maxPriorityFeePerGas = ethers.parseUnits("2", "gwei"); // Example: 2 gwei as the tip
  const maxFeePerGas = baseFee + BigInt(maxPriorityFeePerGas.toString()); // Add baseFee and maxPriorityFeePerGas

  console.log(
    "Setting maxPriorityFeePerGas:",
    ethers.formatUnits(maxPriorityFeePerGas, "gwei")
  );
  console.log(
    "Setting maxFeePerGas:",
    ethers.formatUnits(maxFeePerGas, "gwei")
  );

  // Deploy the contract with the required arguments and gas parameters
  const lockContract = await Lock.deploy("LockToken", "LOCK", {
    maxFeePerGas,
    maxPriorityFeePerGas,
  });

  console.log("Awaiting deployment...");
  // Wait for deployment to finish
  await lockContract.waitForDeployment();

  console.log("Lock contract deployed to:", lockContract.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error during contract deployment:", error);
    process.exit(1);
  });
