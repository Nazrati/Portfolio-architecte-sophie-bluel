import createGallery from "./gallery.js";
import createFilters from "./filters.js";

const fetchWorks = async () => {
  const response = await fetch("http://localhost:5678/api/works");
  return response.json();
};

const init = async () => {
  const worksData = await fetchWorks();
  const gallery = createGallery({ works: worksData });
  

  gallery.renderGallery();
 

  createFilters({
    worksData,
    onSelectFilter: (filteredWorks) => { 
      gallery.setGallery(filteredWorks);
    },
  });
};
init();

const editModifier = document.getElementById('edit-media');
const dialog = document.getElementById('media-dialog');
const closeSvg = document.getElementById('close-dialog');

// Ajouter un écouteur d'événement 'click' au bouton "Modifier" pour ouvrir la fenêtre modale
editModifier.addEventListener('click', () => {
  dialog.showModal();// La méthode showModal() ouvre le <dialog> comme une fenêtre modal
  modalGallery.renderGallery();
});

// Ajouter un écouteur d'événement 'click' au bouton "Fermer" pour fermer la fenêtre modale
closeSvg.addEventListener('click', () => {
  dialog.close(); // La méthode close() ferme le <dialog>
});

// Ajouter un écouteur d'événement 'click' à la fenêtre entière 
// Pour fermer la fenêtre modale lorsqu'on clique en dehors de celle-ci
window.addEventListener('click', (event) => {
  if (event.target === dialog) {
    dialog.close();
  }
});










