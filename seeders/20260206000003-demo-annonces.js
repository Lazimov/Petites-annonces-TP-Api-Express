'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('annonces', [
      {
        title: 'iPhone 14 Pro - Excellent état',
        description: 'iPhone 14 Pro 256Go, couleur noir sidéral. Acheté en 2023, toujours sous garantie. Livré avec boîte et accessoires.',
        price: 750.00,
        location: 'Paris 75011',
        status: 'active',
        userId: 2,
        categoryId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Canapé 3 places cuir marron',
        description: 'Canapé en cuir véritable, couleur marron. Très bon état, quelques traces d\'usure normales. Dimensions : 220x90x85cm.',
        price: 350.00,
        location: 'Lyon 69003',
        status: 'active',
        userId: 2,
        categoryId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Vélo électrique Decathlon B\'Twin',
        description: 'Vélo électrique en très bon état, batterie neuve, autonomie 60km. Idéal pour les trajets quotidiens.',
        price: 800.00,
        location: 'Marseille 13008',
        status: 'active',
        userId: 3,
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Cours de guitare - Débutant/Intermédiaire',
        description: 'Professeur diplômé propose des cours de guitare à domicile. Acoustique et électrique. 15 ans d\'expérience.',
        price: 30.00,
        location: 'Toulouse 31000',
        status: 'active',
        userId: 3,
        categoryId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'PS5 + 2 manettes + 5 jeux',
        description: 'Pack PlayStation 5 édition standard avec 2 manettes DualSense et 5 jeux (Spider-Man 2, God of War, etc.). Parfait état.',
        price: 450.00,
        location: 'Bordeaux 33000',
        status: 'sold',
        userId: 2,
        categoryId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('annonces', null, {});
  }
};
