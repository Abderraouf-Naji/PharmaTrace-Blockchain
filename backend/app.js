require('dotenv').config(); // Charge les variables d'environnement
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

// Import des routes
const produitRoutes = require('./routes/produitRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const utilisateurRoutes = require('./routes/utilisateurRoutes');

// Initialisation de l'application
const app = express();

// Connexion à MongoDB
connectDB();

// Middleware
app.use(cors());                         
app.use(bodyParser.json());              
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/produits', produitRoutes);       // Routes pour les produits
app.use('/api/transactions', transactionRoutes); // Routes pour les transactions
app.use('/api/utilisateurs', utilisateurRoutes); // Routes pour les utilisateurs

// Route par défaut (404)
app.use((req, res) => {
  res.status(404).json({ message: 'Route non trouvée' });
});

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur en écoute sur le port ${PORT}`);
});
