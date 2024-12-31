const mongoose = require('mongoose');

const produitSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  codeLot: { type: String, unique: true, required: true },
  dateFabrication: { type: Date, required: true },
  dateExpiration: { type: Date, required: true },
  fabricant: { type: String, required: true },
  statut: { type: String, enum: ['en_fabrication', 'en_transit', 'livré'], default: 'en_fabrication' },
   codeLot: { type: String, required: true } 
});

module.exports = mongoose.model('Produit', produitSchema);
