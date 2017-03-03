// Evenement déclenché lorsque le DOM a fini de charger, qui va appeller notre fonction setup()
document.addEventListener("DOMContentLoaded", presetup);

var body; // variable correspondant au body, servant à simplifier la lecture du code
var terrain; // variable correspondant au terrain de jeu (div), servant à simplifier la lecture du code

var fond; // variable correspondant au fond (img), servant à simplifier la lecture du code
var joueur; // variable correspondant au joueur (img), servant à simplifier la lecture du code
var ballon; // variable correspondant au ballon (img), servant à simplifier la lecture du code
var regles= document.getElementById('regles'); //on recupère la div qui va afficher les règles 

var nbDeplacement; //compte le nombre de déplacement du personnage, on l'initialise à zero

var score=0;  //variable comptant le score
var TONscore=document.getElementById('tonScore');


var nbVie=5;


// variables concernant le tir
var enCoursDeTir = false; // vrai ssi le joueur est en train de tirer

var tempsDebutTir; // le timeStamp de l'event

//fonction permettant de charger une image de fond 
function chargerImage(img) {
	terrain = document.getElementById('terrain');
	var imageFond  = document.createElement("img");
    imageFond.src="./"+img; 
    imageFond.id = img;
    terrain.appendChild(imageFond);

    fond = document.getElementById(img);

    // on redimensionne le fond du terrain de jeu
    fond.width = 2 * window.innerWidth / 3;
    fond.height = 2 * window.innerHeight / 3;

    // on positionne le plateau en absolu afin de pouvoir si besoin est, modifier sa position avec les propriétés CSS "top" et "left"
    fond.style.position = "absolute";
    
}
//fonction permettant de commencer le feu
function presetup() {
	//chargement de l'écran de départ
	chargerImage('index.png'); 
	//événement à l'écoute d'une action sur une touche du clavier 
    body = document.getElementById('body');
    body.addEventListener("keydown", setup); 
    
	
}
// fonction d'initialisation du jeu
function setup() {
	
	
	//on supprime les fils du terrain, des fils peuvent être mis par la fonction presetup ou setup elle même
    supprimerFilsTerrain(); 
    // on initialise les variables globales body et terrain
    body = document.getElementById('body');
    //on supprime l'écouteur d'évènement sur le body que nous avons activé dans la fonction presetup
    body.removeEventListener("keydown", setup); 
    terrain = document.getElementById('terrain');

    // on enleve le margin par defaut du body qui décale légèrement le jeu vers la droite et le bas
    body.style.margin = "0px";

    //
    //  Fond
    //

	//chargement de l'image de fond
    chargerImage('fond.jpg');

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

    joueur.style.left = (fond.width / 2) - 50 + "px"; // au centre
    joueur.style.top = (2/3) * fond.height -25 + "px"; // a 2/3 du bas de l'image = au centre
	
	ballon.style.left = (fond.width / 2) +5 + "px"; // au centre
    ballon.style.top = (2/3) * fond.height + 25 + "px"; // a 2/3 du bas de l'image = au centre*/
    
   
    //initialisation du nombre de déplacement à 0
    nbDeplacement=0; 
    
    // MODIFICATION 
    
    //position de la div contenant les règles 
	regles.style.position="absolute"; 
    regles.style.width= window.innerWidth /3  + "px"; 
    regles.style.height= fond.height + "px"; 
    regles.style.left= fond.width + "px";
    
    //insertion de l'image aide sur le document
    insererAide(); 
    
    
    //position du bouton cacherRegles
    var cacherRegles=document.getElementById('cacher'); 
	
    cacherRegles.style.position="absolute"; 
    cacherRegles.style.left=fond.width + "px";
    cacherRegles.style.top=(fond.height) + "px";
    
	//initialisation de la div contenant le score ainsi que le nombre de vies
	TONscore.style.position="absolute"; 
    TONscore.style.width="100"; 
    TONscore.style.heigh="50px"; 
	TONscore.innerHTML="Score : "+score+" Nombre de vies "+nbVie;
    TONscore.style.top = (2/3) * fond.height + 50+ "px";

    //
    // Ajout des écouteurs d'événement
    // 
    
    document.addEventListener("keydown", appuyer); 
   
    cacherRegles.addEventListener("click", insererAide); 
    
    
   
}
// MODIFICATION
function insererAide() {
	//on supprime les fils de regles ce qui évitera d'avoir deux fois la même image affichée
	var nbChildren=regles.children.length; //on compte le nombre d'enfants de règles  
	for(var i=0; i<nbChildren; i++) {
		regles.removeChild(regles.lastChild); //on supprime les enfants de règles
	}
	//création de l'image
	var imgAide=document.createElement('img'); 
	//ajout d'attribut id et src
    imgAide.setAttribute('id', 'help'); 
    imgAide.setAttribute('src','aide.jpg'); 
    imgAide.addEventListener("mouseover",afficherAide);
    //écouter d'évenement appelant la fonction Opacity au survol de l'image aide pour passer l'opacity des images à 0.5
    imgAide.addEventListener("mouseover", Opacity); 
    imgAide.style.width=(1/3)*fond.width-100+"px";
    //insertion dans le dom
    regles.appendChild(imgAide); 
   
}

