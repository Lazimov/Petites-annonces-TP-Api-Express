const { body, validationResult } = require('express-validator');

/**
 * Middleware pour gérer les erreurs de validation
 */
const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Données invalides',
      details: errors.array()
    });
  }
  next();
};

/**
 * Règles de validation pour l'inscription
 */
const signupRules = [
  body('username')
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage('Le nom d\'utilisateur doit contenir entre 3 et 50 caractères.')
    .isAlphanumeric('fr-FR', { ignore: '_-' })
    .withMessage('Le nom d\'utilisateur ne peut contenir que des lettres, chiffres, tirets et underscores.'),
  body('email')
    .trim()
    .isEmail()
    .withMessage('Adresse email invalide.')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Le mot de passe doit contenir au moins 6 caractères.'),
  handleValidation
];

/**
 * Règles de validation pour la connexion
 */
const loginRules = [
  body('email')
    .trim()
    .isEmail()
    .withMessage('Adresse email invalide.')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Le mot de passe est requis.'),
  handleValidation
];

/**
 * Règles de validation pour les annonces
 */
const annonceRules = [
  body('title')
    .trim()
    .isLength({ min: 5, max: 150 })
    .withMessage('Le titre doit contenir entre 5 et 150 caractères.'),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('La description est requise.'),
  body('price')
    .isFloat({ min: 0 })
    .withMessage('Le prix doit être un nombre positif.'),
  body('location')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('La localisation ne peut pas dépasser 100 caractères.'),
  body('categoryId')
    .optional()
    .isInt({ min: 1 })
    .withMessage('L\'identifiant de catégorie doit être un entier positif.'),
  body('status')
    .optional()
    .isIn(['active', 'sold', 'archived'])
    .withMessage('Le statut doit être : active, sold ou archived.'),
  handleValidation
];

/**
 * Règles de validation pour les catégories
 */
const categoryRules = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Le nom doit contenir entre 2 et 100 caractères.'),
  body('description')
    .optional()
    .trim(),
  handleValidation
];

module.exports = {
  signupRules,
  loginRules,
  annonceRules,
  categoryRules,
  handleValidation
};
