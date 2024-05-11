const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const NFTContractModule = buildModule("NFTContractModule", (m) => {
  // If your contract requires constructor arguments, they can be defined here
  const nftContract = m.contract("NFTContractFactory", []);

  return { nftContract };
});

module.exports = NFTContractModule;
