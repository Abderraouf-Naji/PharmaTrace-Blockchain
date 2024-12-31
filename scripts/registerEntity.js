const { ethers } = require("hardhat");

async function main() {
    // Récupération de l'adresse du compte à utiliser pour les transactions
    const [deployer] = await ethers.getSigners();

    console.log("Déploiement de l'entité par :", deployer.address);

    // Adresses des contrats déployés
    const entityManagerAddress = "0xD9e7e534bc6C22150286090a1F486B5766a5187A"; 
    const entityManager = await ethers.getContractAt("EntityManager", entityManagerAddress);

    // Listes des entités à enregistrer
    const entities = [
        { name: "FabriTech", role: "Manufacturer", entityAddress: "0x0cf9d98845279afa10462d585e85427b5ec423b0" },
        { name: "MediCure Labs", role: "Manufacturer", entityAddress: "0x00000000000000000000000000000000004EF193" },
        { name: "BioPharm Co.", role: "Manufacturer", entityAddress: "0x1F4A92E9D432A5cD8c61E10C036012139d1E7983" },
        { name: "Distrib Pharma", role: "Distributor", entityAddress: "0x00000000000000000000000000000000004eF169" },
        { name: "Medi Distribution", role: "Distributor", entityAddress: "0x00000000000000000000000000000000004ef176" },
        { name: "Global Med Distributors", role: "Distributor", entityAddress: "0xC31B6CDCDfAbc25882d21d83016A940A2C97a2E6" },
        { name: "GammartPharma", role: "Pharmacy", entityAddress: "0x00000000000000000000000000000000004f7a0b" },
        { name: "SfaxPharma", role: "Pharmacy", entityAddress: "0xe670c350d4c08721b2ee83dd84b73b71b7ad2a85" },
        { name: "ParaPharma.", role: "Pharmacy", entityAddress: "0x00000000000000000000000000000000004f788b" }
    ];

    // Insérer toutes les entités en même temps
    for (let entity of entities) {
        // Map the string role to the correct Role enum value
        let roleEnum;
        if (entity.role === "Manufacturer") {
            roleEnum = 1;  // Role.Manufacturer
        } else if (entity.role === "Distributor") {
            roleEnum = 2;  // Role.Distributor
        } else if (entity.role === "Pharmacy") {
            roleEnum = 3;  // Role.Pharmacy
        } else {
            console.error(`Role inconnu pour ${entity.name}`);
            continue;
        }

        // Vérification si l'adresse de l'entité est valide
        if (!ethers.utils.isAddress(entity.entityAddress)) {
            console.error(`L'adresse de l'entité ${entity.name} n'est pas valide.`);
            continue; // Passer à la prochaine entité
        }

        // Appel de la fonction pour enregistrer une entité
        const tx = await entityManager.registerEntity(entity.name, roleEnum, entity.entityAddress);
        console.log(`Transaction envoyée pour ${entity.name}:`, tx.hash);

        // Attendre la confirmation de la transaction
        await tx.wait();
        console.log(`Entité ${entity.name} enregistrée avec succès !`);
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
