# Recettes

Application de gestion de recettes de cuisine.

## Stack

- **React 19** + **TypeScript**
- **Vite 8**
- **Firebase** (Firestore + Storage)
- **react-router-dom** (HashRouter)
- **Tailwind CSS** + **SCSS Modules**
- **Framer Motion**
- **Vitest** + **Testing Library**

## Scripts

```bash
npm run dev        # Lance le serveur de développement
npm run build      # Build de production
npm run preview    # Prévisualisation du build
npm run deploy     # Déploiement via gh-pages
```

## Structure

```
src/
├── components/        # Composants réutilisables
│   ├── Button/
│   ├── Nav/
│   ├── Notification/
│   ├── Progress/
│   ├── RecipeForm/
│   └── RecipeList/
├── pages/             # Pages
│   ├── homepage/
│   └── recipes/
│       ├── add/
│       ├── list/
│       └── detail.tsx
├── App.tsx
├── index.tsx
└── firebaseClient.ts
```

## Configuration

Copier le fichier `.env` à la racine avec les variables Firebase :

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```
