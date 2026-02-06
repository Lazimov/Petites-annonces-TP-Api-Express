const AnnonceService = require('../services/annonceService');

class AnnonceController {
  /**
   * GET /api/annonces
   */
  static async getAll(req, res) {
    try {
      const annonces = await AnnonceService.getAll(req.query);
      res.status(200).json({ annonces });
    } catch (error) {
      res.status(500).json({
        error: error.message || 'Erreur lors de la récupération des annonces.'
      });
    }
  }

  /**
   * GET /api/annonces/:id
   */
  static async getById(req, res) {
    try {
      const annonce = await AnnonceService.getById(req.params.id);
      res.status(200).json({ annonce });
    } catch (error) {
      const status = error.status || 500;
      res.status(status).json({
        error: error.message || 'Erreur lors de la récupération de l\'annonce.'
      });
    }
  }

  /**
   * POST /api/annonces
   */
  static async create(req, res) {
    try {
      const annonce = await AnnonceService.create(req.body, req.user.id);
      res.status(201).json({
        message: 'Annonce créée avec succès.',
        annonce
      });
    } catch (error) {
      const status = error.status || 500;
      res.status(status).json({
        error: error.message || 'Erreur lors de la création de l\'annonce.'
      });
    }
  }

  /**
   * PUT /api/annonces/:id
   */
  static async update(req, res) {
    try {
      const annonce = await AnnonceService.update(req.params.id, req.body, req.user.id);
      res.status(200).json({
        message: 'Annonce modifiée avec succès.',
        annonce
      });
    } catch (error) {
      const status = error.status || 500;
      res.status(status).json({
        error: error.message || 'Erreur lors de la modification de l\'annonce.'
      });
    }
  }

  /**
   * DELETE /api/annonces/:id
   */
  static async delete(req, res) {
    try {
      const result = await AnnonceService.delete(req.params.id, req.user.id, req.user.role);
      res.status(200).json(result);
    } catch (error) {
      const status = error.status || 500;
      res.status(status).json({
        error: error.message || 'Erreur lors de la suppression de l\'annonce.'
      });
    }
  }
}

module.exports = AnnonceController;
