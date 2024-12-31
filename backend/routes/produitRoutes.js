const express = require('express');
const {
  ajouterProduit,
  obtenirProduits,
  obtenirProduitParId,
  supprimerProduit
} = require('../controllers/produitController');

const router = express.Router();

// Routes CRUD pour les produits
router.post('/ajouter', ajouterProduit);           // Ajouter un produit
router.get('/', obtenirProduits);                 // Obtenir tous les produits
router.get('/:id', obtenirProduitParId);          // Obtenir un produit par ID
router.delete('/:id', supprimerProduit);          // Supprimer un produit

module.exports = router;
