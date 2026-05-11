# 🧮 Calculatrice Scientifique

Une calculatrice scientifique moderne et modulaire développée en HTML, CSS et JavaScript, conçue pour les calculs du niveau lycée.

## ✨ Caractéristiques

### Opérateurs de base
- Addition, soustraction, multiplication, division
- Modulo, pourcentage, inverse (1/x)
- Valeur absolue

### Fonctions trigonométriques
- Sinus, cosinus, tangente
- Arc sinus, arc cosinus, arc tangente
- Support degrés/radians

### Logarithmes et exponentielles
- Logarithme base 10 (`log₁₀`)
- Logarithme naturel (`ln`)
- Exponentielle (`eˣ`)
- Puissance (`xʸ`)

### Racines
- Racine carrée (`√`)
- Racine nième (`ⁿ√`)

### Autres opérations
- Factorielle (`n!`)
- Combinaisons et arrangements
- Constantes: π, e, φ (nombre d'or)

### Fonctionnalités additionnelles
- **Mémoire**: MC, MR, M+, M-
- **Historique**: Sauvegarde automatique (localStorage)
- **Interface intuitive**: Responsive et dark theme
- **Support clavier**: Touches +, -, *, /, Enter, Backspace, C

## 🏗️ Architecture modulaire

```
js/
├── modules/
│   ├── operateurs.js           # Opérateurs basiques
│   ├── fonctions-scientifiques.js  # Fonctions avancées
│   ├── gestion-memoire.js      # Gestion de la mémoire
│   └── analyseur-expression.js # Parsing d'expressions
└── main.js                      # Orchestration principale

css/
└── style.css                    # Styles responsifs

index.html                        # Structure HTML sémantique
```

## 🚀 Utilisation

### Installation locale
1. Cloner le repository
```bash
git clone https://github.com/votre-username/calculatrice-scientifique.git
cd calculatrice-scientifique
```

2. Ouvrir `index.html` dans un navigateur

### Déploiement sur GitHub Pages

1. Pousser le code sur GitHub
```bash
git add .
git commit -m "feat: Calculatrice scientifique v1.0"
git push origin main
```

2. Activer GitHub Pages dans les paramètres du repository
   - Aller dans Settings → Pages
   - Sélectionner la branche `main`
   - La calculatrice sera accessible à: `https://votre-username.github.io/calculatrice-scientifique/`

## 📖 Guide d'utilisation

### Calculs basiques
- Entrer les nombres et opérateurs: `5 + 3 * 2`
- Appuyer sur `=` ou Entrée pour évaluer

### Fonctions scientifiques
- Cliquer sur le bouton de la fonction (ex: `sin(`)
- Entrer la valeur
- Appuyer sur `=`

### Mémoire
- **MC**: Effacer la mémoire
- **MR**: Rappeler la valeur en mémoire
- **M+**: Ajouter le nombre actuel à la mémoire
- **M-**: Soustraire le nombre actuel de la mémoire

### Mode d'angles
- Sélectionner "Degrés" ou "Radians" dans le menu déroulant
- Affecte uniquement les fonctions trigonométriques

## 🔧 Développement

### Ajouter une nouvelle fonction
Éditer `js/modules/fonctions-scientifiques.js`:
```javascript
nouvellefonction: (x) => {
    // Implémentation
    return resultat;
}
```

Puis ajouter le bouton dans `index.html` et gérer l'action dans `main.js`.

### Structure de code
- **Français**: Tout le code et commentaires sont en français
- **Modulaire**: Chaque fonctionnalité est isolée
- **Documenté**: JSDoc sur chaque fonction
- **Sécurisé**: Pas d'`eval()`, utilisation de `Function` contrôlée

## 🐛 Limitations connues

- Les calculs très complexes peuvent avoir des imprécisions de précision flottante
- Factorielles limitées à n < 170 (limite JavaScript)
- Les expressions très longues peuvent ralentir l'évaluation

## 📝 Licence

MIT - Libre d'utilisation et de modification

## 👨‍💻 Auteur

Développé pendant le Bootcamp

---

**Prêt à utiliser! 🎉**
