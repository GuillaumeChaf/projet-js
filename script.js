// Evenement déclenché lorsque le DOM a fini de charger, qui va appeller notre fonction setup()
document.addEventListener("DOMContentLoaded", setup);

var body;				// variable correspondant au body, servant à simplifier la lecture du code
var terrain; 			// variable correspondant au terrain de jeu (div), servant à simplifier la lecture du code
var fond; 				// variable correspondant au fond (img), servant à simplifier la lecture du code
var joueur; 			// variable correspondant au joueur (img), servant à simplifier la lecture du code
var ballon; 			// variable correspondant au ballon (img), servant à simplifier la lecture du code
var scores; 			// variable correspondant aux 5 meilleurs scores (div), servant à simplifier la lecture du code
var regles; 			// variable correspondant aux regles (div), servant à simplifier la lecture du code
var boutonCacherRegles	// variable correspondant au bouton permettant de cacher les règles du jeu (input), servant à simplifier la lecture du code
var TONscore; 			// variable correspondant au score actuel du joueur (div), servant a simplifier la lecture du code
var lancer; //variable correspondant a la fonction setInterval qui va servir pour l'action du tir

var afficherEcranAccueil = true;	// booleen vrai ssi il faut afficher l'écran d'accueil dans le setup au lieu de l'image de fond du terrain
var afficherEcranPerdu = false;		// boolean vrai ssi il faut afficher l'écran gameOver dans le setup au lieu de l'image de fond du terrain

var nbDeplacement; 	// nombre de déplacement du personnage
var score;  		// score actuel du joueur
var nbVie; 			// nombre de vies restantes au joueur ( = nombres de panier ouvant etre ratées avant d'avoir perdu )

var enCoursDeTir = false; 	// vrai ssi le joueur est en train de tirer (touche enfoncée)

// fonction d'initialisation du jeu
function setup() {
 
    // on initialise les variables globales body et terrain
    body = document.getElementById('body');
    terrain = document.getElementById('terrain');

	// au cas où ce n'est pas la première fois que la fonction est appellée, on "nettoie" le terrain, en supprimant tout ses enfants dans le DOM
	var nbChildren = terrain.children.length //on compte les enfants de la zone
	for(var i=0; i < nbChildren; i++) {
		terrain.removeChild(terrain.lastChild); //on supprime les enfants de la zone
	}

    // on enleve le margin par defaut du body qui décale légèrement le jeu vers la droite et le bas
    body.style.margin = "0px";

	//
	// Initialisation des variables déplacement et vies
	//

		nbDeplacement=50;
	if(afficherEcranAccueil) {
		score = 0;
		nbVie = 5;
		
	}

    //
    //  Fond
    //
	
	var imageFond  = document.createElement("img");
	if(afficherEcranAccueil) {
		imageFond.src = "./index.png";
	}
	else if(afficherEcranPerdu) {
		imageFond.src = "./game.png";
	}
	else {
		imageFond.src = "./fond.jpg";
	}

    imageFond.id = "fond";
    terrain.appendChild(imageFond);

    fond = document.getElementById('fond');

    // on redimensionne le fond du terrain de jeu
    fond.width = 2 * window.innerWidth / 3;
    fond.height = 2 * window.innerHeight / 3;

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

    joueur.style.left = (fond.width / 2) - 50 + "px"; // au centre
    joueur.style.top = (2/3) * fond.height -25 + "px"; // a 2/3 du bas de l'image = au centre
	
	ballon.style.left = (fond.width / 2) +5 + "px"; // au centre
    ballon.style.top = (2/3) * fond.height + 25 + "px"; // a 2/3 du bas de l'image = au centre*/
    
	//
	//	Regles du jeu
	//
    
	regles = document.getElementById('regles');

	regles.style.position = "absolute"; 
    regles.style.width = window.innerWidth /3  + "px"; 
    regles.style.height = fond.height + "px"; 
    regles.style.left = fond.width + "px";

    //insertion de l'image aide sur le document
    insererAide(); 

	//
	// Bouton servant a cacher les règles du jeu
	//

    boutonCacherRegles = document.getElementById('cacher'); 
	
    boutonCacherRegles.style.position = "absolute"; 
    boutonCacherRegles.style.left = fond.width + "px";
    boutonCacherRegles.style.top = fond.height + "px";

	//
	//	Meilleurs scores
	//
	
	scores = document.getElementById('scores');

	var nbChildren = scores.children.length //on compte les enfants de la zone
	for(var i=0; i < nbChildren; i++) {
		scores.removeChild(scores.lastChild); //on supprime les enfants de la zone
	}

	scores.style.position = "absolute";
	scores.style.width = fond.width + "px";
	scores.style.height = fond.height / 2 + "px";
	scores.style.top = fond.height +"px";
	
	var scoreTitre = document.createElement("h2");
	scoreTitre.innerHTML = " Meilleurs Scores ";
	scoreTitre.style.textAlign = "center";
	scores.appendChild(scoreTitre);
	
	// on lance une requete vers la bdd afin d'obtenir les 5 meilleurs scores, et de les afficher dans la div scores
	scoreRequest();

	//
	//	Score actuel du joueur
	//

	TONscore = document.getElementById('tonScore');

	TONscore.style.position = "absolute"; 
    TONscore.style.width = "100"; 
    TONscore.style.height = "50px"; 
	TONscore.innerHTML = "Score : " + score + " Nombre de vies " + nbVie+" Déplacement Restant "+nbDeplacement; 
    TONscore.style.top = (2/3) * fond.height + 50 +  "px";
    
    //
    // Ajout des écouteurs d'événement
    // 

	document.removeEventListener("keydown", traiterAppuieTouche);
    document.addEventListener("keydown", traiterAppuieTouche);

	boutonCacherRegles.addEventListener("click", insererAide);    
}

