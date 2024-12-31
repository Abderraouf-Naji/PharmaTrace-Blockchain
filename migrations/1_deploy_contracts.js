const EntityManager = artifacts.require("EntityManager");
const LotManager = artifacts.require("LotManager");
const SupplyChainManager = artifacts.require("SupplyChainManager");

module.exports = async function (deployer) {
    try {
        // Déployer le contrat EntityManager
        await deployer.deploy(EntityManager);
        const entityManagerInstance = await EntityManager.deployed();
        console.log("EntityManager déployé à l'adresse :", entityManagerInstance.address);

        // Déployer le contrat LotManager
        await deployer.deploy(LotManager);
        const lotManagerInstance = await LotManager.deployed();
        console.log("LotManager déployé à l'adresse :", lotManagerInstance.address);

        // Déployer le contrat SupplyChainManager avec les adresses des autres contrats
        await deployer.deploy(
            SupplyChainManager,
            entityManagerInstance.address,
            lotManagerInstance.address
        );
        const supplyChainManagerInstance = await SupplyChainManager.deployed();
        console.log("SupplyChainManager déployé à l'adresse :", supplyChainManagerInstance.address);
    } catch (error) {
        console.error("Erreur lors du déploiement :", error);
    }
};
