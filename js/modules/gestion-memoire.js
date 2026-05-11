/**
 * =====================================================
 * MODULE: GESTION DE MÉMOIRE
 * Description: Gestion de la mémoire de la calculatrice
 * =====================================================
 */

const GestionMémoire = {
    /**
     * Valeur stockée en mémoire
     */
    valeur: 0,

    /**
     * Efface la mémoire
     */
    effacer: function() {
        this.valeur = 0;
        this._notifierChangement();
    },

    /**
     * Rappelle la valeur en mémoire
     * @returns {number} La valeur stockée
     */
    rappeler: function() {
        return this.valeur;
    },

    /**
     * Ajoute une valeur à la mémoire
     * @param {number} montant - La valeur à ajouter
     */
    ajouter: function(montant) {
        this.valeur += montant;
        this._notifierChangement();
    },

    /**
     * Soustrait une valeur de la mémoire
     * @param {number} montant - La valeur à soustraire
     */
    soustraire: function(montant) {
        this.valeur -= montant;
        this._notifierChangement();
    },

    /**
     * Stocke une valeur en mémoire (remplace)
     * @param {number} valeur - La valeur à stocker
     */
    stocker: function(valeur) {
        this.valeur = valeur;
        this._notifierChangement();
    },

    /**
     * Vérifie s'il y a quelque chose en mémoire
     * @returns {boolean} True si mémoire non vide
     */
    estVide: function() {
        return this.valeur === 0;
    },

    /**
     * Formatte la valeur mémoire pour affichage
     * @returns {string} La valeur formatée
     */
    afficherValeur: function() {
        return this.valeur.toString();
    },

    /**
     * Callbacks pour notifications de changement
     */
    _callbacks: [],

    /**
     * Souscrire aux changements de mémoire
     * @param {function} callback - Fonction à appeler lors de changement
     */
    surChangement: function(callback) {
        this._callbacks.push(callback);
    },

    /**
     * Notifie tous les observateurs de changement
     * @private
     */
    _notifierChangement: function() {
        this._callbacks.forEach(callback => callback(this.valeur));
    },
};

/**
 * Expose le module globalement
 */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GestionMémoire;
}
