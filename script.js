// Evenement déclenché lorsque le DOM a fini de charger, qui va appeller notre fonction setup()
document.addEventListener("DOMContentLoaded", setup);

var body; // variable correspondant au body, servant à simplifier la lecture du code
var terrain; // variable correspondant au terrain de jeu (div), servant à simplifier la lecture du code

var fond; // variable correspondant au fond (img), servant à simplifier la lecture du code
var joueur; // variable correspondant au joueur (img), servant à simplifier la lecture du code
var ballon; // variable correspondant au ballon (img), servant à simplifier la lecture du code

// fonction d'initialisation du jeu
function setup() {
    
    // on initialise les variables globales body et terrain
    body = document.getElementById('body');
    terrain = document.getElementById('terrain');

    // on enleve le margin par defaut du body qui décale légèrement le jeu vers la droite et le bas
    body.style.margin = "0px";

    //
    //  Fond
    //

    // on ajoute l'image de fond du jeu
    var imageFond  = document.createElement("img");
    imageFond.src = "./fond.jpg";
    imageFond.id = "fond";
    terrain.appendChild(imageFond);

    fond = document.getElementById('fond');

    // on redimensionne le fond du terrain de jeu
    fond.width = window.innerWidth;
    fond.height = window.innerHeight;

    // on positionne le plateau en absolu afin de pouvoir si besoin est, modifier sa position avec les propriétés CSS "top" et "left"
    fond.style.position = "absolute";

    //
    //  Joueur
    //

    // on ajoute l'image du joueur
    var imageJoueur = document.createElement("img");
    imageJoueur.src = "./joueur.png";
    imageJoueur.id = "joueur";
    terrain.appendChild(imageJoueur);

    joueur = document.getElementById('joueur');

    // on redimensionne le joueur
    joueur.style.width = "100px";

    // on positionne le joueur en absolu afin de pouvoir si besoin est, modifier sa position avec les propriétés CSS "top" et "left"
    joueur.style.position = "absolute";

    //
    //  Ballon
    //

    // on ajoute l'image du ballon
    var imageBallon = document.createElement("img");
    imageBallon.src = "./ballon.png";
    imageBallon.id = "ballon";
    terrain.appendChild(imageBallon);

    ballon = document.getElementById('ballon');

    // on redimensionne le ballon
    ballon.style.width = "40px";

    // on positionne le ballon en absolu afin de pouvoir si besoin est, modifier sa position avec les propriétés CSS "top" et "left"
    ballon.style.position = "absolute";

    //
    // Positionnement initial du joueur et du ballon
    //

    joueur.style.left = (window.innerWidth / 2) - 100 + "px"; // au centre
    joueur.style.top = (2/3) * window.innerHeight + "px"; // a 2/3 du bas de l'image = au centre

    ballon.style.left = (window.innerWidth / 2) - 45 + "px"; // au centre
    ballon.style.top = (2/3) * window.innerHeight + 50 + "px"; // a 2/3 du bas de l'image = au centre

    //
    // Ajout des écouteurs d'événement
    // 


    
}