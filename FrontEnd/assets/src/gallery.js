const createGallery = ({ works = [] }) => {
  let galleryWorks = [...works];

  const setGallery = (newWorks) => {
    galleryWorks = [...newWorks];
    renderGallery();
  };

  const renderGallery = () => {
    const galleryElement = document.getElementById("gallery");
    let template = "";

    galleryWorks.forEach((work) => {
      template += `
            <figure>
              <img alt="${work.title}" src="${work.imageUrl}"/>
              <figcaption>${work.title}</figcaption>
            </figure>
          `;
    });

    galleryElement.innerHTML = template;
  };

  return {
    setGallery,
    renderGallery,
  };
};

export default createGallery;



