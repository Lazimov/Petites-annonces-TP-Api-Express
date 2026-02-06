'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categories', [
      {
        name: 'Véhicules',
        description: 'Voitures, motos, vélos et autres véhicules',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Immobilier',
        description: 'Ventes et locations de biens immobiliers',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Électronique',
        description: 'Ordinateurs, téléphones, consoles et accessoires',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Mobilier',
        description: 'Meubles, décoration et équipement maison',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Vêtements',
        description: 'Mode, chaussures et accessoires',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Services',
        description: 'Cours, réparations et prestations diverses',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categories', null, {});
  }
};
