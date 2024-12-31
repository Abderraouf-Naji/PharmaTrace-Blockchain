const { ethers } = require("hardhat");

async function main() {
  // Déployer les contrats ou attacher les contrats déjà déployés
  const [deployer] = await ethers.getSigners();
  console.log("Deployer address:", deployer.address);

  // Adresses des contrats déployés
  const entityManagerAddress = "0x04ECa628cD888F479cb359aaA837A3BceC405f77";  
  const lotManagerAddress = "0x4D371154882a9E6C33439Ef86E15e671709c8867";        
  const supplyChainManagerAddress = "0x22140f78A75D374A29c4703cA2224fd059f185d2";  

  // Charger les contrats à partir de leurs adresses
  const EntityManager = await ethers.getContractFactory("EntityManager");
  const LotManager = await ethers.getContractFactory("LotManager");
  const SupplyChainManager = await ethers.getContractFactory("SupplyChainManager");

  const entityManager = EntityManager.attach(entityManagerAddress);
  const lotManager = LotManager.attach(lotManagerAddress);
  const supplyChainManager = SupplyChainManager.attach(supplyChainManagerAddress);

  // Vérification si l'adresse du deployer est un admin
  const role = await supplyChainManager.getEntityRole(deployer.address);
  console.log(`Rôle du deployer: ${role.toString()}`);

  if (role !== 1) {
    console.log("Le déployeur n'est pas un administrateur, tentons de l'enregistrer comme administrateur.");
    // Ajouter un administrateur (cette opération doit être réalisée par l'administrateur initial)
    await supplyChainManager.registerEntity("Admin Entity", "Admin", deployer.address); // Enregistrer comme Admin
    console.log(`Entité admin enregistrée : ${deployer.address}`);
  } else {
    console.log("Le déployeur est déjà un administrateur.");
  }

  // Ajouter un producteur
  const producerAddress = "0x0cf9d98845279aFa10462D585E85427b5Ec423b0"; 
  await supplyChainManager.registerEntity("PharmaTech", "Producer", producerAddress); // Enregistrer comme Producteur
  console.log(`Producteur enregistré : ${producerAddress}`);

  // Ajouter un distributeur
  const distributorAddress = "0x637593CC86b1535d627Fb6B57DEbaf7973203ca9"; 
  await supplyChainManager.registerEntity("Global Distributors", "Distributor", distributorAddress); // Enregistrer comme Distributeur
  console.log(`Distributeur enregistré : ${distributorAddress}`);

  // Création d'un lot par le producteur
  const lotId = "VAX2024";
  const productName = "Vaccin COVID-19";
  const manufacturingDate = Math.floor(new Date("2024-01-01").getTime() / 1000); 
  const qualityCertifications = "CE, ISO 9001";

  await supplyChainManager.createLot(lotId, productName, manufacturingDate, qualityCertifications);
  console.log(`Lot créé : ${lotId}`);

  // Transfert du lot du producteur au distributeur
  const status = "Shipped";
  await supplyChainManager.transferLot(lotId, distributorAddress, status);
  console.log(`Lot transféré à ${distributorAddress} avec statut ${status}`);

  // Consulter les informations sur le lot
  const lot = await supplyChainManager.getLot(lotId);
  console.log(`Lot consulté :`, lot);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
