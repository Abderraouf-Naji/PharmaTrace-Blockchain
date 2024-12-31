const Produit = require('../models/Produit');

exports.ajouterProduit = async (req, res) => {
  try {
    const { nom, codeLot, dateFabrication, dateExpiration, fabricant, statut } = req.body;

    const produitExiste = await Produit.findOne({ codeLot });
    if (produitExiste) {
      return res.status(400).json({ message: 'Un produit avec ce code de lot existe déjà.' });
    }

    const produit = new Produit({
      nom,
      codeLot,
      dateFabrication,
      dateExpiration,
      fabricant,
      statut
    });

    await produit.save();
    res.status(201).json({ message: 'Produit ajouté avec succès', produit });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l’ajout du produit', error });
  }
};

exports.obtenirProduits = async (req, res) => {
  try {
    const produits = await Produit.find();
    res.status(200).json(produits);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des produits', error });
  }
};

exports.obtenirProduitParId = async (req, res) => {
  try {
    const produit = await Produit.findById(req.params.id);
    if (!produit) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }
    res.status(200).json(produit);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération du produit', error });
  }
};

exports.supprimerProduit = async (req, res) => {
  try {
    const produit = await Produit.findByIdAndDelete(req.params.id);
    if (!produit) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }
    res.status(200).json({ message: 'Produit supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression du produit', error });
  }
};
