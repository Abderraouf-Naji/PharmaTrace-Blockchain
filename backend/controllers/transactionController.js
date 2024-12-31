const Transaction = require('../models/Transaction');
const Produit = require('../models/Produit');

exports.ajouterTransaction = async (req, res) => {
  try {
    const { produit, source, destination, detailsTransport } = req.body;

    const produitExiste = await Produit.findById(produit);
    if (!produitExiste) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }

    const transaction = new Transaction({
      produit,
      source,
      destination,
      detailsTransport
    });

    await transaction.save();
    res.status(201).json({ message: 'Transaction ajoutée avec succès', transaction });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l’ajout de la transaction', error });
  }
};

exports.obtenirTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().populate('produit');
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des transactions', error });
  }
};

exports.obtenirTransactionsParProduit = async (req, res) => {
  try {
    const transactions = await Transaction.find({ produit: req.params.produitId }).populate('produit');
    if (!transactions || transactions.length === 0) {
      return res.status(404).json({ message: 'Aucune transaction trouvée pour ce produit' });
    }
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des transactions', error });
  }
};
