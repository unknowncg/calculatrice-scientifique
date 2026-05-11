#!/bin/bash

# Script de déploiement sur GitHub Pages
# Utilisation: chmod +x deploy.sh && ./deploy.sh

echo "🚀 Préparation du déploiement..."

# Vérifier que git est initialisé
if [ ! -d .git ]; then
    echo "❌ Git n'est pas initialisé. Exécutez: git init"
    exit 1
fi

# Vérifier qu'il y a des modifications
if [[ -z $(git status -s) ]]; then
    echo "✓ Pas de modifications à committer"
else
    echo "📝 Commit des modifications..."
    git add .
    git commit -m "feat: Mise à jour calculatrice scientifique - $(date +%Y-%m-%d)"
fi

# Pousser vers main
echo "📤 Poussée vers GitHub..."
git push origin main

echo "✅ Déploiement terminé!"
echo "📍 Accédez à votre calculatrice: https://votre-username.github.io/calculatrice-scientifique/"
echo "   (Attendez quelques secondes pour que GitHub Pages se mette à jour)"
