"use strict";

var Blitz = Blitz || {};

Blitz.FinJeu = function () {};

    Blitz.FinJeu.prototype = {

        init: function () {
            //Changer la couleur de l'écran du jeu
            this.stage.backgroundColor = 0x666666;
        },

        create: function () {
            //Musique de fin
            Blitz.musique = this.add.audio("sonFin", 1);
            Blitz.musique.loopFull();

            //creer le fond du jeu
            var fondMenu = this.add.image(this.game.width / 2, this.game.height / 2, 'ecranMort');
            fondMenu.anchor.set(0.5);
            //Créer un bouton pour rejouer
            var boutonRejouer = this.add.button(this.game.width / 2, this.game.height * 1.5, 'boutonDemarrer', this.rejouer, this, 0, 0, 1);
            boutonRejouer.scale = {
                x: 0.5,
                y: 0.5
            };
            boutonRejouer.anchor.set(0.5);
            // Créer une animation sur le bouton
            var entrerBouton = this.add.tween(boutonRejouer).to({
                y: this.game.height / 1.1
            }, 2000, Phaser.Easing.Linear.None, true, 0);

            var style1 = {
                font: "bold 64px Arial",
                fill: "#FFFFFF",
                align: "center"
            };
            var titreTxt = this.add.text(this.game.width / 2, 10, "FIN DU JEU\n", style1);
            titreTxt.anchor.set(0.5, 0);

            //Le texte
            var style2 = {
                font: "bold 32px ARIAL",
                fill: "#FFFFFF",
                align: "center"
            };
            //Vérification et enregistrement du meilleur score
            
            Blitz.meilleurScore = Math.max(Blitz.score, Blitz.meilleurScore);
            localStorage.setItem(Blitz.NOM_LOCAL_STORAGE, Blitz.meilleurScore);

            var leTexte = "Votre score:\n";
            leTexte += Blitz.score + " points\n\n";
            leTexte += "Meilleur score:\n";
            leTexte += Blitz.meilleurScore + " points\n\n";
            leTexte += "Vous avez survécu:\n";
            leTexte += Blitz.temps + " secondes"


            var finJeuTxt = this.add.text(this.game.width / 2, this.game.height / 2, leTexte, style2);
            finJeuTxt.anchor.set(0.5);


        },

        rejouer: function () {
            //Arreter la musique de fin
            Blitz.musique.stop();
            //Faire jouer le son de bouton
            this.add.audio("sonBouton", 1).play();
            //Arreter la musique d'intro
            this.state.start("Jeu");
        }

    } //fin ecranFinJeu.prototype