function traiterAppuieTouche(event) { 
	if(afficherEcranAccueil) { 
		afficherEcranAccueil = false;
		setup();
	 }
	 else if(afficherEcranPerdu) {
		 afficherEcranPerdu = false;
		 afficherEcranAccueil = true;
		 setup();
	 }
	 else {
		 appuyer(event);
	 }
}

function insererAide() {
	//on supprime les fils de regles ce qui évitera d'avoir deux fois la même image affichée
	var nbChildren = regles.children.length; //on compte le nombre d'enfants de règles  
	for(var i=0; i < nbChildren; i++) {
		regles.removeChild(regles.lastChild); //on supprime les enfants de règles
	}

	//création de l'image
	var imgAide = document.createElement('img'); 
	//ajout d'attribut id et src
    imgAide.setAttribute('id', 'help'); 
    imgAide.setAttribute('src', './aide.jpg'); 
    imgAide.addEventListener("mouseover", afficherAide);
    //écouteur d'évenement appelant la fonction Opacity au survol de l'image aide pour passer l'opacity des images à 0.5
    imgAide.addEventListener("mouseover", Opacity); 
    imgAide.style.width = (1/3) * fond.width - 100 + "px";
    //insertion dans le dom
    regles.appendChild(imgAide);  
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
		console.log(fin-debut); // tir(fin-debut);
	}
}

function myajax(url, callBack) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.open("GET", url, true);
    httpRequest.addEventListener("load", function () {
        callBack(httpRequest); });
    httpRequest.send(null);
}

function scoreRequest() {
    var url = 'http://infolimon.iutmontp.univ-montp2.fr/~tornilf/projet-js-master/scoreRequest.php?action=select';
    myajax(url, afficherScores);
}

function insererScoreBdd(nom, score) {
    var url = 'http://infolimon.iutmontp.univ-montp2.fr/~tornilf/projet-js-master/scoreRequest.php?action=insert&nom=' + nom + '&score=' + score;
    myajax(url, scoreRequest);
}

function afficherScores(httpRequest) {
	var tabRep = JSON.parse(httpRequest.responseText);
	for(var i=scores.children.length-1; i>0; i--) {
		scores.removeChild(scores.lastChild);
	}
    for(var i=0; i<tabRep.length; i++) {
		var p = document.createElement("p");
		p.id = "score" + i;
		p.innerHTML = tabRep[i].nomJoueur + " : " + tabRep[i].score + " points";
		p.style.textAlign = "center";
		scores.appendChild(p);
    }
}

function getImageX(image) {
	// on récupère la variable "left" du l'image
	var xString = image.style.left;
	
	// on récupère uniquement les "nombres" correspondant à la position en x du ballon ( c'est à dire, on enlève le "px" )
	var xNombreChaine =  xString.slice(0, xString.length-2);
	
	// on divise par un afin de retourner un nombre et pas une chaine de caractères
	return xNombreChaine / 1;
}

// cf getImageX(image) pour les explications
function getImageY(image) {
	var yString = image.style.top;
	var yNombreChaine =  yString.slice(0, yString.length-2);
	return yNombreChaine / 1;
}

