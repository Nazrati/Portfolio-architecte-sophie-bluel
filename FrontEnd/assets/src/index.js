import createGallery from "./gallery.js";
import createFilters from "./filters.js";
import { createModal } from "./modal.js";

const galleryContainer = document.getElementById("gallery");
const galleryModalContainer = document.getElementById("modal-gallery");
const logout = document.querySelector(".logout")

logout.addEventListener("click", () => {
  localStorage.clear()
})

// récupération du token contenu dans le localStorage
const token = localStorage.getItem("token");

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
		document.querySelector(".black-bloc").style.display = "flex";
		document.querySelector(".filter").style.display = "none";
		document.querySelector(".login").style.display = "none";
        document.querySelector(".logout").style.display = "block";
		document.querySelector(".edit-portfolio").style.display = "flex";
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

	galleryModalContainer.appendChild(galleryOfTheModal.renderGallery());

	const modal = createModal({
		onSave: async (formData) => {
			if (
				!formData.has("image") &&
				!formData.has("title") &&
				!formData.has("category")
			)
				return;
			try {
				await addWork(formData);
			} catch (e) {
				console.log(e);
			}
		},
	});

	createFilters({
		worksData: works,
		onSelectFilter: (filteredWorks) => {
			gallery.setGallery(filteredWorks);
		},
	});
};

init();
