const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  produit: { type: mongoose.Schema.Types.ObjectId, ref: 'Produit', required: true },
  acteur: { type: String, required: true },
  date: { type: Date, required: true },
  details: { type: String, required: true },
  source: { type: String, required: true },       // Source est requis
  destination: { type: String, required: true }  // Destination est requise
});

module.exports = mongoose.model('Transaction', transactionSchema);
