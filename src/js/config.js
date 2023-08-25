
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









