<?php 
require_once('./index.php');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if(isset($_GET['action']) && $_GET['action'] === 'get_all'){
        getContacts();
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Assurez-vous de vérifier les données et de les valider avant l'insertion dans la base de données

    $data = json_decode(file_get_contents('php://input'), true);

    if(isset($data['nom']) && isset($data['prenom']) && isset($data['telephone']) && isset($data['categorie'])) {
        $nom = $data['nom'];
        $prenom = $data['prenom'];
        $telephone = $data['telephone'];
        $categorie = $data['categorie'];

        // Appelez une fonction pour insérer les données dans la base de données
        insertContact($nom, $prenom, $telephone, $categorie);

        // Vous pouvez renvoyer une réponse JSON pour indiquer que l'insertion a réussi
        $response = array('message' => 'Données insérées avec succès');
        echo json_encode($response);
    } else {
        // En cas de données manquantes, renvoyez un message d'erreur
        $response = array('message' => 'Données manquantes');
        echo json_encode($response);
    }
}
?>
