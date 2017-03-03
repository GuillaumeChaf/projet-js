<?php

class Conf {
    
    private static $database = array(
        'hostname' => 'infolimon.iutmontp.univ-montp2.fr',
        'database' => 'tornilf',
        'login'    => 'tornilf',
        'password' => 'florenttornil'
    );

    static public function getLogin() {
        return self::$database['login'];
    }

    static public function getHostname() {
        return self::$database['hostname'];
    }

    static public function getDatabase() {
        return self::$database['database'];
    }

    static public function getPassword() {
        return self::$database['password'];
    }

}

class Model {

    public static $pdo;

    public static function init_pdo() {
        $host   = Conf::getHostname();
        $dbname = Conf::getDatabase();
        $login  = Conf::getLogin();
        $pass   = Conf::getPassword();
        try {
            // connexion à la base de données            
            // le dernier argument sert à ce que toutes les chaines de charactères 
            // en entrée et sortie de MySql soit dans le codage UTF-8
            self::$pdo = new PDO("mysql:host=$host;dbname=$dbname", $login, $pass, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
            // on active le mode d'affichage des erreurs, et le lancement d'exception en cas d'erreur
            self::$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $ex) {
            echo $ex->getMessage();
            die("Problème lors de la connexion à la base de données.");
        }
    }

    public static function selectAll() {
        try {
            // préparation de la requête
            $sql = "SELECT * FROM scores order by score DESC LIMIT 5 "; 
            $req_prep = self::$pdo->query($sql);
            $req_prep->setFetchMode(PDO::FETCH_OBJ);
            $tabResults = $req_prep->fetchAll();
            // renvoi du tableau de résultats
            return $tabResults;
        } catch (PDOException $e) {
            echo $e->getMessage();
            die("Erreur lors de la recherche dans la base de données.");
        }
    }
    
    public static function createScore($nom, $score) {
		try {
            // préparation de la requête
            $sql = "INSERT INTO scores VALUES (null, :tagNom, :tagScore)"; 
            $req_prep = self::$pdo->prepare($sql);
            // passage de la valeur de name_tag
            $values = array("tagNom" => $nom,
							"tagScore" => $score);
            // exécution de la requête préparée
            $req_prep->execute($values);
        } catch (PDOException $e) {
            echo $e->getMessage();
            die("Erreur lors de la recherche dans la base de données.");
        }
	}
}

// on initialise la connexion $pdo
Model::init_pdo();

$action = $_GET['action'];
if($action == "select") {
	$tabScores = Model::selectAll();
	echo json_encode($tabScores);
}
else if($action == "insert"){
	Model::createScore($_GET['nom'], $_GET['score']);
}


?>
