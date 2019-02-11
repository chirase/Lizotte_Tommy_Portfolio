
// Si on clique sur le bouton burger
function afficherMasquer() {
    if (document.getElementById("burger").dataset.actif == "false") {
        document.getElementById("burger").dataset.actif = "true";
        document.getElementsByClassName("global")[0].className = "globalActif";
        document.getElementById("burger").className = "boutonBurgerActif";

    }

    else if (document.getElementById("burger").dataset.actif == "true") {
        document.getElementById("burger").dataset.actif = "false"
        document.getElementsByClassName("globalActif")[0].className = "global";
        document.getElementById("burger").className = "boutonBurger";
    }
    
}

// Si on clique sur la section 
function fermerNav(){
    if (document.getElementById("burger").dataset.actif == "true") {
        document.getElementById("burger").dataset.actif = "false"
        document.getElementsByClassName("globalActif")[0].className = "global";
        document.getElementById("burger").className = "boutonBurger";
    }
}
