/************RÈGLES DU JEU******************/
/* Vous avez 3 vies et vous pouvez frapper */
/*  vos adversaires avec la touche espace 
/*   Ou en tapant l'écran                   */
/*******************************************/


////////////////////////////////
//            Jeu             //
////////////////////////////////    

"use strict";
var Blitz = Blitz || {};
Blitz.Jeu = function () {};

Blitz.Jeu.prototype = {

    init: function () {
        //Variables ou propriétés du jeu comme tel
        // L'objet joueur
        this.leJoueur = null;
        // Boolean mort du joueur
        this.estMort = false;
        // Float vitesse de défilement
        this.vitesseJeu = 1;
        // Objet route qui défile
        this.chemin1 = null;
        this.chemin2 = null;
        //Objet ennemi
        this.ennemis = null;
        //temps restant avant la prochaine apparition
        this.intervalleEnnemi = 0;
        // L'objet d'interval
        this.intervalle = null;
        //L'arme du joueur
        this.epee = null;
        //tween d'attaque 
        this.AnimAttaque = null;
        //Boolean Si le joueur peut attaquer
        this.peutAttaquer = false;
        //attaquer Boolean si il attaque
        this.attaquer = false;
        //Initialiser le score
        Blitz.score = 0;
        Blitz.temps = 0;
        //Modifier la couleur d'arrière-plan du jeu
        this.stage.backgroundColor = "#14530f";

        //Les vies (objets)
        this.lesVies = [];
        //La vie (integer)
        this.vie = 3;
        //les points (objets)
        this.pointage = null;
        this.pointageImage = null;

        //Le temp(objet)
        this.tempsChrono = 0;

        //Les herbes
        this.herbes = [];

    },

    create: function () {
        //Musique
        //Arreter la musique d'intro
        Blitz.musique.stop()
        //Démarrer la musique du jeu
        Blitz.musique = this.add.audio("sonJeu", 1).loopFull();
        this.input.MAX_POINTERS = 1;

        //ajouter le fond du jeu
        var leFond = this.add.image(this.game.width / 2, this.game.height / 2, 'fondJeu');
        leFond.anchor.set(0.5);

        //creer deux chemins enchainés

        this.chemin1 = this.add.sprite(this.game.width / 2, this.game.height, 'pisteJeu');
        this.chemin2 = this.add.sprite(this.game.width / 2, this.chemin1.y - this.chemin1.height, 'pisteJeu');

        //Pour le debug des chemins
        //this.chemin1.tint = Math.random() * 0xffffff;
        //this.chemin2.tint = Math.random() * 0xffffff;

        this.chemin2.anchor.set(0.5);
        this.chemin1.anchor.set(0.5);

        //creer le joueur
        this.leJoueur = this.add.sprite(this.game.width / 2, this.game.height, 'hero');
        this.leJoueur.anchor.set(0.5);
        //placer le joueur a l'exterieur du jeu
        this.leJoueur.y = this.game.height + this.leJoueur.height / 2;
        //creer et demarrer le tween d'entré du joueur
        var entrerJoueur = this.add.tween(this.leJoueur).to({
            y: this.game.height - this.leJoueur.height
        }, 2000, Phaser.Easing.Linear.None, true, 0);

        entrerJoueur.onComplete.add(this.demarrage, this);
        // creer animation joueur
        this.leJoueur.animations.add("marche", [0, 1], 3, true);
        this.leJoueur.animations.play("marche");
        // joueur physique
        this.physics.enable(this.leJoueur, Phaser.Physics.ARCADE);
        this.leJoueur.body.width = this.leJoueur.width / 1.5;
        this.leJoueur.body.offset.x = this.leJoueur.width / 5;
        this.leJoueur.body.offset.y = this.leJoueur.height / 15;
        // ennemi physique
        this.ennemis = this.add.physicsGroup(Phaser.Physics.ARCADE);
        //Associer les touches de clavier
        this.toucheEspace = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    },

    //Fonction lancée quand le joueur atteint sa position de course
    //Importante car elle indique le début de tout les compteurs
    demarrage: function (objCible) {

        //Accellerer le joueur , la vitesse de defilement
        this.leJoueur.animations._anims.marche.speed = 5;
        this.vitesseJeu = 10;
        //Demarrage de l'apparition des monstres
        this.intervalleEnnemi = 1;
        this.intervalle = this.time.events.loop(Phaser.Timer.SECOND, this.decrementeTimer, this);

        //Créer l'arme du joueur
        this.epee = this.add.sprite(this.leJoueur.x, this.leJoueur.y - (this.leJoueur.height / 2.5), 'epee');
        this.epee.anchor.set(0.5, 1);
        this.epee.scale = {
            x: 1.5,
            y: 1.5
        };
        // Lui ajouter une animation d'attaque
        this.AnimAttaque = this.add.tween(this.epee).to({
            angle: 90
        }, 300, Phaser.Easing.Linear.None, false, 0);
        this.AnimAttaque.onComplete.add(this.prochaineAttaque, this);
        this.epee.alpha = 0;

        //Permettre d'attaquer
        this.peutAttaquer = true;

        //donner un corp physique à l'arme
        this.physics.enable(this.epee, Phaser.Physics.ARCADE);

        //Afficher les trois vies
        for (var i = 0; i < 3; i++) {
            var uneVie, posX, posY;
            /*J'utilise un switch car les positions des carrés sont 
            calculées en fonction du celle du premier carré.
            */
            switch (i) {
                case 0:
                    posX = this.game.width / 2;
                    posY = this.game.height;
                    break;
                case 1:
                    posX = this.lesVies[0].x - this.lesVies[0].width;
                    posY = this.game.height;

                    break;
                case 2:
                    posX = this.lesVies[0].x + this.lesVies[0].width;
                    posY = this.game.height;

                    ;
                    break;
            }
            uneVie = this.add.image(posX, posY, 'vie');
            uneVie.anchor.set(0.5, 1);
            this.lesVies.push(uneVie);
        }

        //Créer et afficher les points
        var style1 = {
            font: "bold 45px Arial",
            fill: "#FFFFFF",
            align: "center"
        };
        this.pointage = this.add.text(this.game.width / 7, this.game.height / 100, Blitz.score, style1);
        this.pointage.anchor.set(0.5, 0);
        this.pointageImage = this.add.image(this.game.width / 20, this.pointage.y - this.game.height / 100, 'iconeOr');
        this.pointageImage.anchor.set(0.5, 0);
        this.pointageImage.scale = {
            x: 0.7,
            y: 0.7
        };

        var style2 = {
            font: "bold 30px Arial",
            fill: "#FFFFFF",
            align: "center"
        };

        this.tempsChrono = this.add.text(this.game.width / 2, 0, Blitz.temps, style2);
        this.tempsChrono.anchor.set(0.5, 0);

        //Le pointage apparait par dessus l'icone d'or
        this.world.bringToTop(this.pointage);


        // a chaque 5ieme de seconde , une herbe est crée
        this.time.events.loop(Phaser.Timer.SECOND / 5, this.apparitionHerbe, this)


    },


    //Création d'herbes qui défilent à la vitesse de defilement ...
    //A la fin de leur «Tween» , ils sont détruits
    apparitionHerbe: function () {

        /* Bien que la fonction s'appelle apparitionHerbe , elle peut désormait faire apparaitre des roches ou des fleurs */
        var asNoms = ["herbe"+ this.rnd.integerInRange(1, 3),"roche","fleur"];
        
        var iObjAleatoire = this.rnd.integerInRange(0,2);

        var herbe = this.add.image(this.rnd.integerInRange(0, this.game.width), -Blitz.TAILLE_HERBE, asNoms[iObjAleatoire] );
        herbe.anchor.set(0.5);

        //si l'herbe touche la piste alors elle doit etre placé en dehors de celle-ci

        if (herbe.x > (this.game.width / 2 - this.chemin1.width / 2) && herbe.x < (this.game.width / 2 + this.chemin1.width / 2)) {
            herbe.x = (herbe.x > this.game.width / 2 - this.chemin1.width / 2) ? this.rnd.integerInRange(0, this.game.width / 2 - this.chemin1.width / 2) : this.rnd.integerInRange(this.game.width / 2 + this.chemin1.width / 2, this.game.width)


        }

        var herbeAnim = this.add.tween(herbe).to({
            y: this.game.height + Blitz.TAILLE_HERBE
        }, 15000 / this.vitesseJeu, Phaser.Easing.Linear.None, true, 0);
        //herbe.tint = 0x2E5933;
        herbe.scale = {
            x: 2,
            y: 2
        }


    },

    prochaineAttaque: function () {
        this.epee.alpha = 0;
        this.attaquer = false;
        //0.8 seconde d'attente entre chaque attaque
        this.time.events.add(Phaser.Timer.SECOND * 0.8, () => {
            this.peutAttaquer = true;
        });

    },

    //fonction appellé à chaque seconde 
    decrementeTimer: function () {

        //Le temps en jeu augmente d'une seconde
        Blitz.temps++;
        this.tempsChrono.text = Blitz.temps;
        //On l'affiche à un texte 

        //Décrementer le temps pour l'apparition d'un ennemi
        if (this.intervalleEnnemi > 0) {
            this.intervalleEnnemi--;
        } else {
            //creer un ennemi
            this.creerEnnemi();
        }
    },

    creerEnnemi: function () {
        //remettre un timer pour la prochaine apparition
        this.intervalleEnnemi = this.rnd.integerInRange(0, 2);
        //creer l'ennemi
        var ennemi = this.ennemis.create(this.rnd.integerInRange(0, this.game.width), -this.game.height / 10, 'ennemi');
        ennemi.animations.add("marche", [0, 1], 3, true);
        ennemi.animations.play("marche");
        ennemi.anchor.set(0.5);
        //tween de l'ennemi vers le joueur
        var ennemiSurJoueur = this.add.tween(ennemi).to({
            y: this.leJoueur.y,
            x: this.leJoueur.x,
        }, 500 * this.vitesseJeu, Phaser.Easing.Linear.None, true, 0);

        // S'assurer que le joueur est a un calque plus elevé que les ennemis
        this.world.bringToTop(this.leJoueur);


    },

    update: function () {
        //cacher l'épée à la mort
        if (this.estMort) {
            this.epee.alpha = 0;
        }

        //on attaque lorsque la touche espace est enfoncée ou que l'écran a été touchée
        if (this.peutAttaquer) {
            if (this.toucheEspace.isDown || this.input.pointer1.isDown) {
                //Jouer un son
                this.sonCoupAleatoire();
                //Afficher L,épée
                this.epee.alpha = 1;
                //Définir l'état du joueur
                this.attaquer = true;
                //Empecher le joueur d'attaquer a nouveau
                this.peutAttaquer = false;
                // Réinitialiser la rotation de l'épée
                this.epee.angle = -90;
                // Démarer la rotation de l'épée
                this.AnimAttaque.start();
            }
        }
        //Si le joueur touche un ennemi 
        this.physics.arcade.overlap(this.leJoueur, this.ennemis, this.recevoirDegat, null, this);

        //Si l'épée touche un ennemi , et le joueur est en vie
        //et que le joueur n'attaque pas déja ou qu'il peut attaquer
        if (this.attaquer && !this.peutAttaquer && !this.estMort) {
            this.physics.arcade.overlap(this.epee, this.ennemis, this.mortEnnemie, null, this);
        }


        // Faire defiler les routes
        this.chemin1.y += this.vitesseJeu;
        this.chemin2.y += this.vitesseJeu;

        //Faire defiler les routes l'une par dessus l'autre
        if (this.chemin1.y > this.game.height + (this.chemin2.height / 2)) {
            this.chemin1.y = this.chemin2.y - this.chemin2.height
        }
        if (this.chemin2.y > this.game.height + (this.chemin2.height / 2)) {
            this.chemin2.y = this.chemin1.y - this.chemin1.height
        }



    },

    mortEnnemie: function (obj, ennemi) {
        //Jouer un son pour la mort de l'ennemi
        this.add.audio("mort", 1).play();

        ennemi.body.enable = false;
        var mortEnnemieTween = this.add.tween(ennemi).to({
            alpha: 0,
            tint: "red"
        }, 300, Phaser.Easing.Linear.None, true, 0);
        mortEnnemieTween.onComplete.add(() => {
            ennemi.destroy(), Blitz.score += 5
            //Affecter le score au texte
            this.pointage.text = Blitz.score;
        })
    },

    sonCoupAleatoire: function () {
        var iAleatoire = this.rnd.integerInRange(1, 3);
        this.add.audio("coup" + iAleatoire, 1).play();
    },

    recevoirDegat: function (obj, ennemi) {
        //Jouer un son pour la reception de degats
        if (this.estMort == false) {
            this.add.audio("mort", 1).play();

            this.mortEnnemie(obj, ennemi);
            this.vie--;
            this.vieTeinteInitiale = this.lesVies[0].tint;

            //Enlever toute les vies
            for (var i = 0; i <= 2; i++) {

                this.lesVies[i].tint = "red";
            }

            //Ajouter les vies selon le nombre de vie actuel
            for (var i = 0; i < this.vie; i++) {
                /*J'utilise un switch car mes carrés de vie apparaissent dans l'ordre 2 1 3 */
                switch (i) {
                    case 0:
                        this.lesVies[1].tint = this.vieTeinteInitiale;
                        break;
                    case 1:
                        this.lesVies[0].tint = this.vieTeinteInitiale;
                        this.lesVies[1].tint = this.vieTeinteInitiale;


                        break;
                    case 2:
                        this.lesVies[0].tint = this.vieTeinteInitiale;
                        this.lesVies[1].tint = this.vieTeinteInitiale;
                        this.lesVies[2].tint = this.vieTeinteInitiale;

                        break;

                }
            }

            if (this.vie <= 0) {
                this.mort(obj);
            }
        }


    },

    mort: function (obj) {

        if (this.estMort == false) {

            this.estMort = true;
            //Fin de la musique
            Blitz.musique.stop()

            //Création du *fantome du joueur qui amene a la fin du jeu*
            var fantome = this.add.sprite(this.leJoueur.x, this.leJoueur.y, 'heroIdle');
            fantome.anchor.set(0.5);
            // tween alpha pour l'effet de fantome
            var tweenFantome = this.add.tween(fantome).to({
                y: fantome.y - fantome.height,
                alpha: 0
            }, 2000, Phaser.Easing.Linear.None, true, 0);

            tweenFantome.onComplete.add(this.allerFinJeu, this);
            this.leJoueur.alpha = 0;
            this.vitesseJeu = 0;
            this.intervalleEnnemi = 1000;
        }


    },

    allerFinJeu: function () {
        this.state.start("FinJeu");
    }


}; //fin Jeu.prototype
