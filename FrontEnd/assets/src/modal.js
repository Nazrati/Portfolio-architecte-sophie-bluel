const editModifier = document.getElementById('edit-media');
const dialog = document.getElementById('media-dialog');
const closeSvg = document.getElementById('close-dialog');

// Ajouter un écouteur d'événement 'click' au bouton "Modifier" pour ouvrir la fenêtre modale
editModifier.addEventListener('click', () => {
    dialog.showModal();// La méthode showModal() ouvre le <dialog> comme une fenêtre modal
    document.body.style.overflow = "hidden"; // Désactive le défilement
});

// Ajouter un écouteur d'événement 'click' au bouton "Fermer" pour fermer la fenêtre modale
closeSvg.addEventListener('click', () => {
    dialog.close(); // La méthode close() ferme le <dialog>
    document.body.style.overflow = ""; // Réactive le défilement
});

// Ajouter un écouteur d'événement 'click' à la fenêtre entière 
// Pour fermer la fenêtre modale lorsqu'on clique en dehors de celle-ci
window.addEventListener('click', (event) => {
    if (event.target === dialog) {
        dialog.close();
        document.body.style.overflow = ""; // Réactive le défilement
    }
});

// la flèche retour et la fermeture de la section add photo
document.addEventListener("DOMContentLoaded", function() {
    let modalContent = document.querySelector(".modal-content");
    let addPhotoSection = document.querySelector("#add-photo-section");
    let mediaDialog = document.querySelector("#media-dialog");

    // Lorsque l'utilisateur clique sur "Ajouter une photo"
    document.querySelector("#add-photo-btn").addEventListener("click", function() {
        modalContent.style.display = "none";
        addPhotoSection.style.display = "block";
    });

    // Lorsque l'utilisateur clique sur la flèche de retour
    document.querySelector("#back").addEventListener("click", function() {
        addPhotoSection.style.display = "none";
        modalContent.style.display = "flex";
    });

    // Lorsque l'utilisateur clique sur la croix dans la section d'ajout de photo
    document.querySelector("#close-add-photo-dialog").addEventListener("click", function() {
        mediaDialog.close();
    });
});



