//Utilisation d'un mode strict
'use strict';

//Création ou récupération de l'espace de nom pour le jeu : Leheros
var Blitz = Blitz || {};

//Propriétés et/ou constantes pour le jeu
Blitz = {
    flipImg : null,
    TAILLE_HERBE: 60,
    NOM_LOCAL_STORAGE: "scoreJeuBlitz", //Sauvegarde et enregistrement du meilleur score 
    //Variables pour le jeu 
    musique : null,
    temps: 0, // Temps de jeu (s'incrémente)
    score: 0, // Le score du jeu
    meilleurScore: 0 //Meilleur score antérieur enregistré 
    
};



//On créera le jeu quand la page HTML sera chargée
window.addEventListener("load", function (pEvt) {

    //Création d'un jeu 
    var leJeu = new Phaser.Game(640, 960);

    //Ajout des états du jeu, et sélection de l'état au démarrage
    leJeu.state.add("Demarrage", Blitz.Demarrage);
    leJeu.state.add("ChargementMedias", Blitz.ChargementMedias);
    leJeu.state.add("Menu", Blitz.Menu);
    leJeu.state.add("Instructions", Blitz.Instructions);
    leJeu.state.add('Jeu', Blitz.Jeu);
    leJeu.state.add("FinJeu", Blitz.FinJeu);

    //Vérification d'un meilleur score antérieur enregistré

    Blitz.meilleurScore = localStorage.getItem(Blitz.NOM_LOCAL_STORAGE) == null ? 0 : localStorage.getItem(Blitz.NOM_LOCAL_STORAGE);


    //État dun jeu au démarrage
    leJeu.state.start("Demarrage");

}, false);
