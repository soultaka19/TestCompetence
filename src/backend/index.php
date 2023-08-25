<?php 

class Contact {
    public int $id;
    public string $nom;
    public string $prenom;
    public string $telephone;
    public string $categorie;
    public int $categorie_id;
}

function getContacts() {
    $database = dbConnect();
    $statement = $database->query(
        "SELECT c.id, nom, prenom, categorie_id,telephone,libelle FROM contact c join categorie cg on c.categorie_id = cg.id "
    );
    $contacts = [];
    while (($row = $statement->fetch())) {
        $contact = new Contact();

        $contact->nom = $row['nom'];
        $contact->prenom = $row['prenom'];
        $contact->categorie_id = $row['categorie_id'];
        $contact->telephone = $row['telephone'];
        $contact->categorie = $row['libelle'];
        $contact->id = $row['id'];

        $contacts[] = $contact;
    }

    echo json_encode($contacts);}
function dbConnect()
{
    $database = new PDO('mysql:host=localhost;dbname=test;charset=utf8', 'root', '');

    return $database;
}

function insertContact($nom, $prenom, $telephone, $categorie_id) {
    $database = dbConnect();
    $query = "INSERT INTO contact (nom, prenom, telephone, categorie_id) VALUES (:nom, :prenom, :telephone, :categorie_id)";
    $statement = $database->prepare($query);

    $statement->bindParam(':nom', $nom, PDO::PARAM_STR);
    $statement->bindParam(':prenom', $prenom, PDO::PARAM_STR);
    $statement->bindParam(':telephone', $telephone, PDO::PARAM_STR);
    $statement->bindParam(':categorie_id', $categorie_id, PDO::PARAM_INT);

    return $statement->execute();
}



