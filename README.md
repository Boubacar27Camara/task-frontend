# Task Manager Frontend

Application React permettant la gestion des tâches et catégories avec un tableau de bord statistique complet.

## Technologies

- **React 18** - UI library
- **Vite** - Build tool
- **TypeScript** - Type safety
- **React Router** - Navigation
- **Axios** - HTTP client
- **Recharts** - Data visualization
- **React Toastify** - Notifications
- **Vitest** - Unit testing
- **React Testing Library** - Component testing

## Fonctionnalités

✅ **Dashboard** - Statistiques et graphiques en temps réel  
✅ **Gestion des tâches** - CRUD complet avec filtres  
✅ **Gestion des catégories** - Création, modification, suppression  
✅ **Recherche et filtrage** - Par statut, priorité, catégorie  
✅ **Changement de statut** - TODO, IN_PROGRESS, DONE  
✅ **Notifications** - Toast pour les actions utilisateur  
✅ **Responsive** - Adapté mobile et desktop  
✅ **Tests unitaires** - Couverture 60%+  

## Installation

### Prérequis

- Node.js 18+
- npm ou yarn

### Setup

1. **Cloner le projet**
   ```bash
   cd task-frontend
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Créer le fichier .env**
   ```bash
   cp .env.example .env
   ```
   
   Éditer `.env` avec votre configuration :
   ```env
   VITE_API_URL=http://localhost:8080/api
   ```

4. **Lancer le serveur de développement**
   ```bash
   npm run dev
   ```

   Application disponible sur : **http://localhost:5173**

## Scripts disponibles

```bash
# Développement
npm run dev

# Build production
npm run build

# Preview build
npm run preview

# Tests unitaires
npm run test

# Tests avec UI
npm run test:ui

# Couverture de code
npm run coverage

# Linter
npm run lint
```

## Structure du projet

```
src/
├── components/
│   ├── dashboard/
│   │   ├── StatsCards.tsx
│   │   ├── StatusPieChart.tsx
│   │   ├── PriorityBarChart.tsx
│   │   ├── CompletionProgress.tsx
│   │   └── CategoryStatsTable.tsx
│   ├── task/
│   │   ├── TaskForm.tsx
│   │   ├── TaskList.tsx
│   │   ├── TaskCard.tsx
│   │   └── *.test.tsx
│   └── category/
│       ├── CategoryForm.tsx
│       ├── CategoryList.tsx
│       └── *.test.tsx
├── pages/
│   ├── DashboardPage.tsx
│   ├── TasksPage.tsx
│   ├── CategoriesPage.tsx
│   └── *.test.tsx
├── services/
│   ├── axiosConfig.ts
│   ├── dashboardService.ts
│   ├── taskService.ts
│   └── categoryService.ts
├── test/
│   └── setup.ts
├── App.tsx
├── main.tsx
└── index.css
```

## Configuration API

Par défaut, l'application appelle l'API sur :
- **http://localhost:8080/api**

Modifiez `VITE_API_URL` dans `.env` pour changer l'endpoint.

### Endpoints attendus

```
GET    /api/dashboard/stats         - Statistiques
GET    /api/tasks                   - Liste des tâches
GET    /api/tasks/:id               - Détail tâche
POST   /api/tasks                   - Créer tâche
PUT    /api/tasks/:id               - Modifier tâche
PATCH  /api/tasks/:id/status        - Changer statut
DELETE /api/tasks/:id               - Supprimer tâche

GET    /api/categories              - Liste catégories
GET    /api/categories/:id          - Détail catégorie
POST   /api/categories              - Créer catégorie
PUT    /api/categories/:id          - Modifier catégorie
DELETE /api/categories/:id          - Supprimer catégorie
```

## Tests

### Lancer les tests
```bash
npm run test
```

### Voir la couverture
```bash
npm run coverage
```

### Ouvrir le UI Vitest
```bash
npm run test:ui
```

Tests inclus :
- ✅ TaskForm - Rendu, validation, soumission
- ✅ TaskList - Liste vide, affichage tâches
- ✅ TaskCard - Changement de statut
- ✅ CategoryList - Suppression catégorie
- ✅ DashboardPage - Loading, données, erreur

## Build production

```bash
npm run build
```

Génère un dossier `dist/` prêt pour le déploiement.

Tester localement :
```bash
npm run preview
```

## Variables d'environnement

Voir `.env.example` pour les variables disponibles :

```env
# API Backend
VITE_API_URL=http://localhost:8080/api
```

## Responsive Design

L'application est responsive sur :
- 📱 Mobile (320px+)
- 📱 Tablet (768px+)
- 💻 Desktop (1024px+)

## Troubleshooting

### Port 5173 déjà utilisé
```bash
npm run dev -- --port 3000
```

### CORS error
Vérifiez que le backend accepte les requêtes depuis `http://localhost:5173`

### Erreur "Cannot load dashboard"
Vérifiez que :
1. Le backend tourne sur le bon port
2. `VITE_API_URL` est correct dans `.env`
3. L'endpoint `/api/dashboard/stats` existe

## Développement

### Ajouter un nouveau composant

```typescript
// src/components/MyComponent.tsx
interface MyComponentProps {
  title: string;
}

function MyComponent({ title }: MyComponentProps) {
  return <div>{title}</div>;
}

export default MyComponent;
```

### Ajouter un test

```typescript
// src/components/MyComponent.test.tsx
import { render, screen } from "@testing-library/react";
import MyComponent from "./MyComponent";

describe("MyComponent", () => {
  it("renders title", () => {
    render(<MyComponent title="Test" />);
    expect(screen.getByText("Test")).toBeInTheDocument();
  });
});
```

## Performance

- Lazy loading des composants
- Code splitting automatique avec Vite
- Optimisation des builds
- Minification en production

## Licence

Projet scolaire - Gestion de tâches personnelles
```
