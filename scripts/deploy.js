require("dotenv").config(); // Charger les variables d'environnement depuis .env
const hre = require("hardhat");

async function main() {
    try {
        // Vérification de la disponibilité de la clé privée dans les variables d'environnement
        if (!process.env.PRIVATE_KEY) {
            console.error("Erreur : La clé privée est manquante dans les variables d'environnement.");
            process.exit(1);
        }

        // Afficher la clé privée dans la console (pour le debug, mais à supprimer en production)
        console.log("Clé privée:", process.env.PRIVATE_KEY); 

        // Récupérer le wallet à partir de la clé privée
        const wallet = new hre.ethers.Wallet(process.env.PRIVATE_KEY, hre.ethers.provider);
        console.log("Déploiement avec l'adresse :", wallet.address);

        // Déployer EntityManager
        console.log("Déploiement de EntityManager...");
        const EntityManager = await hre.ethers.getContractFactory("EntityManager", wallet);
        const entityManager = await EntityManager.deploy();
        console.log("En attente du déploiement de EntityManager...");
        await entityManager.deployed(); // S'assurer que le contrat est bien déployé
        console.log(`EntityManager déployé à l'adresse : ${entityManager.address}`);

        // Déployer LotManager avec l'adresse de EntityManager
        console.log("Déploiement de LotManager...");
        const LotManager = await hre.ethers.getContractFactory("LotManager", wallet);
        const lotManager = await LotManager.deploy(entityManager.address); // Passer l'adresse de EntityManager
        console.log("En attente du déploiement de LotManager...");
        await lotManager.deployed(); // S'assurer que le contrat est bien déployé
        console.log(`LotManager déployé à l'adresse : ${lotManager.address}`);

        // Déployer SupplyChainManager avec les adresses des contrats EntityManager et LotManager
        console.log("Déploiement de SupplyChainManager...");
        const SupplyChainManager = await hre.ethers.getContractFactory("SupplyChainManager", wallet);
        const supplyChainManager = await SupplyChainManager.deploy(entityManager.address, lotManager.address);
        console.log("En attente du déploiement de SupplyChainManager...");
        await supplyChainManager.deployed(); // S'assurer que le contrat est bien déployé
        console.log(`SupplyChainManager déployé à l'adresse : ${supplyChainManager.address}`);

        console.log("Tous les contrats ont été déployés avec succès.");
    } catch (error) {
        console.error("Une erreur est survenue pendant le déploiement :", error);
        process.exit(1); // Quitter avec un code d'erreur
    }
}

// Exécution du script
main()
    .then(() => process.exit(0)) // Sortir avec un code de succès
    .catch((error) => {
        console.error("Erreur dans le script principal :", error);
        process.exit(1); // Sortir avec un code d'erreur
    });


