// Tous les boutons dans un array
var alesAs = document.querySelectorAll("a");





//fonction qui enleve le check du menu afin d'éviter les bug
// Elle désactive le check quand la page atteint 980px de width
var widthDoc = 0 ;
var intervalFonction = setInterval(viewPortSize , 100);
function viewPortSize()
{
   widthDoc = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
if (widthDoc > 980)
    {
        document.getElementById("chkBoutonBurger").checked = false;
    } 
}
//------------------------------------------------------------------


// S'assure que le paramètre disabled n'est pas undefined
document.styleSheets[1].disabled = true;


/*
*Fonction qui désactive ou réactive la feuille de style qui 
*contient modifications de couleurs
*/


alesAs[0].addEventListener( "click", function(){
        
        if (document.styleSheets[1].disabled == false)
        {
         document.styleSheets[1].disabled  = true;
        }
        else if (document.styleSheets[1].disabled == true){document.styleSheets[1].disabled = false;}
})

alesAs[1].addEventListener("click", function(){
    if (document.body.getAttribute("class") != "rotationMoi"){
    document.body.setAttribute("class", "rotationMoi");
    } else {document.body.setAttribute("class", "pasRotationMoi");}
})


alesAs[2].addEventListener("click",function(){
    if (document.querySelector("h1").style.animation == "" || document.querySelector("h1").style.animation == undefined ){
    document.querySelector("h1").style.animation = "article5 3s infinite linear";
    } else {document.querySelector("h1").style.animation = "";}
})

alesAs[3].addEventListener("click", function(){
   if (document.body.getElementsByTagName("section")[0].style.animation == "" || document.body.getElementsByTagName("section")[0].style.animation == undefined ){
    document.body.getElementsByTagName("section")[0].style.animation = "rotationContenu 5s infinite linear";
    } else {document.body.getElementsByTagName("section")[0].style.animation = "";}
})
