// services/SupplyChainService.js
const SupplyChain = require('../models/SupplyChain');

class SupplyChainService {
  // Ajouter une étape pour un lot spécifique
  async addSupplyChainStep(data) {
    const step = new SupplyChain(data);
    return await step.save();
  }

  // Récupérer toutes les étapes pour un lot spécifique
  async getSupplyChainSteps(batchId) {
    return await SupplyChain.find({ batchId });
  }

  // Supprimer une étape spécifique par son ID
  async deleteSupplyChainStep(stepId) {
    return await SupplyChain.findByIdAndDelete(stepId);
  }

  // Mettre à jour une étape de la chaîne logistique
  async updateSupplyChainStep(stepId, data) {
    return await SupplyChain.findByIdAndUpdate(stepId, data, { new: true });
  }
}

module.exports = new SupplyChainService();
