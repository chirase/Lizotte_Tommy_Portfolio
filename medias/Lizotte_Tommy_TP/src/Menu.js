"use strict"
var Blitz=Blitz||{};Blitz.Menu=function(){}
Blitz.Menu.prototype={create:function(){var fondMenu=this.add.image(this.game.width/2,this.game.height/2,'ecranMenu');fondMenu.anchor.set(0.5);Blitz.musique=this.add.audio("sonIntro",1);Blitz.musique.loopFull();var leTitre=this.add.image(this.game.width/2,-this.game.height,'titreMenu');leTitre.anchor.set(0.5);leTitre.alpha=0;var entrerTitre=this.add.tween(leTitre).to({y:this.game.height/4,alpha:1},800,Phaser.Easing.Linear.None,!0,0);entrerTitre.onComplete.add(this.creerBouton,this)},creerBouton:function(objCible){var boutonDemarrer=this.add.button(this.game.width/2,this.game.height*1.5,'boutonDemarrer',this.debuterJeu,this,0,0,1);boutonDemarrer.anchor.set(0.5);var entrerBouton=this.add.tween(boutonDemarrer).to({y:this.game.height/1.3},500,Phaser.Easing.Linear.None,!0,0)},debuterJeu:function(objCible){this.state.start("Instructions")
this.add.audio("sonBouton",1).play()}}