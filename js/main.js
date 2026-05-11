/**
 * =====================================================
 * MAIN.JS - ORCHESTRATION DE LA CALCULATRICE
 * Description: Gestion de l'interface et des interactions
 * =====================================================
 */

class CalculatriceScientifique {
    constructor() {
        /**
         * État interne de la calculatrice
         */
        this.affichage = '0';
        this.expression = '';
        this.historique = [];
        this.modeAngle = 'degres';
        this.dernierResultat = 0;
        this.parenthesesOuvertes = 0;

        /**
         * Initialiser l'interface
         */
        this._initialiserInterface();
        this._attacherEvenements();
        this._chargerHistorique();
    }

    /**
     * Initialise les références DOM
     * @private
     */
    _initialiserInterface() {
        // Affichage
        this.elemAffichage = document.getElementById('affichage');
        this.elemHistoriqueAffichage = document.getElementById('historique');

        // Panneaux
        this.panneauMemoire = document.getElementById('panneau-memoire');
        this.valeurMemoire = document.getElementById('valeur-memoire');

        // Sélecteurs
        this.selectAngle = document.getElementById('selectAngle');

        // Conteneurs de boutons
        this.listeHistorique = document.getElementById('listeHistorique');

        // Initialiser l'observateur de mémoire
        GestionMémoire.surChangement((valeur) => {
            this.valeurMemoire.textContent = AnalyseurExpression.formatterResultat(valeur);
        });

        // Mettre à jour l'affichage initial
        this.mettreAJourAffichage();
    }

    /**
     * Attacher tous les événements
     * @private
     */
    _attacherEvenements() {
        // Boutons nombres et opérateurs basiques
        document.querySelectorAll('.btn-nombre').forEach(btn => {
            btn.addEventListener('click', () => this._traiterNombre(btn.textContent));
        });

        // Boutons de contrôle
        document.getElementById('btnEffacer').addEventListener('click', () => this.effacer());
        document.getElementById('btnRetour').addEventListener('click', () => this.retourArriere());
        document.getElementById('btnEgal').addEventListener('click', () => this.evaluer());
        document.getElementById('btnMemoire').addEventListener('click', () => this.basculerPanneauMemoire());

        // Boutons mémoire
        document.getElementById('btnMC').addEventListener('click', () => this.memoireEffacer());
        document.getElementById('btnMR').addEventListener('click', () => this.memoireRappeler());
        document.getElementById('btnMPlus').addEventListener('click', () => this.memoireAjouter());
        document.getElementById('btnMMoins').addEventListener('click', () => this.memoiseSoustraire());

        // Boutons fonctions scientifiques
        document.querySelectorAll('.btn-fonction').forEach(btn => {
            btn.addEventListener('click', () => this._traiterFonction(btn.dataset.fonction));
        });

        // Boutons constantes
        document.querySelectorAll('.btn-constante').forEach(btn => {
            btn.addEventListener('click', () => this._traiterConstante(btn.dataset.constante));
        });

        // Sélecteur d'angles
        this.selectAngle.addEventListener('change', (e) => {
            this.modeAngle = e.target.value;
        });

        // Bouton effacer historique
        document.getElementById('btnEffacerHistorique').addEventListener('click', () => {
            this.effacerHistorique();
        });

        // Clavier
        document.addEventListener('keydown', (e) => this._gererClavier(e));
    }

    /**
     * Traite l'entrée d'un nombre ou opérateur
     * @private
     */
    _traiterNombre(valeur) {
        if (valeur === '.') {
            // Vérifier qu'il n'y ait pas déjà un point
            const dernierSegment = this.expression.split(/[+\-*/]/).pop();
            if (dernierSegment.includes('.')) return;
        }

        // Si on a un résultat, réinitialiser
        if (this.affichage === this.dernierResultat.toString() && /[0-9]/.test(valeur)) {
            this.expression = '';
        }

        this.expression += valeur;
        this.mettreAJourAffichage();
    }

