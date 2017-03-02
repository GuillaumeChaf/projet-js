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
	document.addEventListener("keydown", bougerPersoX); 

    
}

function getBallonX() {
	// on récupère la variable "left" du ballon
	var xString = ballon.style.left;
	
	// on récupère uniquement les "nombres" correspondant à la position en x du ballon ( c'est à dire, on enlève le "px" )
	var xNombre =  xString.slice(0, xString.length-2);
	
	// on divise par un afin de retourner un nombre et pas une chaine de caractères
	return xNombre / 1;
}

function bougerPersoX(event) {
	console.log(event); 
	var X=joueur.style.left; //position sur l'axe des x par exemple 10px
	var tailleX=X.length; //on obtient la taille du tableau récupéré
	var positionX=X.slice(0, tailleX-2); //on récupère seulement les nombres sans les px
	
	
	if (event.keyCode === 39) {
		if(positionX<1360) {
			//on bouge le personnage vers la droite 
			var newPosition=(Number (positionX) + 10)+"px"; 
			joueur.style.left=newPosition;
			ballon.style.left=(getBallonX()+10)+"px"; 
		} 
		
		
	}
	if(event.keyCode===37) {
		//on bouge le personnage vers la gauche 
		if( positionX >410) {
			var newPosition=(Number (positionX) -10)+"px"; 
		
			joueur.style.left=newPosition; 
			ballon.style.left=(getBallonX()-10)+"px"; 
		}
	}
	
	
}
