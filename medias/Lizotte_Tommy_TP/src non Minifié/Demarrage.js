//Utilisation d'un mode strict
"use strict";


//Création ou récupération de l'espace de nom pour le jeu : Blitz
var Blitz = Blitz || {};


/**
 * Classe permettant de définir l'écran (state)
 * pour les ajustements au démarrage du jeu
 */

Blitz.Demarrage = function () {
};

Blitz.Demarrage.prototype = {
    init: function () {
        //Ajuster l'échelle du jeu et le centrer dans l'écran
        this.scale.isGamePortrait;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        if (!this.game.device.desktop){
        this.scale.forceOrientation(false, true);
        this.scale.enterIncorrectOrientation.add(this.ecranPaysage, this);
        this.scale.leaveIncorrectOrientation.add(this.ecranPortrait, this);
            }
    },

    preload: function () {
        //Chargement de la barre de chargement...
        this.load.image("barreImg", "medias/img/barreChargement.png");
        this.load.image("flipImg", "medias/img/flip.png");

    },

    create: function () {
        //Quand les ajustements sont faits - on charge les médias
        this.game.state.start("ChargementMedias");
    },
    ecranPaysage: function () {
        Blitz.flipImg = this.add.image(this.game.width/2,this.game.height/2,"flipImg");
        Blitz.flipImg.anchor.set(0.5);
        this.game.paused = true;
        Blitz.flipImg.height = this.game.height;
    },

    ecranPortrait: function () {
        Blitz.flipImg.destroy();
                this.game.paused = false;

    }
};
