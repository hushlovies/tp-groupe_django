# td-djangorestapi-CANARIA-KAIRA
TP sur l'application de Suivi de Projets de Recherche avec Django

## Table des matières

- [Prérequis](#prérequis)
- [Installation](#installation)
- [Configuration](#configuration)
- [Lancement du projet](#lancement-du-projet)
- [Utilisation de l'API](#utilisation-de-lapi)
- [Structure des Endpoints](#structure-des-endpoints)
- [Tests](#tests)


## Prérequis

Assurez-vous d'avoir les éléments suivants installés :

- Python 3.7 ou plus
- pip
- virtualenv

## Installation

Clonez le dépôt et installez les dépendances :

```bash
git clone https://github.com/votre-utilisateur/votre-repo.git
cd votre-repo
python -m venv venv
source venv/bin/activate  # Sur Windows: venv\Scripts\activate
pip install -r requirements.txt

```

## Configuration
Créez un fichier .env à la racine du projet et configurez les variables d'environnement nécessaires :

```bash
SECRET_KEY=votre_cle_secrete
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
DATABASE_URL=sqlite:///db.sqlite3  # ou configurez votre base de données préférée

```

Appliquez les migrations :

```bash
python manage.py migrate

```

Créez un superutilisateur pour accéder à l'admin :

```bash
python manage.py createsuperuser

```

## Lancement du projet
Démarrez le serveur de développement :

```bash
cd myapp
python manage.py runserver
```

Démarrez le frontend de développement :
```bash
cd frontend
npm install
npm run start
```

## Utilisation de l'API
Vous pouvez maintenant utiliser l'API à l'adresse http://localhost:8000/api/.

## Structure des Endpoints

### Projets

- GET /api/projets/ : Récupérer tous les projets de recherche
- POST /api/projets/ : Créer un nouveau projet de recherche
- GET /api/projets/{id}/ : Récupérer un projet de recherche spécifique
- PUT /api/projets/{id}/ : Mettre à jour un projet de recherche
- DELETE /api/projets/{id}/ : Supprimer un projet de recherche

### Chercheurs

- GET /api/chercheurs/ : Récupérer tous les chercheurs
- POST /api/chercheurs/ : Créer un nouveau chercheur
- GET /api/chercheurs/{id}/ : Récupérer un chercheur spécifique
- PUT /api/chercheurs/{id}/ : Mettre à jour un chercheur
- DELETE /api/chercheurs/{id}/ : Supprimer un chercheur

### Publications

- GET /api/publications/ : Récupérer toutes les publications
- POST /api/publications/ : Créer une nouvelle publication
- GET /api/publications/{id}/ : Récupérer une publication spécifique
- PUT /api/publications/{id}/ : Mettre à jour une publication
- DELETE /api/publications/{id}/ : Supprimer une publication

## Tests

Un fichier test.http est présent dans le dossier test/test.http

