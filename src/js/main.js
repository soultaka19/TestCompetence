// le tableau devant contenir tous les contacts
let contacts = [];

async function chargerContacts() {
    const action = 'get_all';
    contacts = await getContacts(action);
}

async function afficherContact() {
    await chargerContacts();

    // Vous n'avez pas besoin de la variable "contacts" ici maintenant

    const contactsContainer = document.getElementById("contacts");
    contactsContainer.innerHTML = ""; // Vide le contenu actuel

    contacts.forEach(contact => {
        const contactElement = generateContactElements(contact);
        contactsContainer.appendChild(contactElement);
    });
    console.log(contacts); // Vous pouvez utiliser la variable "contacts" ici
}

// Appelez la fonction qui utilise chargerContacts
afficherContact();


// Récupération de la référence au bouton "Envoyer"
const sendButton = document.querySelector('#sendButton');

// Ajout d'un gestionnaire d'événement au bouton "Envoyer"
sendButton.addEventListener('click', () => {
    const nom = document.querySelector('#nom').value;
    const prenom = document.querySelector('#prenom').value;
    const telephone = document.querySelector('#telephone').value;
    const categorie = parseInt(document.querySelector('#categorie').value);

    const formData = {
        nom: nom,
        prenom: prenom,
        telephone: telephone,
        categorie: categorie
    };

    sendDataToServer(formData);

    const contactsContainer = document.getElementById("contacts");
    contactsContainer.innerHTML = "";
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

