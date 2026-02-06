const { Annonce, User, Category } = require('../models');
const { Op } = require('sequelize');

class AnnonceService {
  /**
   * Récupérer toutes les annonces (avec filtres optionnels)
   */
  static async getAll(query = {}) {
    const where = {};

    // Filtres optionnels
    if (query.status) where.status = query.status;
    if (query.categoryId) where.categoryId = query.categoryId;
    if (query.userId) where.userId = query.userId;
    if (query.search) {
      where[Op.or] = [
        { title: { [Op.like]: `%${query.search}%` } },
        { description: { [Op.like]: `%${query.search}%` } }
      ];
    }
    if (query.minPrice) where.price = { ...where.price, [Op.gte]: query.minPrice };
    if (query.maxPrice) where.price = { ...where.price, [Op.lte]: query.maxPrice };

    const annonces = await Annonce.findAll({
      where,
      include: [
        { model: User, as: 'user', attributes: ['id', 'username'] },
        { model: Category, as: 'category', attributes: ['id', 'name'] }
      ],
      order: [['createdAt', 'DESC']]
    });

    return annonces;
  }

  /**
   * Récupérer une annonce par ID
   */
  static async getById(id) {
    const annonce = await Annonce.findByPk(id, {
      include: [
        { model: User, as: 'user', attributes: ['id', 'username', 'email'] },
        { model: Category, as: 'category', attributes: ['id', 'name'] }
      ]
    });
    if (!annonce) {
      throw { status: 404, message: 'Annonce non trouvée.' };
    }
    return annonce;
  }

  /**
   * Créer une annonce
   */
  static async create(data, userId) {
    // Vérifier que la catégorie existe si fournie
    if (data.categoryId) {
      const category = await Category.findByPk(data.categoryId);
      if (!category) {
        throw { status: 400, message: 'Catégorie invalide.' };
      }
    }

    const annonce = await Annonce.create({
      ...data,
      userId
    });

    return this.getById(annonce.id);
  }

  /**
   * Mettre à jour une annonce
   */
  static async update(id, data, userId) {
    const annonce = await Annonce.findByPk(id);
    if (!annonce) {
      throw { status: 404, message: 'Annonce non trouvée.' };
    }

    // Vérifier que l'utilisateur est le propriétaire
    if (annonce.userId !== userId) {
      throw { status: 403, message: 'Vous ne pouvez modifier que vos propres annonces.' };
    }

    // Vérifier la catégorie si modifiée
    if (data.categoryId) {
      const category = await Category.findByPk(data.categoryId);
      if (!category) {
        throw { status: 400, message: 'Catégorie invalide.' };
      }
    }

    await annonce.update(data);
    return this.getById(annonce.id);
  }

  /**
   * Supprimer une annonce
   */
  static async delete(id, userId, userRole) {
    const annonce = await Annonce.findByPk(id);
    if (!annonce) {
      throw { status: 404, message: 'Annonce non trouvée.' };
    }

    // Seul le propriétaire ou un admin peut supprimer
    if (annonce.userId !== userId && userRole !== 'admin') {
      throw { status: 403, message: 'Vous ne pouvez supprimer que vos propres annonces.' };
    }

    await annonce.destroy();
    return { message: 'Annonce supprimée avec succès.' };
  }
}

module.exports = AnnonceService;
