// le tableau devant contenir tous les contacts
let contacts = [];

// Appelez la fonction qui utilise chargerContacts
afficherContact();

// Récupération de la référence au bouton "Envoyer"
const sendButton = document.querySelector('#sendButton');

// Ajout d'un gestionnaire d'événement au bouton "Envoyer"
sendButton.addEventListener('click', () => {
    let nom = document.querySelector('#nom').value;
    let prenom = document.querySelector('#prenom').value;
    let telephone = document.querySelector('#telephone').value;
    let categorie = parseInt(document.querySelector('#categorie').value);

    const formData = {
        nom: nom,
        prenom: prenom,
        telephone: telephone,
        categorie: categorie
    };

    sendDataToServer(formData);

    const contactsContainer = document.getElementById("contacts");
    contactsContainer.innerHTML = "";
    nom.value="";
    prenom.value = ""
    telephone.value = "" 
    categorie.innerHTML="" 

    afficherContact();
});


// Récupération des références aux champs de recherche
const filtreNomInput = document.querySelector('#filtreNom');
const filtrePrenomInput = document.querySelector('#filtrePrenom');
const filtreCategorieSelect = document.querySelector('#filtreCategorie');

// Ajout d'écouteurs d'événements input pour déclencher la fonction de filtrage
filtreNomInput.addEventListener('input', filterContacts);
filtrePrenomInput.addEventListener('input', filterContacts);
filtreCategorieSelect.addEventListener('input', filterContacts);



// Récupération de la référence au champ "Afficher par"
const afficherParSelect = document.getElementById('afficherParSelect');

// Ajout d'un gestionnaire d'événement au champ "Afficher par"
afficherParSelect.addEventListener('change', updateAffichageParPage);


