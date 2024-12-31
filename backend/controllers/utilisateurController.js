const Utilisateur = require('../models/Utilisateur');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.inscription = async (req, res) => {
  try {
    const { nom, email, motDePasse, role } = req.body;

    const utilisateurExiste = await Utilisateur.findOne({ email });
    if (utilisateurExiste) {
      return res.status(400).json({ message: 'Un utilisateur avec cet email existe déjà.' });
    }

    const utilisateur = new Utilisateur({
      nom,
      email,
      motDePasse,
      role
    });

    await utilisateur.save();
    res.status(201).json({ message: 'Utilisateur créé avec succès', utilisateur });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de l’utilisateur', error });
  }
};

exports.connexion = async (req, res) => {
  try {
    const { email, motDePasse } = req.body;

    const utilisateur = await Utilisateur.findOne({ email });
    if (!utilisateur) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    const motDePasseValide = await bcrypt.compare(motDePasse, utilisateur.motDePasse);
    if (!motDePasseValide) {
      return res.status(400).json({ message: 'Mot de passe incorrect' });
    }

    const token = jwt.sign({ id: utilisateur._id, role: utilisateur.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({ message: 'Connexion réussie', token, utilisateur });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la connexion', error });
  }
};

exports.obtenirUtilisateurs = async (req, res) => {
  try {
    const utilisateurs = await Utilisateur.find();
    res.status(200).json(utilisateurs);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs', error });
  }
};
