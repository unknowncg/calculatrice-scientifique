/**
 * =====================================================
 * MODULE: FONCTIONS SCIENTIFIQUES
 * Description: Fonctions avancées pour calculs lycée
 * =====================================================
 */

const FonctionsScientifiques = {
    /**
     * Vérifie si le mode d'angle est en radians ou degrés
     */
    _modeAngle: 'degres',

    /**
     * Définir le mode d'angle
     * @param {string} mode - 'degres' ou 'radians'
     */
    definirModeAngle: function(mode) {
        this._modeAngle = mode;
    },

    /**
     * Convertir degrés en radians
     * @param {number} degres - Valeur en degrés
     * @returns {number} Valeur en radians
     */
    _degreesEnRadians: (degres) => (degres * Math.PI) / 180,

    /**
     * Convertir radians en degrés
     * @param {number} radians - Valeur en radians
     * @returns {number} Valeur en degrés
     */
    _radiansEnDegres: (radians) => (radians * 180) / Math.PI,

    /**
     * Sinus d'un angle
     * @param {number} angle - L'angle
     * @returns {number} Le sinus
     */
    sinus: function(angle) {
        const angleEnRadians = this._modeAngle === 'degres' 
            ? this._degreesEnRadians(angle) 
            : angle;
        return Math.sin(angleEnRadians);
    },

    /**
     * Cosinus d'un angle
     * @param {number} angle - L'angle
     * @returns {number} Le cosinus
     */
    cosinus: function(angle) {
        const angleEnRadians = this._modeAngle === 'degres' 
            ? this._degreesEnRadians(angle) 
            : angle;
        return Math.cos(angleEnRadians);
    },

    /**
     * Tangente d'un angle
     * @param {number} angle - L'angle
     * @returns {number} La tangente
     */
    tangente: function(angle) {
        const angleEnRadians = this._modeAngle === 'degres' 
            ? this._degreesEnRadians(angle) 
            : angle;
        return Math.tan(angleEnRadians);
    },

    /**
     * Arcsinus (inverse du sinus)
     * @param {number} x - Valeur entre -1 et 1
     * @returns {number} L'angle en radians
     * @throws {Error} Si x est hors de [-1, 1]
     */
    arcSinus: function(x) {
        if (x < -1 || x > 1) {
            throw new Error("arcsin: la valeur doit être entre -1 et 1");
        }
        const resultat = Math.asin(x);
        return this._modeAngle === 'degres' 
            ? this._radiansEnDegres(resultat) 
            : resultat;
    },

    /**
     * Arccosinus (inverse du cosinus)
     * @param {number} x - Valeur entre -1 et 1
     * @returns {number} L'angle en radians
     * @throws {Error} Si x est hors de [-1, 1]
     */
    arcCosinus: function(x) {
        if (x < -1 || x > 1) {
            throw new Error("arccos: la valeur doit être entre -1 et 1");
        }
        const resultat = Math.acos(x);
        return this._modeAngle === 'degres' 
            ? this._radiansEnDegres(resultat) 
            : resultat;
    },

    /**
     * Arctangente (inverse de la tangente)
     * @param {number} x - La valeur
     * @returns {number} L'angle en radians
     */
    arcTangente: function(x) {
        const resultat = Math.atan(x);
        return this._modeAngle === 'degres' 
            ? this._radiansEnDegres(resultat) 
            : resultat;
    },

    /**
     * Logarithme en base 10
     * @param {number} x - La valeur (doit être > 0)
     * @returns {number} Le logarithme en base 10
     * @throws {Error} Si x <= 0
     */
    logarithme: (x) => {
        if (x <= 0) {
            throw new Error("log: la valeur doit être positive");
        }
        return Math.log10(x);
    },

    /**
     * Logarithme naturel (en base e)
     * @param {number} x - La valeur (doit être > 0)
     * @returns {number} Le logarithme naturel
     * @throws {Error} Si x <= 0
     */
    logarithmeNaturel: (x) => {
        if (x <= 0) {
            throw new Error("ln: la valeur doit être positive");
        }
        return Math.log(x);
    },

    /**
     * Exponentielle (e^x)
     * @param {number} x - L'exposant
     * @returns {number} e à la puissance x
     */
    exponentielle: (x) => Math.exp(x),

    /**
     * Puissance: x à la puissance y
     * @param {number} x - La base
     * @param {number} y - L'exposant
     * @returns {number} x^y
     * @throws {Error} Si base négative avec exposant décimal
     */
    puissance: (x, y) => {
        if (x < 0 && !Number.isInteger(y)) {
            throw new Error("Impossibilité: base négative avec exposant décimal");
        }
        return Math.pow(x, y);
    },

    /**
     * Racine carrée
     * @param {number} x - La valeur
     * @returns {number} La racine carrée
     * @throws {Error} Si x < 0
     */
    racineCarre: (x) => {
        if (x < 0) {
            throw new Error("racine carrée: la valeur doit être positive");
        }
        return Math.sqrt(x);
    },

    /**
     * Racine nième
     * @param {number} x - La valeur
     * @param {number} n - L'indice de la racine
     * @returns {number} La racine nième
     * @throws {Error} Si racine paire d'un nombre négatif
     */
    racineN: (x, n) => {
        if (n === 0) {
            throw new Error("Racine: l'indice doit être non nul");
        }
        if (x < 0 && n % 2 === 0) {
            throw new Error("Racine paire d'un nombre négatif impossible");
        }
        return n > 0 
            ? Math.pow(x, 1 / n) 
            : Math.pow(x, 1 / n);
    },

    /**
     * Factorielle (n!)
     * @param {number} n - Le nombre entier positif
     * @returns {number} La factorielle
     * @throws {Error} Si n < 0 ou n n'est pas entier
     */
    factorielle: (n) => {
        if (n < 0 || !Number.isInteger(n)) {
            throw new Error("Factorielle: la valeur doit être un entier positif");
        }
        if (n === 0 || n === 1) return 1;
        let resultat = 1;
        for (let i = 2; i <= n; i++) {
            resultat *= i;
        }
        return resultat;
    },

    /**
     * Combinaisons: C(n, k) = n! / (k! * (n-k)!)
     * @param {number} n - Ensemble total
     * @param {number} k - Éléments à choisir
     * @returns {number} Le nombre de combinaisons
     */
    combinaison: (n, k) => {
        if (k > n || k < 0 || n < 0) {
            throw new Error("Combinaison invalide");
        }
        const numerateur = FonctionsScientifiques.factorielle(n);
        const denominateur = FonctionsScientifiques.factorielle(k) * 
                            FonctionsScientifiques.factorielle(n - k);
        return numerateur / denominateur;
    },

    /**
     * Arrangements: A(n, k) = n! / (n-k)!
     * @param {number} n - Ensemble total
     * @param {number} k - Éléments à choisir
     * @returns {number} Le nombre d'arrangements
     */
    arrangement: (n, k) => {
        if (k > n || k < 0 || n < 0) {
            throw new Error("Arrangement invalide");
        }
        return FonctionsScientifiques.factorielle(n) / 
               FonctionsScientifiques.factorielle(n - k);
    },

    /**
     * Constantes mathématiques
     */
    constantes: {
        pi: Math.PI,
        e: Math.E,
        phi: (1 + Math.sqrt(5)) / 2,  // Nombre d'or
    },
};

/**
 * Expose le module globalement
 */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FonctionsScientifiques;
}
