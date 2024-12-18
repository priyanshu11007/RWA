const hre = require("hardhat");

async function main() {
  const contractAddress = process.env.CONTRACT_ADDRESS; // Add CONTRACT_ADDRESS to .env
  const RealEstateNFT = await hre.ethers.getContractAt(
    "RealEstateNFT",
    contractAddress
  );

  const recipient = "recipient_wallet_address"; // Replace with the recipient's wallet address
  const tokenURI = "ipfs://your_metadata_uri"; // Replace with your IPFS metadata URI

  const tx = await RealEstateNFT.mintProperty(recipient, tokenURI);
  await tx.wait();

  console.log(`NFT minted successfully! Transaction Hash: ${tx.hash}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
