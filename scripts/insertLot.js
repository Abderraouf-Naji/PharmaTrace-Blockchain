const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
    // Obtenir l'adresse de l'EntityManager à partir de la variable d'environnement
    const entityManagerAddress = process.env.ENTITY_MANAGER_ADDRESS;

    if (!entityManagerAddress) {
        console.error("ENTITY_MANAGER_ADDRESS is not set");
        process.exit(1);
    }

    console.log("EntityManager address:", entityManagerAddress);

    // Adresse du contrat LotManager (à mettre à jour après le déploiement si nécessaire)
    const lotManagerAddress = "0x66CE7C72bF1E7e27280345C06D3D1e0c61FfBE01";

    // Obtenir le déployeur depuis les comptes configurés dans Hardhat
    const [deployer] = await ethers.getSigners();

    console.log("Deployer address:", deployer.address);

    // Charger le contrat LotManager avec son ABI et son adresse
    const LotManager = await ethers.getContractFactory("LotManager");
    const lotManager = LotManager.attach(lotManagerAddress);

    // Définir les lots
    const lots = [
    {
        lotId: "LOT001",
        productName: "Paracetamol",
        manufacturingDate: Math.floor(Date.now() / 1000) - 86400 * 10, // 10 jours en arrière
        expirationDate: Math.floor(Date.now() / 1000) + 31536000, // 1 an plus tard
        qualityCertifications: "ISO9001",
        qrCode: "QR001",
        quantity: 5000,
        components: ["Paracetamol", "Starch", "Silicon Dioxide"],
    },
    {
        lotId: "LOT002",
        productName: "Ibuprofen",
        manufacturingDate: Math.floor(Date.now() / 1000) - 86400 * 15,
        expirationDate: Math.floor(Date.now() / 1000) + 31536000 + 86400 * 5,
        qualityCertifications: "ISO9002",
        qrCode: "QR002",
        quantity: 3000,
        components: ["Ibuprofen", "Microcrystalline Cellulose", "Magnesium Stearate"],
    },
    {
        lotId: "LOT003",
        productName: "Aspirin",
        manufacturingDate: Math.floor(Date.now() / 1000) - 86400 * 20,
        expirationDate: Math.floor(Date.now() / 1000) + 31536000 + 86400 * 10,
        qualityCertifications: "ISO14001",
        qrCode: "QR003",
        quantity: 2500,
        components: ["Aspirin", "Corn Starch", "Hydroxypropyl Cellulose"],
    },
    {
        lotId: "LOT004",
        productName: "Amoxicillin",
        manufacturingDate: Math.floor(Date.now() / 1000) - 86400 * 25,
        expirationDate: Math.floor(Date.now() / 1000) + 31536000 + 86400 * 15,
        qualityCertifications: "ISO22000",
        qrCode: "QR004",
        quantity: 4000,
        components: ["Amoxicillin", "Talc", "Sodium Starch Glycolate"],
    },
    {
        lotId: "LOT005",
        productName: "Ciprofloxacin",
        manufacturingDate: Math.floor(Date.now() / 1000) - 86400 * 30,
        expirationDate: Math.floor(Date.now() / 1000) + 31536000 + 86400 * 20,
        qualityCertifications: "ISO13485",
        qrCode: "QR005",
        quantity: 4500,
        components: ["Ciprofloxacin", "Hydroxypropyl Methylcellulose", "Magnesium Stearate"],
    },
    {
        lotId: "LOT006",
        productName: "Metformin",
        manufacturingDate: Math.floor(Date.now() / 1000) - 86400 * 35,
        expirationDate: Math.floor(Date.now() / 1000) + 31536000 + 86400 * 25,
        qualityCertifications: "ISO45001",
        qrCode: "QR006",
        quantity: 6000,
        components: ["Metformin", "Povidone", "Sodium Stearyl Fumarate"],
    },
    {
        lotId: "LOT007",
        productName: "Lisinopril",
        manufacturingDate: Math.floor(Date.now() / 1000) - 86400 * 40,
        expirationDate: Math.floor(Date.now() / 1000) + 31536000 + 86400 * 30,
        qualityCertifications: "ISO50001",
        qrCode: "QR007",
        quantity: 2000,
        components: ["Lisinopril", "Mannitol", "Crospovidone"],
    },
    {
        lotId: "LOT008",
        productName: "Atorvastatin",
        manufacturingDate: Math.floor(Date.now() / 1000) - 86400 * 45,
        expirationDate: Math.floor(Date.now() / 1000) + 31536000 + 86400 * 35,
        qualityCertifications: "ISO9003",
        qrCode: "QR008",
        quantity: 5000,
        components: ["Atorvastatin", "Lactose Monohydrate", "Microcrystalline Cellulose"],
    },
    {
        lotId: "LOT009",
        productName: "Simvastatin",
        manufacturingDate: Math.floor(Date.now() / 1000) - 86400 * 50,
        expirationDate: Math.floor(Date.now() / 1000) + 31536000 + 86400 * 40,
        qualityCertifications: "ISO22001",
        qrCode: "QR009",
        quantity: 5500,
        components: ["Simvastatin", "Croscarmellose Sodium", "Talc"],
    },
    {
        lotId: "LOT010",
        productName: "Losartan",
        manufacturingDate: Math.floor(Date.now() / 1000) - 86400 * 55,
        expirationDate: Math.floor(Date.now() / 1000) + 31536000 + 86400 * 45,
        qualityCertifications: "ISO14002",
        qrCode: "QR010",
        quantity: 4500,
        components: ["Losartan", "Pregelatinized Starch", "Magnesium Stearate"],
    },
    {
        lotId: "LOT011",
        productName: "Clopidogrel",
        manufacturingDate: Math.floor(Date.now() / 1000) - 86400 * 60,
        expirationDate: Math.floor(Date.now() / 1000) + 31536000 + 86400 * 50,
        qualityCertifications: "ISO13486",
        qrCode: "QR011",
        quantity: 3000,
        components: ["Clopidogrel", "Silicon Dioxide", "Hydroxypropyl Cellulose"],
    },
    {
        lotId: "LOT012",
        productName: "Hydrochlorothiazide",
        manufacturingDate: Math.floor(Date.now() / 1000) - 86400 * 65,
        expirationDate: Math.floor(Date.now() / 1000) + 31536000 + 86400 * 55,
        qualityCertifications: "ISO45002",
        qrCode: "QR012",
        quantity: 4000,
        components: ["Hydrochlorothiazide", "Microcrystalline Cellulose", "Talc"],
    },
    {
        lotId: "LOT013",
        productName: "Spironolactone",
        manufacturingDate: Math.floor(Date.now() / 1000) - 86400 * 70,
        expirationDate: Math.floor(Date.now() / 1000) + 31536000 + 86400 * 60,
        qualityCertifications: "ISO50002",
        qrCode: "QR013",
        quantity: 3500,
        components: ["Spironolactone", "Magnesium Stearate", "Silicon Dioxide"],
    },
    {
        lotId: "LOT014",
        productName: "Omeprazole",
        manufacturingDate: Math.floor(Date.now() / 1000) - 86400 * 75,
        expirationDate: Math.floor(Date.now() / 1000) + 31536000 + 86400 * 65,
        qualityCertifications: "ISO9004",
        qrCode: "QR014",
        quantity: 2500,
        components: ["Omeprazole", "Lactose Monohydrate", "Hydroxypropyl Cellulose"],
    },
    {
        lotId: "LOT015",
        productName: "Pantoprazole",
        manufacturingDate: Math.floor(Date.now() / 1000) - 86400 * 80,
        expirationDate: Math.floor(Date.now() / 1000) + 31536000 + 86400 * 70,
        qualityCertifications: "ISO22002",
        qrCode: "QR015",
        quantity: 3000,
        components: ["Pantoprazole", "Corn Starch", "Silicon Dioxide"],
    },
];

    // Création de chaque lot dans une boucle
    for (const lot of lots) {
        try {
            console.log(`Creating lot with lotId: ${lot.lotId}`);
            const tx = await lotManager.createLot(
                lot.lotId,
                lot.productName,
                lot.manufacturingDate,
                lot.expirationDate,
                lot.qualityCertifications,
                deployer.address,
                lot.qrCode,
                lot.quantity,
                lot.components,
                { gasLimit: 500000 }
            );
            console.log("Transaction sent, waiting for confirmation...");
            await tx.wait(); // Attente de la confirmation de la transaction
            console.log("Lot created successfully:", lot.lotId);
        } catch (error) {
            console.error(`Error creating lot ${lot.lotId}:`, error);
        }
    }
}

// Appel de la fonction principale et gestion des erreurs globales
main().catch((error) => {
    console.error("An error occurred in the script:", error);
    process.exitCode = 1;
});
