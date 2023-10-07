/* Afficher une notification à l'utilisateur.*/
 
export const showNotification = (message, isSuccess = true) => {
    // Récupérer l'élément de notification depuis le DOM.
    const notificationElement = document.getElementById("notification");
    console.log(message);
    // Mettre à jour le contenu textuel de l'élément de notification avec le message fourni.
    notificationElement.textContent = message;
  
    // Afficher l'élément de notification.
    notificationElement.style.display = "block";
  
    // Assigner la classe CSS appropriée en fonction du succès ou de l'erreur.
    notificationElement.className = isSuccess ? "notification success" : "notification error";
  
    // Masquer la notification après 3 secondes.
    setTimeout(() => {
      notificationElement.style.display = "none";
    }, 3000);
  };