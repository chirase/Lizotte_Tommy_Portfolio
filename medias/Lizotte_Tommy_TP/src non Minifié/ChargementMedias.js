//utilisation d'un mode strict
"use strict";

   var Blitz = Blitz || {};

    Blitz.ChargementMedias = function (){};

    Blitz.ChargementMedias.prototype = {

        init: function () {
            //Changer la couleur de l'écran du jeu
            this.stage.backgroundColor = "#000000";
            
        },

        preload: function () {
            //Charger les images du jeu
            //Chemin commun à toutes les feuilles de sprite
            this.load.path = "medias/img/";
            this.load.spritesheet('hero', 'joueur.png', 180, 180);
            this.load.image('fondJeu', 'arriere.png');
            this.load.spritesheet('boutonDemarrer', 'demarrer.png', 550, 250);
            this.load.image('ecranMenu', 'ecranMenu.png');
            this.load.image('ecranMort', 'ecranMort.png');
            this.load.spritesheet('ennemi', 'ennemi.png', 180, 180);
            this.load.image('epee', 'epee.png');
            this.load.image('fleur', 'fleur.png');
            this.load.image('herbe1', 'herbe1.png');
            this.load.image('herbe2', 'herbe2.png');
            this.load.image('herbe3', 'herbe3.png');
            this.load.image('heroIdle', 'joueurIdle.png');
            this.load.image('iconeOr', 'or.png');
            this.load.image('pisteJeu', 'piste.png');
            this.load.image('roche', 'roche.png');
            this.load.image('titreMenu', 'titre.png');
            this.load.image('vie', 'vie.png');

            //Charger les sons
            //Chemin commun à tous les sons
            this.load.path = "medias/sons/";
            this.load.audio("sonIntro", ["Chippytoon.wav"]);
            this.load.audio("sonJeu", ["slow_melancholic_theme_c64_style_long_version_with_refrain.ogg"]);
            this.load.audio("sonBouton", ["bouton.mp3"]);
            this.load.audio("sonFin", ["Cold Moon.wav"]);
            this.load.audio("coup1", ["coup1.mp3"]);
            this.load.audio("coup2", ["coup2.mp3"]);
            this.load.audio("coup3", ["coup3.mp3"]);
            this.load.audio("mort", ["mort.mp3"]);



            //Afficher la barre de chargement - Celle-ci doit être de type sprite 
            var barreChargement = this.add.sprite(0, this.game.height / 2, "barreImg");
            barreChargement.anchor.setTo(0, 0.5);
            this.load.setPreloadSprite(barreChargement);

        },
        
        create: function(){
         this.game.state.start("Menu"); 
        }
    };