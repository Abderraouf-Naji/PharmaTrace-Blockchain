const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const utilisateurSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  motDePasse: { type: String, required: true },
  role: { type: String, enum: ['admin', 'acteur', 'utilisateur'], default: 'utilisateur' }
});

// Hash password before saving
utilisateurSchema.pre('save', async function (next) {
  if (!this.isModified('motDePasse')) return next();
  const salt = await bcrypt.genSalt(10);
  this.motDePasse = await bcrypt.hash(this.motDePasse, salt);
  next();
});

module.exports = mongoose.model('Utilisateur', utilisateurSchema);
