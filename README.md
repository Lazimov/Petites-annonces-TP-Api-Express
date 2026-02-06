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

### Diagramme de classes UML

![Diagramme de classes](https://www.plantuml.com/plantuml/png/ZLF1Rjim3BthAmYVacW3jcsaKYW0YL4a0jIbsacIIMavP2n9MPBwxqpRLQMMjLPqPVVUpEVn9bfCqsiAOmDf2laY2v8BSv4FLqSWjMM0n78mIamXdwOEDmB7JKkK3kCMSz-K-03QFi6GGKr03zKK3M-L1F5ZJ9K6LJZYfCo8fUGaxG95jyG4x2uad2fXoU1k3R0TvLfDSXhfbT9NbWU2pQsC7pu-LaPB5D3KeqLiDHO9h5BJ0xSW4pMB95BCN9tHnSCqkWCkLKPPa3VavQiHUuGJfAqbH0dkC0i7qCXMPVSEgkwfS7IRNj-zMDtqEZPxkpRy-hxmTwTcpv-R_xzFhsV-2tBWx_t_0a-yl-6NtnVlq6QDqFNmss2lEhFwVlAVHqWkQF0LoRz_dpF4LkCTJUbVpZq_CZjDWkB-JNu1)

<details>
<summary>📝 Code source PlantUML</summary>

```plantuml
@startuml
skinparam classAttributeIconSize 0
skinparam classFontStyle bold
skinparam packageStyle rectangle
skinparam shadowing false
skinparam linetype ortho

package "Petites Annonces API" {

    class User {
        - id : INTEGER <<PK>>
        - username : VARCHAR(50) <<UNIQUE>>
        - email : VARCHAR(100) <<UNIQUE>>
        - password : VARCHAR(255)
        - role : ENUM {user, admin}
        - createdAt : DATETIME
        - updatedAt : DATETIME
        __
        + validPassword(password) : Boolean
        + toJSON() : Object
    }

    class Annonce {
        - id : INTEGER <<PK>>
        - title : VARCHAR(150)
        - description : TEXT
        - price : DECIMAL(10,2)
        - location : VARCHAR(100)
        - status : ENUM {active, sold, archived}
        - userId : INTEGER <<FK>>
        - categoryId : INTEGER <<FK>>
        - createdAt : DATETIME
        - updatedAt : DATETIME
    }

    class Category {
        - id : INTEGER <<PK>>
        - name : VARCHAR(100) <<UNIQUE>>
        - description : TEXT
        - createdAt : DATETIME
        - updatedAt : DATETIME
    }

    User "1" --> "0..*" Annonce : publie >
    Category "1" --> "0..*" Annonce : contient >
}

@enduml
```

</details>

### Diagramme de séquence — Inscription & Création d'annonce

![Diagramme de séquence](https://www.plantuml.com/plantuml/png/ZLHDRzim3BthLn3eMGVs01tiW8KNL0b0jYDUqQocsMsPaIEabs7_trCIfKceB0BpFNapysQzLDROXMOi2d80F8fGXRQu0HQJM887Bi6e2KKmImWr5UO2Lw5v4hOCXLn2ra5fHb89IK3S09Hi1Ds2WCqOmq4r5WJfXKSq8sK5s5e5b3C1GGMI4ne64F0EaB32c82OYOAWm78O5sA2Y4L4bA3u4rG3y7S7WYwNiGBD-65oMB7Q37z8d8sOE2f3rK49KYH0-3CW-mI20X8U4D1sXc4f9c6hCCqH8dq1V0o7m0Qr6K3Pv93L8_mGZ1w9lOeO_TI7rdtGmtNq5sStjlnlBxJaKRPb5m-_t-R_BrqS-dyV-VYnrltzFpvxrVfCPLfvVDlBxhq_T-E3r-hF_-VdlmFxjV6lZfxzsnL6cNJYREKKqQeVv_b4PL2rkqrHLKwT4pjLb_RCIq6QfnZnQAz5cTw7_0G00)

<details>
<summary>📝 Code source PlantUML</summary>

```plantuml
@startuml
skinparam shadowing false
skinparam sequenceArrowThickness 2
skinparam participantPadding 20

actor Utilisateur as U
participant "Front-end\n(HTML/JS)" as F
participant "API Express\n(Node.js)" as A
participant "Middleware\n(auth.js)" as M
participant "Service\n(authService)" as S
database "MySQL" as DB

== Inscription ==

U -> F : Remplit formulaire inscription
F -> A : POST /api/auth/signup\n{username, email, password}
A -> A : Validation\n(express-validator)
A -> S : signup(body)
S -> DB : SELECT * FROM users\nWHERE email = ?
DB --> S : null (disponible)
S -> S : bcrypt.hash(password, 10)
S -> DB : INSERT INTO users
DB --> S : User créé
S -> S : jwt.sign({id, email, role})
S --> A : {user, token}
A --> F : **201** {user, token}
F -> F : localStorage.setItem('token')

== Création d'annonce ==

U -> F : Remplit formulaire annonce
F -> A : POST /api/annonces\n+ Header: Bearer <token>
A -> M : Vérification JWT
M -> M : jwt.verify(token)
M --> A : req.user = {id, role}
A -> S : create(body, userId)
S -> DB : INSERT INTO annonces
DB --> S : Annonce créée
S --> A : annonce (avec user + category)
A --> F : **201** {annonce}
F -> F : Affiche nouvelle annonce

@enduml
```

</details>

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
