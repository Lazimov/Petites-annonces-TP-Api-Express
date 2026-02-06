const express = require('express');
const router = express.Router();
const AnnonceController = require('../controllers/annonceController');
const { auth } = require('../middlewares/auth');
const { annonceRules } = require('../validators/validators');

/**
 * @swagger
 * components:
 *   schemas:
 *     Annonce:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *           format: float
 *         location:
 *           type: string
 *         status:
 *           type: string
 *           enum: [active, sold, archived]
 *         userId:
 *           type: integer
 *         categoryId:
 *           type: integer
 *         user:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *             username:
 *               type: string
 *         category:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *             name:
 *               type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     AnnonceRequest:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - price
 *       properties:
 *         title:
 *           type: string
 *           minLength: 5
 *           maxLength: 150
 *           example: iPhone 15 Pro - Très bon état
 *         description:
 *           type: string
 *           example: iPhone 15 Pro 256Go, couleur titane naturel. Acheté il y a 6 mois.
 *         price:
 *           type: number
 *           format: float
 *           minimum: 0
 *           example: 899.99
 *         location:
 *           type: string
 *           example: Paris 75011
 *         categoryId:
 *           type: integer
 *           example: 3
 *         status:
 *           type: string
 *           enum: [active, sold, archived]
 *           example: active
 */

/**
 * @swagger
 * tags:
 *   name: Annonces
 *   description: Gestion des petites annonces
 */

/**
 * @swagger
 * /api/annonces:
 *   get:
 *     summary: Récupérer toutes les annonces
 *     tags: [Annonces]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [active, sold, archived]
 *         description: Filtrer par statut
 *       - in: query
 *         name: categoryId
 *         schema:
 *           type: integer
 *         description: Filtrer par catégorie
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Rechercher dans le titre et la description
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         description: Prix minimum
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         description: Prix maximum
 *     responses:
 *       200:
 *         description: Liste des annonces
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 annonces:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Annonce'
 *       500:
 *         description: Erreur serveur
 */
router.get('/', AnnonceController.getAll);

/**
 * @swagger
 * /api/annonces/{id}:
 *   get:
 *     summary: Récupérer une annonce par son ID
 *     tags: [Annonces]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'annonce
 *     responses:
 *       200:
 *         description: Détail de l'annonce
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 annonce:
 *                   $ref: '#/components/schemas/Annonce'
 *       404:
 *         description: Annonce non trouvée
 *       500:
 *         description: Erreur serveur
 */
router.get('/:id', AnnonceController.getById);

/**
 * @swagger
 * /api/annonces:
 *   post:
 *     summary: Créer une nouvelle annonce
 *     tags: [Annonces]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AnnonceRequest'
 *     responses:
 *       201:
 *         description: Annonce créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 annonce:
 *                   $ref: '#/components/schemas/Annonce'
 *       400:
 *         description: Données invalides
 *       401:
 *         description: Non authentifié
 *       500:
 *         description: Erreur serveur
 */
router.post('/', auth, annonceRules, AnnonceController.create);

/**
 * @swagger
 * /api/annonces/{id}:
 *   put:
 *     summary: Modifier une annonce
 *     tags: [Annonces]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'annonce
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AnnonceRequest'
 *     responses:
 *       200:
 *         description: Annonce modifiée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 annonce:
 *                   $ref: '#/components/schemas/Annonce'
 *       400:
 *         description: Données invalides
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Non autorisé (pas le propriétaire)
 *       404:
 *         description: Annonce non trouvée
 *       500:
 *         description: Erreur serveur
 */
router.put('/:id', auth, annonceRules, AnnonceController.update);

/**
 * @swagger
 * /api/annonces/{id}:
 *   delete:
 *     summary: Supprimer une annonce
 *     tags: [Annonces]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'annonce
 *     responses:
 *       200:
 *         description: Annonce supprimée avec succès
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Non autorisé
 *       404:
 *         description: Annonce non trouvée
 *       500:
 *         description: Erreur serveur
 */
router.delete('/:id', auth, AnnonceController.delete);

module.exports = router;
