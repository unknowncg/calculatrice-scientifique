/**
 * =====================================================
 * MODULE: OPÉRATEURS BASIQUES
 * Description: Opérations mathématiques fondamentales
 * =====================================================
 */

const OperateursBasiques = {
    /**
     * Addition de deux nombres
     * @param {number} a - Premier opérande
     * @param {number} b - Deuxième opérande
     * @returns {number} Résultat de l'addition
     */
    addition: (a, b) => a + b,

    /**
     * Soustraction de deux nombres
     * @param {number} a - Premier opérande
     * @param {number} b - Deuxième opérande
     * @returns {number} Résultat de la soustraction
     */
    soustraction: (a, b) => a - b,

    /**
     * Multiplication de deux nombres
     * @param {number} a - Premier opérande
     * @param {number} b - Deuxième opérande
     * @returns {number} Résultat de la multiplication
     */
    multiplication: (a, b) => a * b,

    /**
     * Division de deux nombres
     * @param {number} a - Dividende
     * @param {number} b - Diviseur
     * @returns {number} Résultat de la division
     * @throws {Error} Si division par zéro
     */
    division: (a, b) => {
        if (b === 0) {
            throw new Error("Division par zéro impossible");
        }
        return a / b;
    },

    /**
     * Modulo (reste de la division)
     * @param {number} a - Dividende
     * @param {number} b - Diviseur
     * @returns {number} Reste de la division
     */
    modulo: (a, b) => {
        if (b === 0) {
            throw new Error("Division par zéro impossible");
        }
        return a % b;
    },

    /**
     * Pourcentage d'une valeur
     * @param {number} nombre - Le nombre
     * @param {number} pourcentage - Le pourcentage
     * @returns {number} La valeur en pourcentage
     */
    pourcentage: (nombre, pourcentage) => (nombre * pourcentage) / 100,

    /**
     * Inverse/Réciproque d'un nombre (1/x)
     * @param {number} x - Le nombre
     * @returns {number} L'inverse du nombre
     * @throws {Error} Si le nombre est zéro
     */
    inverse: (x) => {
        if (x === 0) {
            throw new Error("Impossible de calculer l'inverse de zéro");
        }
        return 1 / x;
    },

    /**
     * Valeur absolue d'un nombre
     * @param {number} x - Le nombre
     * @returns {number} La valeur absolue
     */
    absolu: (x) => Math.abs(x),

    /**
     * Négatif d'un nombre (-x)
     * @param {number} x - Le nombre
     * @returns {number} L'opposé du nombre
     */
    negatif: (x) => -x,
};

/**
 * Expose le module globalement pour accès dans d'autres scripts
 */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = OperateursBasiques;
}