function bougerPersoX(event) {
	if (event.keyCode === 39) {
		if(getImageX(joueur) < 2*fond.width/3) {

			//on bouge le personnage vers la droite en déplaçant aussi le ballon qu'il a dans les mains
			joueur.style.left = getImageX(joueur) + 10 + "px";
			ballon.style.left = getImageX(ballon) +10 + "px";

			//on augmente le nombre de déplacement
			nbDeplacement --;  
			TONscore.innerHTML = "Score : " + score + " Nombre de vies " + nbVie+" Déplacement Restant "+nbDeplacement; 
			if(nbDeplacement==0) {
				PerteVie(); //on perd une vie
			}
		} 
	}
	if(event.keyCode === 37) { 
		if(getImageX(joueur) > fond.width/4) {

			//on bouge le personnage vers la gauche en déplaçant aussi le ballon qu'il a dans les mains
			joueur.style.left= getImageX(joueur) - 10 + "px"; 
			ballon.style.left= getImageX(ballon) - 10 + "px";

			//on augmente le nombre de déplacement
			nbDeplacement --;
			TONscore.innerHTML = "Score : " + score + " Nombre de vies " + nbVie+" Déplacement Restant "+nbDeplacement; 
			if(nbDeplacement==0) {
				PerteVie(); //on perd une vie
			}
		}
	}	
}

function afficherAide(event) {
	//on cache l'image d'aide
	event.target.style.visibility = "hidden"; 
	//on crée puis insère un h2 dans le dom fils de regles
	var newh2=document.createElement('h2'); 
	newh2.innerHTML="Voici les règles de notre jeu"; 
	regles.appendChild(newh2); 
	
	//on crée et on insère des paragraphes dans le dom
	var newp=document.createElement('p'); 
	newp.innerHTML="Pour déplacer le joueur, appuyez sur les flèches de droite ou de gauche"; 
	regles.appendChild(newp); 
	
	var newp2=document.createElement('p'); 
	newp2.innerHTML="Pour tirer, appuyez sur la touche w, plus vous laissez appuyé, plus le tir est puissant"; 
	regles.appendChild(newp2); 
	//on supprime le premier fils de règle pour ne plus avoir l'image dans la div règle
	regles.removeChild(regles.firstChild); 
	 
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

function tir(force){//fonction lancé dès que la touche tir est relaché

        if(force > 2500){
            force = 2500;}

        var attraction = 1;
        lancer = setInterval(function() {attraction += 2 ;intervalle(force, attraction);arret()}, 75);
}

function intervalle(force, attraction){// fonction qui a chaque intervalle de temps bouge le ballon.

    ballon.style.top = getImageY(ballon) - (8+(force*0.024)) + attraction + "px";
    ballon.style.left = getImageX(ballon) + (6+(force*0.0047)) + "px";
}
function arret(){

    if(ballon.style.top.substr(0,3) >= 490  || ballon.style.left.substr(0,3) >= 950){
        clearInterval(lancer);
    }
}

function faitPanier() {
	//on récupère la position du ballon sur l'axe des x et sur l'axe des y
	var positionXballon = getImageX(ballon); 
	var positionYballon = getImageY(ballon); 
	
	//on regarde si le ballon est proche du panier 
	if (120 < positionXballon && positionXballon < 160 && positionYballon > 85 && positionYballon < 105) {
			score ++; //on augmente le score 
			TONscore.innerHTML = "Score : " + score + " Nombre de vies " + nbVie+" Déplacement Restant "+nbDeplacement; 
			setup(); 
			
	}
	else if (700 < positionXballon && positionXballon < 740 && positionYballon > 85 && positionYballon < 105) {
			score ++; 
			TONscore.innerHTML = "Score : " + score + " Nombre de vies " + nbVie+" Déplacement Restant "+nbDeplacement; 
			setup(); 
		
	}
	else {
		PerteVie(); //on perd une vie 
	}
}

function PerteVie() { 
	alert("perte d'une vie"); 
	nbVie --; //on décrémente le compteur 
	TONscore.innerHTML = "Score : " + score + " Nombre de vies " + nbVie+" Déplacement Restant "+nbDeplacement; 
	if(nbVie === 0) {
		finGame();//on appelle la fonction mettant fin au jeu 
	} 
	else {
		setup();
	}
}

function finGame() {
	afficherEcranPerdu = true;
	
	setup();
}


function triche(event) {

	
	chaineTriche=chaineTriche+event.keyCode;  //on ajoute dans un tableau le code des touches que l'on tape 
	var code = "66" + "65" + "83" + "75" + "69" + "84"; //chaine représentant le code triche 
	
	if (chaineTriche.indexOf(code,0) != -1) {
		console.log("test"); 
	} 
	
}
