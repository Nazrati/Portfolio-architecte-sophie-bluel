import createGallery from "./gallery.js";
 import createFilters from "./filters.js";
 
 const galleryContainer = document.getElementById("gallery")
 const galleryModalContainer = document.getElementById("modal-gallery")
 
 // récupération du token contenu dans le localStorage
 const token = localStorage.getItem("token")
 
 const fetchWorks = async () => {
   const response = await fetch("http://localhost:5678/api/works");
   return response.json();
 };
 
 const deleteWork = async (workId) => {
   const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
     method: "DELETE",
     headers: {
       "Content-Type": "application/json",
       Authorization: `Bearer ${token}`,
     },
   });
   return response.json();
 };
 
 const addWork = async (formData) => {
   const response = await fetch(`http://localhost:5678/api/works`, {
     method: "POST",
     headers: {
       Authorization: `Bearer ${token}`,
     },
     body: formData,
   });
   return response.json();
 };
 
 const init = async () => {
 
   if (token) {
     // Afficher bouton + bandeau + remplacer le bouton login par logout
   }
   const works = await fetchWorks();
   const gallery = createGallery({ works });
   galleryContainer.appendChild(gallery.renderGallery());
 
   // Gallery appartenant à la modal
   const galleryOfTheModal = createGallery({
     works,
     isEditable: true,
     onDeleteWork: async (workId) => {
       try {
         await deleteWork(workId);
         const updatedWorks = works.filter((work) => work.id !== workId);
         gallery.setGallery(updatedWorks);
         modal.updateModal(updatedWorks);
       } catch (err) {
         console.log(err);
       }
     },
   });
 
   galleryModalContainer.appendChild(galleryOfTheModal.renderGallery())
 
   createFilters({
    worksData: works,
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