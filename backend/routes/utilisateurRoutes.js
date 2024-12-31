const express = require('express');
const {
  inscription,
  connexion,
  obtenirUtilisateurs
} = require('../controllers/utilisateurController');

const router = express.Router();

// Routes pour les utilisateurs
router.post('/inscription', inscription);  
router.post('/connexion', connexion);      
router.get('/', obtenirUtilisateurs);      

module.exports = router;