    /**
     * Traite les fonctions scientifiques
     * @private
     */
    _traiterFonction(nomFonction) {
        try {
            const valeur = parseFloat(this.affichage);
            let resultat;

            switch(nomFonction) {
                case 'sin':
                    resultat = FonctionsScientifiques.sinus(valeur);
                    break;
                case 'cos':
                    resultat = FonctionsScientifiques.cosinus(valeur);
                    break;
                case 'tan':
                    resultat = FonctionsScientifiques.tangente(valeur);
                    break;
                case 'arcsin':
                    resultat = FonctionsScientifiques.arcSinus(valeur);
                    break;
                case 'arccos':
                    resultat = FonctionsScientifiques.arcCosinus(valeur);
                    break;
                case 'arctan':
                    resultat = FonctionsScientifiques.arcTangente(valeur);
                    break;
                case 'log':
                    resultat = FonctionsScientifiques.logarithme(valeur);
                    break;
                case 'ln':
                    resultat = FonctionsScientifiques.logarithmeNaturel(valeur);
                    break;
                case 'exp':
                    resultat = FonctionsScientifiques.exponentielle(valeur);
                    break;
                case 'racine':
                    resultat = FonctionsScientifiques.racineCarre(valeur);
                    break;
                case 'factorielle':
                    resultat = FonctionsScientifiques.factorielle(valeur);
                    break;
                case 'absolu':
                    resultat = OperateursBasiques.absolu(valeur);
                    break;
                case 'puissance':
                    this.expression = this.affichage + '^';
                    this.mettreAJourAffichage();
                    return;
                case 'racine-n':
                    this.expression = 'racineN(';
                    this.parenthesesOuvertes++;
                    this.mettreAJourAffichage();
                    return;
                case 'pourcentage':
                    resultat = valeur / 100;
                    break;
                case 'parenthese':
                    this._ajouterParenthese();
                    return;
                default:
                    throw new Error('Fonction non reconnue');
            }

            this.expression = AnalyseurExpression.formatterResultat(resultat);
            this.dernierResultat = resultat;
            this.mettreAJourAffichage();

        } catch (erreur) {
            this._afficherErreur(erreur.message);
        }
    }

    /**
     * Traite l'ajout de constantes
     * @private
     */
    _traiterConstante(constante) {
        switch(constante) {
            case 'pi':
                this.expression += 'π';
                break;
            case 'e':
                this.expression += 'e';
                break;
        }
        this.mettreAJourAffichage();
    }

    /**
     * Ajoute des parenthèses
     * @private
     */
    _ajouterParenthese() {
        if (this.parenthesesOuvertes === 0) {
            this.expression += '(';
            this.parenthesesOuvertes++;
        } else {
            this.expression += ')';
            this.parenthesesOuvertes--;
        }
        this.mettreAJourAffichage();
    }

    /**
     * Gère les événements clavier
     * @private
     */
    _gererClavier(e) {
        const touche = e.key;

        if (/[0-9]/.test(touche)) {
            this._traiterNombre(touche);
        } else if (touche === '.') {
            this._traiterNombre('.');
        } else if (touche === '+' || touche === '-' || touche === '*' || touche === '/') {
            this._traiterNombre(touche);
        } else if (touche === 'Enter' || touche === '=') {
            e.preventDefault();
            this.evaluer();
        } else if (touche === 'Backspace') {
            e.preventDefault();
            this.retourArriere();
        } else if (touche.toLowerCase() === 'c') {
            this.effacer();
        }
    }

    /**
     * Met à jour l'affichage principal
     */
    mettreAJourAffichage() {
        if (this.expression === '') {
            this.affichage = '0';
        } else {
            this.affichage = this.expression;
        }
        this.elemAffichage.value = this.affichage;
    }

