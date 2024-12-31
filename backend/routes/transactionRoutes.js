const express = require('express');
const {
  ajouterTransaction,
  obtenirTransactions,
  obtenirTransactionsParProduit
} = require('../controllers/transactionController');

const router = express.Router();

// Routes pour les transactions
router.post('/ajouter', ajouterTransaction);                      
router.get('/', obtenirTransactions);                             
router.get('/produit/:produitId', obtenirTransactionsParProduit);
module.exports = router;
