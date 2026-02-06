const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

// Import des modèles
const User = require('./User');
const Category = require('./Category');
const Annonce = require('./Annonce');

// ============ ASSOCIATIONS ============

// User 1-N Annonces
User.hasMany(Annonce, {
  foreignKey: 'userId',
  as: 'annonces',
  onDelete: 'CASCADE'
});
Annonce.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
});

// Category 1-N Annonces
Category.hasMany(Annonce, {
  foreignKey: 'categoryId',
  as: 'annonces',
  onDelete: 'SET NULL'
});
Annonce.belongsTo(Category, {
  foreignKey: 'categoryId',
  as: 'category'
});

module.exports = {
  sequelize,
  User,
  Category,
  Annonce
};
