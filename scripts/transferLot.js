const { ethers } = require("hardhat");

async function main() {
  try {
    const contractAddress = "0x66CE7C72bF1E7e27280345C06D3D1e0c61FfBE01"; 
    const [deployer] = await ethers.getSigners(); 

    console.log("Deployer address:", deployer.address);

    // Charger le contrat à partir de l'adresse déployée
    const LotManager = await ethers.getContractFactory("LotManager");
    const lotManager = LotManager.attach(contractAddress);

    // Paramètres du transfert du lot
    const lotId = "LOT001"; // Identifiant du lot de vaccin
    const toAddress = "0x00000000000000000000000000000000004f7a0B";  
    const status = 0; // Utilisez un entier ou l'index de l'enum 'LotStatus' pour le statut

    // Estimation du gaz pour le transfert
    console.log("Estimation du gaz en cours...");
    const gasEstimate = await lotManager.estimateGas.transferLot(
      lotId,
      toAddress,
      status,
      100 // Quantité transférée
    );
    console.log("Estimation du gaz :", gasEstimate.toString());

    // Appel à la fonction transferLot pour effectuer le transfert
    console.log("Transfert en cours...");
    const tx = await lotManager.transferLot(
      lotId,
      toAddress,
      status,
      100, // Quantité transférée
      { gasLimit: gasEstimate } // Appliquer la limite de gaz estimée
    );
    console.log("Transaction en cours...", tx.hash);

    // Attendez que la transaction soit minée et récupérez le reçu
    const receipt = await tx.wait();
    console.log("Lot transféré avec succès !", receipt);
  } catch (error) {
    console.error("Erreur lors du transfert du lot:", error);
    process.exitCode = 1;
  }
}

main();
