// services/BatchService.js
const Batch = require('../models/Batch');

class BatchService {
  // Créer un nouveau lot
  async createBatch(data) {
    const batch = new Batch(data);
    return await batch.save();
  }

  // Récupérer tous les lots
  async getBatches() {
    return await Batch.find();
  }

  // Récupérer un lot par son ID
  async getBatchById(batchId) {
    return await Batch.findById(batchId);
  }

  // Mettre à jour un lot par son ID
  async updateBatch(batchId, data) {
    return await Batch.findByIdAndUpdate(batchId, data, { new: true });
  }

  // Supprimer un lot par son ID
  async deleteBatch(batchId) {
    return await Batch.findByIdAndDelete(batchId);
  }
}

module.exports = new BatchService();