    /**
     * Évalue l'expression
     */
    evaluer() {
        try {
            if (this.expression === '') return;

            // Remplacer ^ par pow
            let expressionAEvaluer = this.expression.replace(/\^/g, '**');
            
            // Remplacer racineN(x,n) par pow(x, 1/n)
            expressionAEvaluer = expressionAEvaluer.replace(/racineN\(([^,]+),([^)]+)\)/g, 
                                                          'pow($1, 1/$2)');

            const resultat = AnalyseurExpression.evaluer(expressionAEvaluer, this.modeAngle);
            const resultatFormate = AnalyseurExpression.formatterResultat(resultat);

            // Ajouter à l'historique
            this._ajouterHistorique(`${this.expression} = ${resultatFormate}`);

            // Mettre à jour l'affichage
            this.expression = resultatFormate;
            this.dernierResultat = resultat;
            this.mettreAJourAffichage();

            // Afficher l'historique temporairement
            this.elemHistoriqueAffichage.textContent = `= ${resultatFormate}`;
            setTimeout(() => {
                this.elemHistoriqueAffichage.textContent = '';
            }, 2000);

        } catch (erreur) {
            this._afficherErreur(erreur.message);
        }
    }

    /**
     * Efface tout
     */
    effacer() {
        this.expression = '';
        this.affichage = '0';
        this.parenthesesOuvertes = 0;
        this.elemHistoriqueAffichage.textContent = '';
        this.mettreAJourAffichage();
    }

    /**
     * Retour arrière
     */
    retourArriere() {
        if (this.expression.endsWith('(')) {
            this.parenthesesOuvertes--;
        } else if (this.expression.endsWith(')')) {
            this.parenthesesOuvertes++;
        }
        this.expression = this.expression.slice(0, -1);
        this.mettreAJourAffichage();
    }

    /**
     * Bascule le panneau mémoire
     */
    basculerPanneauMemoire() {
        this.panneauMemoire.classList.toggle('masque');
    }

    /**
     * Opérations mémoire
     */
    memoireEffacer() {
        GestionMémoire.effacer();
    }

    memoireRappeler() {
        const valeur = GestionMémoire.rappeler();
        this.expression = valeur.toString();
        this.mettreAJourAffichage();
    }

    memoireAjouter() {
        try {
            const valeur = parseFloat(this.affichage);
            GestionMémoire.ajouter(valeur);
            this.effacer();
        } catch (erreur) {
            this._afficherErreur('Erreur mémoire');
        }
    }

    memoiseSoustraire() {
        try {
            const valeur = parseFloat(this.affichage);
            GestionMémoire.soustraire(valeur);
            this.effacer();
        } catch (erreur) {
            this._afficherErreur('Erreur mémoire');
        }
    }

    /**
     * Gestion de l'historique
     */
    _ajouterHistorique(entree) {
        this.historique.unshift(entree);
        if (this.historique.length > 50) {
            this.historique.pop();
        }
        this._sauvegarderHistorique();
        this._afficherHistorique();
    }

    _afficherHistorique() {
        this.listeHistorique.innerHTML = '';
        this.historique.forEach((entree, index) => {
            const div = document.createElement('div');
            div.className = 'element-historique';
            div.textContent = entree;
            div.addEventListener('click', () => {
                const resultat = entree.split(' = ')[1];
                this.expression = resultat;
                this.mettreAJourAffichage();
            });
            this.listeHistorique.appendChild(div);
        });
    }

    effacerHistorique() {
        this.historique = [];
        this._sauvegarderHistorique();
        this._afficherHistorique();
    }

    _sauvegarderHistorique() {
        localStorage.setItem('historique-calculatrice', JSON.stringify(this.historique));
    }

    _chargerHistorique() {
        const historiqueSauve = localStorage.getItem('historique-calculatrice');
        if (historiqueSauve) {
            this.historique = JSON.parse(historiqueSauve);
            this._afficherHistorique();
        }
    }

    /**
     * Affiche une erreur
     * @private
     */
    _afficherErreur(message) {
        this.affichage = `ERREUR: ${message}`;
        this.elemAffichage.value = this.affichage;
        this.elemHistoriqueAffichage.textContent = '';
        setTimeout(() => {
            this.effacer();
        }, 2000);
    }
}

/**
 * Initialise la calculatrice au chargement du DOM
 */
document.addEventListener('DOMContentLoaded', () => {
    const calculatrice = new CalculatriceScientifique();
    console.log('✓ Calculatrice scientifique initialisée');
});
