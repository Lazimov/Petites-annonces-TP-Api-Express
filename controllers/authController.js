const AuthService = require('../services/authService');

class AuthController {
  /**
   * POST /api/auth/signup
   */
  static async signup(req, res) {
    try {
      const { user, token } = await AuthService.signup(req.body);
      res.status(201).json({
        message: 'Inscription réussie.',
        user,
        token
      });
    } catch (error) {
      const status = error.status || 500;
      res.status(status).json({
        error: error.message || 'Erreur lors de l\'inscription.'
      });
    }
  }

  /**
   * POST /api/auth/login
   */
  static async login(req, res) {
    try {
      const { user, token } = await AuthService.login(req.body);
      res.status(200).json({
        message: 'Connexion réussie.',
        user,
        token
      });
    } catch (error) {
      const status = error.status || 500;
      res.status(status).json({
        error: error.message || 'Erreur lors de la connexion.'
      });
    }
  }

  /**
   * GET /api/auth/profile
   */
  static async profile(req, res) {
    try {
      const user = await AuthService.getProfile(req.user.id);
      res.status(200).json({ user });
    } catch (error) {
      const status = error.status || 500;
      res.status(status).json({
        error: error.message || 'Erreur lors de la récupération du profil.'
      });
    }
  }
}

module.exports = AuthController;
