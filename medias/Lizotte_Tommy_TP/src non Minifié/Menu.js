"use strict"
    var Blitz = Blitz || {};



    Blitz.Menu = function (){}

    Blitz.Menu.prototype = {
        create: function () {

            //creer le fond du jeu
            var fondMenu = this.add.image(this.game.width / 2, this.game.height / 2, 'ecranMenu');
            fondMenu.anchor.set(0.5);
            //Démarer la musique d'intro
            //Réinitialiser la musique d'abord
            Blitz.musique = this.add.audio("sonIntro", 1);
            Blitz.musique.loopFull();
            //Créer un titre et un bouton d'intro à l'exterieur de la scene
            var leTitre = this.add.image(this.game.width / 2, -this.game.height, 'titreMenu');
            leTitre.anchor.set(0.5);
            leTitre.alpha = 0;

            //créer une animation sur le titre , elle demarre au debut 
            var entrerTitre = this.add.tween(leTitre).to({
                y: this.game.height / 4,
                alpha: 1
            }, 800, Phaser.Easing.Linear.None, true, 0);

            //Appel de la fonction pour creer le bouton
            entrerTitre.onComplete.add(this.creerBouton, this);



        },

        //Fonction qui creer le bouton et l'anime
        creerBouton: function (objCible) {
            var boutonDemarrer = this.add.button(this.game.width / 2, this.game.height * 1.5, 'boutonDemarrer', this.debuterJeu, this, 0, 0, 1);
            boutonDemarrer.anchor.set(0.5);
            // Créer une animation sur le bouton , elle sera lancée à la fin // de l'animation du titre
            var entrerBouton = this.add.tween(boutonDemarrer).to({
                y: this.game.height / 1.3
            }, 500, Phaser.Easing.Linear.None, true, 0);
        },

        debuterJeu: function (objCible) {
            this.state.start("Instructions")
            //Faire jouer le son de bouton
            this.add.audio("sonBouton", 1).play();

        }

    } //Fin IntroJeu.prototype
