const createFilters = ({ worksData, onSelectFilter }) => {
  const filters = document.querySelectorAll(".filter-button");

  filters.forEach((filter) => {
    filter.addEventListener("click", () => {
      const filterName = filter.getAttribute("data-id");
      const filteredWorks = worksData.filter((work) =>
        filterName === "All" ? work : work.category.name === filterName
      );
      onSelectFilter(filteredWorks);
    });
  });

  return {};
};

export default createFilters;

// pour appliquer une couleur au boutons active
document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.filter-button');

  filterButtons.forEach(button => {
      button.addEventListener('click', function() {
          // Réinitialisation du style pour tous les boutons et éléments <p>
          filterButtons.forEach(btn => {
              btn.style.backgroundColor = ""; 
              btn.querySelector('p').style.color = ""; 
          });

          // Appliquer le style au bouton cliqué
          this.style.backgroundColor = "#1D6154";
          this.querySelector('p').style.color = "white";
      });
  });
});

