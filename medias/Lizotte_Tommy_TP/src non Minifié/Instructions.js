"use strict"
    var Blitz = Blitz || {};



    Blitz.Instructions = function (){}

    Blitz.Instructions.prototype = {

        create: function () {
            //creer le fond du jeu
            var fondMenu = this.add.image(this.game.width / 2, this.game.height / 2, 'ecranMenu');
            fondMenu.anchor.set(0.5);
             var style1 = {
                font: "bold 30px Arial",
                fill: "#FFFFFF",
                align: "center"
            };
            var infoText = this.add.text(this.game.width/2,this.game.height/3,"Vous devez survivre ! \nUtilisez la touche espace ,\ncliquez ou touchez l'écran du jeu \nafin d'attaquer.", style1);
            infoText.anchor.set(0.5);
        this.creerBouton();


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
            this.state.start("Jeu")
            //Faire jouer le son de bouton
            this.add.audio("sonBouton", 1).play();

        }

    } //Fin IntroJeu.prototype
