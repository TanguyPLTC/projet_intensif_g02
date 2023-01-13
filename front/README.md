# Intensif02-Front

## Requirements
- Node.JS 18.10.z ou ultérieur

## Setup
1. Copier le .env.example en .env
2. Configurer la variable `VITE_API_ENDPOINT` (lien vers l'API backend)
3. Pour la production, il faut modifier le pathname de l'url où sera déployé le site : `svelte.config.js`, variable `paths.base`
4. Installer les dépendances : `npm install`
5. Lancer le projet : `npm run dev`