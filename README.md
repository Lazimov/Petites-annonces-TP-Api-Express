<div align="center">

# 🏪 Petites Annonces

**API REST complète pour une plateforme de petites annonces**

Développée avec Node.js, Express, Sequelize & MySQL

[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Sequelize](https://img.shields.io/badge/Sequelize-6.x-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white)](https://sequelize.org/)
[![Swagger](https://img.shields.io/badge/Swagger-API_Docs-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)](https://swagger.io/)
[![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)

---

*Projet réalisé dans le cadre du TP Développement API Express*

</div>

---

## 📋 Présentation

Cette application est une **plateforme de petites annonces** permettant aux utilisateurs de publier, consulter, modifier et supprimer des annonces classées par catégories.

L'API respecte les principes **REST**, est sécurisée par **JWT** et entièrement documentée via **Swagger**. Un **front-end** est inclus pour interagir avec l'API directement depuis le navigateur.

---

## 👤 Auteur

| Nom | GitHub |
|-----|--------|
| **Yannis LEVY** | [@Lazimov](https://github.com/Lazimov) |

---

## ⚙️ Stack technique

| Technologie | Rôle |
|:-----------:|------|
| **Node.js** + **Express** | Serveur HTTP et routing |
| **Sequelize** | ORM pour MySQL |
| **MySQL** | Base de données relationnelle |
| **JWT** | Authentification par token |
| **bcrypt** | Hashage des mots de passe |
| **express-validator** | Validation des données entrantes |
| **CORS** | Gestion des requêtes cross-origin |
| **Swagger** | Documentation interactive de l'API |

---

## 🗃️ Modèle de données

### Diagramme UML

```mermaid
classDiagram
    class User {
        +int id
        +string username
        +string email
        +string password
        +enum role [user, admin]
        +datetime createdAt
        +datetime updatedAt
        +validPassword(password) bool
    }

    class Annonce {
        +int id
        +string title
        +text description
        +decimal price
        +string location
        +enum status [active, sold, archived]
        +int userId FK
        +int categoryId FK
        +datetime createdAt
        +datetime updatedAt
    }

    class Category {
        +int id
        +string name
        +text description
        +datetime createdAt
        +datetime updatedAt
    }

    User "1" --> "*" Annonce : publie
    Category "1" --> "*" Annonce : contient
```

### Diagramme de séquence — Authentification

```mermaid
sequenceDiagram
    actor U as Utilisateur
    participant F as Front-end
    participant A as API Express
    participant DB as MySQL

    U->>F: Remplit le formulaire d'inscription
    F->>A: POST /api/auth/signup {username, email, password}
    A->>A: Validation (express-validator)
    A->>A: Hashage du mot de passe (bcrypt)
    A->>DB: INSERT INTO users
    DB-->>A: User créé
    A->>A: Génération du token JWT
    A-->>F: 201 {user, token}
    F->>F: Stocke le token (localStorage)

    U->>F: Crée une annonce
    F->>A: POST /api/annonces + Bearer token
    A->>A: Vérification JWT (middleware auth)
    A->>DB: INSERT INTO annonces
    DB-->>A: Annonce créée
    A-->>F: 201 {annonce}
    F->>F: Affiche la nouvelle annonce
```

### Schéma relationnel

```
┌──────────────┐       ┌──────────────────┐       ┌──────────────┐
│     User     │       │     Annonce      │       │   Category   │
├──────────────┤       ├──────────────────┤       ├──────────────┤
│ id       PK  │──┐    │ id           PK  │    ┌──│ id       PK  │
│ username     │  │    │ title            │    │  │ name         │
│ email        │  │    │ description      │    │  │ description  │
│ password     │  ├───>│ price            │<───┘  │ createdAt    │
│ role         │  │    │ location         │       │ updatedAt    │
│ createdAt    │  │    │ status           │       └──────────────┘
│ updatedAt    │  │    │ userId       FK  │
└──────────────┘  │    │ categoryId   FK  │
                  │    │ createdAt        │
                  │    │ updatedAt        │
                  │    └──────────────────┘
                  │
                  └── 1-N : User hasMany Annonces
                      1-N : Category hasMany Annonces
```

---

## 🚀 Installation

### Prérequis

- **Node.js** v18+
- **MySQL** (via XAMPP ou autre)

### Mise en route

```bash
# Cloner le projet
git clone https://github.com/Lazimov/petites-annonces.git
cd petites-annonces

# Installer les dépendances
npm install

# Créer la base de données (phpMyAdmin ou CLI)
# CREATE DATABASE petites_annonces;

# Lancer les migrations
npx sequelize-cli db:migrate

# Insérer les données de démo
npx sequelize-cli db:seed:all

# Démarrer le serveur
npm start
```

> 💡 Modifier le fichier `.env` si besoin (mot de passe MySQL, port, etc.)

---

## 🔗 Accès

| Service | URL |
|---------|-----|
| 🌐 Front-end | [http://localhost:3000](http://localhost:3000) |
| 📚 Swagger | [http://localhost:3000/api-docs](http://localhost:3000/api-docs) |

---

## 📡 Routes API

### 🔐 Authentification

| Méthode | Route | Description | Auth |
|:-------:|-------|-------------|:----:|
| `POST` | `/api/auth/signup` | Inscription | ❌ |
| `POST` | `/api/auth/login` | Connexion | ❌ |
| `GET` | `/api/auth/profile` | Profil utilisateur | 🔒 |

### 📦 Annonces

| Méthode | Route | Description | Auth |
|:-------:|-------|-------------|:----:|
| `GET` | `/api/annonces` | Lister les annonces | ❌ |
| `GET` | `/api/annonces/:id` | Détail d'une annonce | ❌ |
| `POST` | `/api/annonces` | Créer une annonce | 🔒 |
| `PUT` | `/api/annonces/:id` | Modifier une annonce | 🔒 Propriétaire |
| `DELETE` | `/api/annonces/:id` | Supprimer une annonce | 🔒 Propriétaire / Admin |

### 🏷️ Catégories

| Méthode | Route | Description | Auth |
|:-------:|-------|-------------|:----:|
| `GET` | `/api/categories` | Lister les catégories | ❌ |
| `GET` | `/api/categories/:id` | Détail + annonces | ❌ |
| `POST` | `/api/categories` | Créer une catégorie | 🔒 Admin |
| `PUT` | `/api/categories/:id` | Modifier une catégorie | 🔒 Admin |
| `DELETE` | `/api/categories/:id` | Supprimer une catégorie | 🔒 Admin |

> 🔒 = Token JWT requis dans le header `Authorization: Bearer <token>`

---

## 🧪 Comptes de démo

| Rôle | Email | Mot de passe |
|:----:|-------|:------------:|
| 👑 Admin | `admin@petitesannonces.fr` | `admin123` |
| 👤 User | `jean@example.com` | `password123` |
| 👤 User | `marie@example.com` | `password123` |

---

## 📁 Structure du projet

```
petites-annonces/
│
├── 📄 app.js                    # Point d'entrée
├── 📄 .env                      # Variables d'environnement
├── 📄 .sequelizerc              # Config CLI Sequelize
│
├── 📂 config/
│   ├── config.js                # Config Sequelize (dev/test/prod)
│   ├── database.js              # Connexion BDD
│   └── swagger.js               # Config Swagger
│
├── 📂 models/
│   ├── index.js                 # Associations
│   ├── User.js                  # Modèle utilisateur
│   ├── Annonce.js               # Modèle annonce
│   └── Category.js              # Modèle catégorie
│
├── 📂 migrations/               # Création des tables
├── 📂 seeders/                  # Données de démonstration
│
├── 📂 routes/                   # Définition des routes + Swagger
├── 📂 controllers/              # Logique HTTP (req/res)
├── 📂 services/                 # Logique métier
├── 📂 middlewares/               # Auth JWT + rôles
├── 📂 validators/               # Validation express-validator
│
└── 📂 public/
    └── index.html               # Front-end (bonus)
```

---

## 🔒 Sécurité

- **bcrypt** — Hashage des mots de passe (salt rounds: 10)
- **JWT** — Authentification stateless avec expiration 24h
- **CORS** — Configuration des origines autorisées
- **express-validator** — Validation et sanitization des entrées
- **Contrôle d'accès** — Routes protégées par rôle (user / admin)

---

<div align="center">

*Projet réalisé dans le cadre du TP Développement API Express*

**Formateur** : Bastien Flanquart

</div>
