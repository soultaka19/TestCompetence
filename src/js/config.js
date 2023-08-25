
// Fonction pour effectuer la requête AJAX
async function getContacts(action){
    try {
        const response = await fetch(`./src/backend/ajax.php?action=${action}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erreur lors de la récupération des contacts :', error);
        return [];
    }
}

//fonction pour ajouter un contact
function sendDataToServer(data) {
    // Préparer les options de la requête
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    // Effectuer la requête POST vers l'URL du serveur
    fetch('./src/backend/ajax.php', requestOptions)
        .then(response => response.json())
        .then(responseData => {
            // Traiter la réponse du serveur si nécessaire
            console.log('Réponse du serveur :', responseData);
        })
        .catch(error => {
            console.error('Erreur lors de la requête :', error);
        });
}


// Fonction pour générer les éléments DOM à partir des données de contact
function generateContactElements(contact) {
    const un_contact = document.createElement("tr");
    un_contact.style.cursor = 'pointer';
    
    const nom = document.createElement("td");
    nom.innerText = contact.nom;

    const prenom = document.createElement("td");
    prenom.innerText = contact.prenom;

    const telephone = document.createElement("td");
    telephone.innerText = contact.telephone;

    const categorie = document.createElement("td");
    categorie.innerText = contact.categorie;

    un_contact.appendChild(nom);
    un_contact.appendChild(prenom);
    un_contact.appendChild(telephone);
    un_contact.appendChild(categorie);

    un_contact.addEventListener('click', () => {
        openContactModal(contact);
    });

    return un_contact;
}

function filterContacts() {
    const filtreNom = filtreNomInput.value.toLowerCase();
    const filtrePrenom = filtrePrenomInput.value.toLowerCase();
    const filtreCategorie = filtreCategorieSelect.value;

    const filteredContacts = contacts.filter(contact => {
        const nomMatches = contact.nom.toLowerCase().includes(filtreNom);
        const prenomMatches = contact.prenom.toLowerCase().includes(filtrePrenom);
        const categorieMatches = filtreCategorie === 'Filtrer par categorie' || contact.categorie === filtreCategorie;

        return nomMatches && prenomMatches && categorieMatches;
    });

    const contactsContainer = document.getElementById("contacts");
    contactsContainer.innerHTML = "";

    filteredContacts.forEach(contact => {
        const contactElement = generateContactElements(contact);
        contactsContainer.appendChild(contactElement);
    });
}

// Fonction pour mettre à jour le nombre d'affichages par page
function updateAffichageParPage() {
    const affichageParPage = parseInt(afficherParSelect.value);

    const contactsContainer = document.getElementById("contacts");
    contactsContainer.innerHTML = ""; // Vide le contenu actuel

    // Afficher les contacts en fonction du nombre d'affichages par page
    for (let i = 0; i < contacts.length && i < affichageParPage; i++) {
        const contactElement = generateContactElements(contacts[i]);
        contactsContainer.appendChild(contactElement);
    }
}

//fonction pour ouvrir un modal du contact
function openContactModal(contact) {
    const modalTitle = document.querySelector('#contactModalLabel');
    const modalBody = document.querySelector('#contactModalBody');

    // Remplir les informations du modal avec les données du contact
    modalTitle.innerText = `Fiche descriptive d'un contact`;
    modalBody.innerHTML = `
        <h2>${contact.nom} ${contact.prenom}</h2>
        <p>Téléphone : ${contact.telephone}</p>
        <p>Catégorie : ${contact.categorie}</p>
        <!-- Ajoutez d'autres informations du contact ici -->
    `;

    // Ouvrir le modal
    const contactModal = new bootstrap.Modal(document.getElementById('contactModal'));
    contactModal.show();

    // Récupération de la référence au bouton "Modifier"
    const editButton = document.querySelector('#editContact');
    // Ajout d'un gestionnaire d'événement au bouton "Modifier"
    editButton.addEventListener('click', () => {

        //fermer le modal de description
        contactModal.hide();

        const modifyContactModalLabel = document.getElementById("modifyContactModalLabel");
        modifyContactModalLabel.innerHTML = `<h4>Modification du contact :identifiant ${contact.id} ${contact.nom} ${contact.prenom}</h4>`;

        // Remplir le formulaire de modification avec les données du contact
        document.querySelector('#modifId').value = contact.id;
        document.querySelector('#modifNom').value = contact.nom;
        document.querySelector('#modifPrenom').value = contact.prenom;
        document.querySelector('#modifTelephone').value = contact.telephone;
        //document.querySelector('#modifyCategorie').value = contact.categorie_id; 


        // Ouvrir le modal de modification
        const modifyContactModal = new bootstrap.Modal(document.getElementById('modifyContactModal'));
        modifyContactModal.show();
    });

}











