const express = require('express');
const cors = require('cors');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();

// Import config
const sequelize = require('./config/database');
const swaggerSpec = require('./config/swagger');

// Import des modèles (charge les associations)
require('./models');

// Import des routes
const authRoutes = require('./routes/auth');
const annonceRoutes = require('./routes/annonces');
const categoryRoutes = require('./routes/categories');

// Initialisation de l'app
const app = express();
const PORT = process.env.PORT || 3000;

// ============ MIDDLEWARES ============

// CORS
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Parser JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Fichiers statiques (pour le front-end)
app.use(express.static(path.join(__dirname, 'public')));

// ============ ROUTES ============

// Documentation Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Petites Annonces - API Documentation'
}));

// Routes API
app.use('/api/auth', authRoutes);
app.use('/api/annonces', annonceRoutes);
app.use('/api/categories', categoryRoutes);

// Route racine
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route 404
app.use((req, res) => {
  res.status(404).json({ error: 'Route non trouvée.' });
});

// Gestion globale des erreurs
app.use((err, req, res, next) => {
  console.error('Erreur:', err);
  res.status(500).json({ error: 'Erreur interne du serveur.' });
});

// ============ DÉMARRAGE ============

async function start() {
  try {
    // Test de connexion à la base de données
    await sequelize.authenticate();
    console.log('✅ Connexion à la base de données réussie.');

    // Démarrage du serveur
    app.listen(PORT, () => {
      console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
      console.log(`📚 Swagger UI : http://localhost:${PORT}/api-docs`);
      console.log(`🌐 Front-end  : http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Impossible de se connecter à la base de données:', error.message);
    process.exit(1);
  }
}

start();
