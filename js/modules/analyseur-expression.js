/**
 * =====================================================
 * MODULE: ANALYSEUR D'EXPRESSIONS
 * Description: Parsing et évaluation d'expressions
 * =====================================================
 */

const AnalyseurExpression = {
    /**
     * Évalue une expression mathématique
     * @param {string} expression - L'expression à évaluer
     * @param {string} modeAngle - 'degres' ou 'radians'
     * @returns {number} Le résultat
     * @throws {Error} Si erreur dans l'expression
     */
    evaluer: function(expression, modeAngle = 'degres') {
        try {
            // Mise à jour du mode d'angle pour les fonctions scientifiques
            FonctionsScientifiques.definirModeAngle(modeAngle);

            // Remplacer les constantes
            expression = this._remplacerConstantes(expression);
            
            // Nettoyer l'expression
            expression = this._nettoyerExpression(expression);

            // Utiliser Function pour évaluer en toute sécurité
            // Créer un contexte sûr avec les fonctions disponibles
            const fonctionsDisponibles = this._construireContexte();
            const fonction = new Function(...Object.keys(fonctionsDisponibles), 
                                          `return ${expression}`);
            const resultat = fonction(...Object.values(fonctionsDisponibles));

            if (!isFinite(resultat)) {
                throw new Error("Résultat infini ou invalide");
            }

            return resultat;
        } catch (erreur) {
            throw new Error(`Erreur d'évaluation: ${erreur.message}`);
        }
    },

    /**
     * Remplace les constantes mathématiques par leurs valeurs
     * @private
     */
    _remplacerConstantes: function(expression) {
        expression = expression.replace(/π/g, Math.PI);
        expression = expression.replace(/e(?![a-zA-Z])/g, Math.E);  // Éviter de remplacer dans les noms
        return expression;
    },

    /**
     * Nettoie l'expression
     * @private
     */
    _nettoyerExpression: function(expression) {
        // Supprimer les espaces
        expression = expression.replace(/\s+/g, '');

        // Ajouter les parenthèses manquantes pour certaines fonctions
        expression = this._ajouterParenthesesFonctions(expression);

        return expression;
    },

    /**
     * Ajoute les parenthèses automatiquement pour les fonctions
     * @private
     */
    _ajouterParenthesesFonctions: function(expression) {
        const fonctions = ['sin', 'cos', 'tan', 'arcsin', 'arccos', 'arctan', 
                          'log', 'ln', 'sqrt', 'exp', 'abs', 'factorial'];

        fonctions.forEach(fn => {
            const regex = new RegExp(`(${fn})([\\d.(π)e])`, 'gi');
            expression = expression.replace(regex, `$1($2`);
        });

        return expression;
    },

    /**
     * Construit le contexte d'évaluation avec les fonctions disponibles
     * @private
     */
    _construireContexte: function() {
        return {
            // Opérateurs basiques (déjà gérés par JavaScript)
            // +, -, *, /, %

            // Fonctions trigonométriques
            sin: (x) => FonctionsScientifiques.sinus(x),
            cos: (x) => FonctionsScientifiques.cosinus(x),
            tan: (x) => FonctionsScientifiques.tangente(x),
            arcsin: (x) => FonctionsScientifiques.arcSinus(x),
            arccos: (x) => FonctionsScientifiques.arcCosinus(x),
            arctan: (x) => FonctionsScientifiques.arcTangente(x),

            // Logarithmes et exponentielles
            log: (x) => FonctionsScientifiques.logarithme(x),
            ln: (x) => FonctionsScientifiques.logarithmeNaturel(x),
            exp: (x) => FonctionsScientifiques.exponentielle(x),
            sqrt: (x) => FonctionsScientifiques.racineCarre(x),
            pow: (x, y) => FonctionsScientifiques.puissance(x, y),

            // Autres
            abs: (x) => OperateursBasiques.absolu(x),
            factorial: (n) => FonctionsScientifiques.factorielle(n),
            fact: (n) => FonctionsScientifiques.factorielle(n),

            // Constantes
            PI: Math.PI,
            E: Math.E,
        };
    },

    /**
     * Valide la syntaxe d'une expression
     * @param {string} expression - L'expression à valider
     * @returns {boolean} True si valide
     */
    validerSyntaxe: function(expression) {
        try {
            // Vérifier les parenthèses
            let compteur = 0;
            for (let char of expression) {
                if (char === '(') compteur++;
                if (char === ')') compteur--;
                if (compteur < 0) return false;
            }
            if (compteur !== 0) return false;

            // Vérifier les caractères autorisés
            const caracteresAutorises = /^[0-9+\-*/().πesincostalogxpfactlnarc√%|a-zA-Z\s]*$/;
            if (!caracteresAutorises.test(expression)) return false;

            return true;
        } catch {
            return false;
        }
    },

    /**
     * Formatte le résultat pour affichage
     * @param {number} resultat - Le résultat à formatter
     * @param {number} decimales - Nombre de décimales (par défaut 10)
     * @returns {string} Le résultat formaté
     */
    formatterResultat: function(resultat, decimales = 10) {
        // Arrondir pour éviter les erreurs de précision
        const facteur = Math.pow(10, decimales);
        const arrondi = Math.round(resultat * facteur) / facteur;

        // Convertir en chaîne, retirer les zéros superflus
        let chaine = arrondi.toString();

        // Si c'est un nombre très grand ou très petit, utiliser notation scientifique
        if (Math.abs(arrondi) > 1e10 || (Math.abs(arrondi) < 1e-6 && arrondi !== 0)) {
            chaine = arrondi.toExponential(5);
        }

        return chaine;
    },

    /**
     * Sépare une expression en parties reconnaissables
     * @param {string} expression - L'expression
     * @returns {array} Tableau des tokens
     */
    tokeniser: function(expression) {
        const tokens = [];
        let currentToken = '';

        for (let char of expression) {
            if (/[0-9.]/.test(char)) {
                currentToken += char;
            } else if (/[+\-*/()\%]|π|e/.test(char)) {
                if (currentToken) {
                    tokens.push(currentToken);
                    currentToken = '';
                }
                tokens.push(char);
            } else if (char === ' ') {
                if (currentToken) {
                    tokens.push(currentToken);
                    currentToken = '';
                }
            }
        }

        if (currentToken) {
            tokens.push(currentToken);
        }

        return tokens;
    },
};

/**
 * Expose le module globalement
 */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AnalyseurExpression;
}
