const CategoryService = require('../services/categoryService');

class CategoryController {
  /**
   * GET /api/categories
   */
  static async getAll(req, res) {
    try {
      const categories = await CategoryService.getAll();
      res.status(200).json({ categories });
    } catch (error) {
      res.status(500).json({
        error: error.message || 'Erreur lors de la récupération des catégories.'
      });
    }
  }

  /**
   * GET /api/categories/:id
   */
  static async getById(req, res) {
    try {
      const category = await CategoryService.getById(req.params.id);
      res.status(200).json({ category });
    } catch (error) {
      const status = error.status || 500;
      res.status(status).json({
        error: error.message || 'Erreur lors de la récupération de la catégorie.'
      });
    }
  }

  /**
   * POST /api/categories
   */
  static async create(req, res) {
    try {
      const category = await CategoryService.create(req.body);
      res.status(201).json({
        message: 'Catégorie créée avec succès.',
        category
      });
    } catch (error) {
      const status = error.status || 500;
      res.status(status).json({
        error: error.message || 'Erreur lors de la création de la catégorie.'
      });
    }
  }

  /**
   * PUT /api/categories/:id
   */
  static async update(req, res) {
    try {
      const category = await CategoryService.update(req.params.id, req.body);
      res.status(200).json({
        message: 'Catégorie modifiée avec succès.',
        category
      });
    } catch (error) {
      const status = error.status || 500;
      res.status(status).json({
        error: error.message || 'Erreur lors de la modification de la catégorie.'
      });
    }
  }

  /**
   * DELETE /api/categories/:id
   */
  static async delete(req, res) {
    try {
      const result = await CategoryService.delete(req.params.id);
      res.status(200).json(result);
    } catch (error) {
      const status = error.status || 500;
      res.status(status).json({
        error: error.message || 'Erreur lors de la suppression de la catégorie.'
      });
    }
  }
}

module.exports = CategoryController;