function getBallonX() {
	// on récupère la variable "left" du ballon
	var xString = ballon.style.left;
	
	// on récupère uniquement les "nombres" correspondant à la position en x du ballon ( c'est à dire, on enlève le "px" )
	var xNombre =  xString.slice(0, xString.length-2);
	
	// on divise par un afin de retourner un nombre et pas une chaine de caractères
	return xNombre / 1;
}

function getBallonY() {
	// on récupère la variable "top" du ballon
	var yString = ballon.style.top;
	
	// on récupère uniquement les "nombres" correspondant à la position en y du ballon ( c'est à dire, on enlève le "px" )
	var yNombre =  yString.slice(0, yString.length-2);
	
	// on divise par un afin de retourner un nombre et pas une chaine de caractères
	return yNombre / 1;
}

function appuyer(event) {
	OpacityAllImage(); //lorsqu'on appuie l'opacity des images passe à 1
	if(event.keyCode === 37 || event.keyCode === 39) {
		bougerPersoX(event);
	}
	if(!enCoursDeTir && event.keyCode === 87) {
		calculDureeAppuie(event);
	}
}

function calculDureeAppuie(event) {
	if( ! enCoursDeTir) {
		enCoursDeTir = true;
		tempsDebutTir = event.timeStamp;
		document.addEventListener("keyup",function(event) { relacher(event, tempsDebutTir) } );
	}
}

function relacher(event, debut) {
	if(enCoursDeTir && event.keyCode === 87) {
		var fin = event.timeStamp;
		document.removeEventListener("keyup",function(event) { relacher(event, debut) } );
		enCoursDeTir = false;
		//tir(fin-debut);
	}
}

function PositionX(img) {
	
	
	var X = img.style.left; //on recupère la position sur l'axe des x
	var lx = X.length; //on récupère la taille
	var nbX = X.slice(0,lx-2); //on prend uniquemet les nombres du tableau récupéré
	return nbX; 
	
}

function PositionY(variable) {
	
	
	var Y= variable.style.top;  //on recupère la position sur l'axe des y 
	
	var ly = Y.length;//on récupère la taille
	
	var nbY = Y.slice(0,ly-2); //on prend uniquemet les nombres du tableau récupéré
	
	return nbY; 
}

