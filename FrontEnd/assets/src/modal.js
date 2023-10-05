const editModifier = document.getElementById('edit-media');
const dialog = document.getElementById('media-dialog');
const closeSvg = document.getElementById('close-dialog');
const form = document.getElementById("photo-form")
const previewFile = document.getElementById("preview-file")
const fileInput = form.querySelector("input[type='file']");
const textTitleInput = form.querySelector("input[type='text']");
const selectInput = form.querySelector("select");
const formButton = form.querySelector('button[type="submit"]')

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

    // Lorsque l'utilisateur clique sur la croix de fermeture section preview
    document.querySelector("#close-add-photo-dialog").addEventListener("click", function() {
        mediaDialog.close();
    });

    document.querySelector("input[type='file']").addEventListener('change', (event) => {
        const file = event.target.files[0]
        if (file) {
            previewFile.src = URL.createObjectURL(file)
            previewFile.style.display = 'block'
        }
    })

    fileInput.addEventListener('input', validateForm)
    textTitleInput.addEventListener('input', validateForm)
    selectInput.addEventListener('input', validateForm)

    function validateForm() {
        if (fileInput.value !== '' && textTitleInput.value !== '' && selectInput.value !== '') {
            formButton.style.background = '#a7a7a7'
            formButton.disabled = true
        } else {
            formButton.style.background = '#1d6154'
            formButton.disabled = false

        }
    }
});

const handleFormSubmit = () => {
    const image = form.querySelector("input[type='file']").files[0];
    const title = form.querySelector("input[type='text']").value;
    const categoryId = form.querySelector("select").value;

    const formData = new FormData();

    if (image && title && categoryId) {
        formData.append("image", image)
        formData.append("title", title)
        formData.append("category", categoryId)
    }

    return formData
}

export const createModal = ({ onSave}) => {
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const formData = handleFormSubmit();
        onSave(formData)
    })
}


document.querySelector("input[type='file']").addEventListener('change', (event) => {
    const file = event.target.files[0]
    if (file) {
        previewFile.src = URL.createObjectURL(file)
        previewFile.style.display = 'block'
        
        // Cacher l'icône et la section add-photo-content
        document.querySelector(".fa-regular.fa-image.fa-2xl").style.display = 'none';
        document.querySelector(".button-add-photo").style.display = 'none';
        document.querySelector(".jpg").style.display = 'none';
    }
})

