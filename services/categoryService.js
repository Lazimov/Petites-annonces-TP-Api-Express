const { Category, Annonce } = require('../models');

class CategoryService {
  /**
   * Récupérer toutes les catégories
   */
  static async getAll() {
    return await Category.findAll({
      order: [['name', 'ASC']]
    });
  }

  /**
   * Récupérer une catégorie par ID (avec ses annonces)
   */
  static async getById(id) {
    const category = await Category.findByPk(id, {
      include: [{
        model: Annonce,
        as: 'annonces',
        where: { status: 'active' },
        required: false
      }]
    });
    if (!category) {
      throw { status: 404, message: 'Catégorie non trouvée.' };
    }
    return category;
  }

  /**
   * Créer une catégorie
   */
  static async create(data) {
    const existing = await Category.findOne({ where: { name: data.name } });
    if (existing) {
      throw { status: 400, message: 'Cette catégorie existe déjà.' };
    }
    return await Category.create(data);
  }

  /**
   * Mettre à jour une catégorie
   */
  static async update(id, data) {
    const category = await Category.findByPk(id);
    if (!category) {
      throw { status: 404, message: 'Catégorie non trouvée.' };
    }

    // Vérifier unicité du nom si modifié
    if (data.name && data.name !== category.name) {
      const existing = await Category.findOne({ where: { name: data.name } });
      if (existing) {
        throw { status: 400, message: 'Ce nom de catégorie est déjà utilisé.' };
      }
    }

    await category.update(data);
    return category;
  }

  /**
   * Supprimer une catégorie
   */
  static async delete(id) {
    const category = await Category.findByPk(id);
    if (!category) {
      throw { status: 404, message: 'Catégorie non trouvée.' };
    }
    await category.destroy();
    return { message: 'Catégorie supprimée avec succès.' };
  }
}

module.exports = CategoryService;
