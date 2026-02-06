const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();

class AuthService {
  /**
   * Inscription d'un nouvel utilisateur
   */
  static async signup({ username, email, password }) {
    // Vérifier si l'email ou le username existe déjà
    const existingUser = await User.findOne({
      where: { email }
    });
    if (existingUser) {
      throw { status: 400, message: 'Cet email est déjà utilisé.' };
    }

    const existingUsername = await User.findOne({
      where: { username }
    });
    if (existingUsername) {
      throw { status: 400, message: 'Ce nom d\'utilisateur est déjà pris.' };
    }

    // Créer l'utilisateur (le hook beforeCreate hash le password)
    const user = await User.create({ username, email, password });

    // Générer le token
    const token = this.generateToken(user);

    return { user, token };
  }

  /**
   * Connexion d'un utilisateur
   */
  static async login({ email, password }) {
    // Trouver l'utilisateur
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw { status: 401, message: 'Email ou mot de passe incorrect.' };
    }

    // Vérifier le mot de passe
    const isValid = await user.validPassword(password);
    if (!isValid) {
      throw { status: 401, message: 'Email ou mot de passe incorrect.' };
    }

    // Générer le token
    const token = this.generateToken(user);

    return { user, token };
  }

  /**
   * Récupérer le profil utilisateur
   */
  static async getProfile(userId) {
    const user = await User.findByPk(userId, {
      attributes: { exclude: ['password'] }
    });
    if (!user) {
      throw { status: 404, message: 'Utilisateur non trouvé.' };
    }
    return user;
  }

  /**
   * Générer un token JWT
   */
  static generateToken(user) {
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );
  }
}

module.exports = AuthService;