function bougerPersoX(event) {	
	//récupérer la position
	var positionX=PositionX(joueur); 
	
	
	if (event.keyCode === 39) {
		if(positionX<2*fond.width/3) {
			//on bouge le personnage vers la droite 
			var newPosition=(Number (positionX) + 10)+"px"; 
			joueur.style.left=newPosition;
			ballon.style.left=(getBallonX()+10)+"px"; 
			//on augmente le nombre de déplacement
			nbDeplacement=nbDeplacement+1;  
			if(nbDeplacement>50) {
				PerteVie(); //on perd une vie
				
			}
		} 
		
		
	}
	if(event.keyCode===37) {
		//on bouge le personnage vers la gauche 
		if( positionX >fond.width/4) {
			var newPosition=(Number (positionX) -10)+"px"; 
		
			joueur.style.left=newPosition; 
			ballon.style.left=(getBallonX()-10)+"px"; 
			//on augmente le nombre de déplacement
			nbDeplacement=nbDeplacement+1; 
			if(nbDeplacement>50) {
				PerteVie(); //on perd une vie
				
				
			}
		}
	}
	
	
}


function afficherAide(event) {
	//on cache l'image d'aide
	event.target.style.visibility="hidden"; 
	//on crée puis isère un h2 dans le dom fils de regles
	var newh2=document.createElement('h2'); 
	newh2.innerHTML="Voici les règles de notre jeu"; 
	regles.appendChild(newh2); 
	
	//on crée et on insère des paragraphes dans le dom
	var newp=document.createElement('p'); 
	newp.innerHTML="Pour déplacer appuyer sur les flèches de droite ou de gauche"; 
	regles.appendChild(newp); 
	
	var newp2=document.createElement('p'); 
	newp2.innerHTML="Pour tirer appuyer sur la touche w, plus vous appuyer plus le tir est performant"; 
	regles.appendChild(newp2); 
	//on supprime le premier fils de règle pour ne plus avoir l'image dans la div règle
	regles.removeChild(regles.firstChild); 
	 
}



function supprimerFilsTerrain() {

	var nbChildren=terrain.children.length //on compte les enfants de la zone
	for(var i=0; i<nbChildren; i++) {
		terrain.removeChild(terrain.lastChild); //on supprime les enfants de la zone
	}
}

function Opacity() {
	//selection de toutes les images
	var tabImg=document.getElementsByTagName('img'); 
	for(var i=0; i<tabImg.length; i++) {
		tabImg[i].style.opacity=0.5; //on passe l'opacité de toutes les images à 0.5
	}
}

function OpacityAllImage() {
	var tabImg=document.getElementsByTagName('img'); 
	for(var i=0; i<tabImg.length; i++) {
		tabImg[i].style.opacity=1; //on passe l'opacitié de toutes les images à 1
	}
}

function faitPanier() {
	//on récupère la position du ballon sur l'axe des x et sur l'axe des y
	var positionXballon=PositionX(ballon); 
	var positionYballon=PositionY(ballon); 
	
	//on regarde si le ballon est proche du panier 
	if (120 <positionXballon && positionXballon<160 && positionYballon>85 && positionYballon<105) {
			score=score+1; //on augmente le score 
			TONscore.innerHTML="Score : "+score+" Nombre de vies "+nbVie; //on l'affiche
			setup(); 
			
	}
	else if (700<positionXballon && positionXballon<740 && positionYballon>85 && positionYballon<105) {
			score=score+1; 
			TONscore.innerHTML="Score : "+score+" Nombre de vies "+nbVie; //on l'affiche
			setup(); 
		
	}
	else {
		PerteVie(); //on perd une vie 
	}
}

	
function PerteVie() { 
	alert("perte d'une vie"); 
	nbVie=nbVie-1; //on décrémente le compteur 
	TONscore.innerHTML="Score : "+score+" Nombre de vies "+nbVie;//on affiche
	if(nbVie==0) {
		
		finGame();//on appelle la fonction mettant fin au jeu 
	} 
	else {
		setup();
	}
	
	
}



function finGame() {
	supprimerFilsTerrain(); //on supprime les fils du terrain
	chargerImage('game.png'); //on affiche l'image de fin du jeu
	body.addEventListener("keydown", setup); //on place un écouter d'évenement qui relance le jeu si on appuie sur une touche
	nbVie=5; 
	score=0;
}
