/* Afficher une notification à l'utilisateur.*/
 
const showNotification = (message, isSuccess = true) => {
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


 /*Authentifier un utilisateur*/
 
const loginUser = async (username, password) => {
  try {
    // Afficher les logs pour le débogage.
    console.log("Username:", username);
    console.log("Password:", password);

    // Effectuer une requête POST pour authentifier l'utilisateur.
    const response = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: username,
        password: password
      })
    });

    // Convertir la réponse en JSON.
    const data = await response.json();

    // Afficher les logs pour le débogage.
    console.log("Response Status:", response.status);
    console.log("Response Data:", data);

    // Vérifier le code de statut de la réponse.
    if (response.status !== 200) {
      throw new Error(data.message || "Erreur dans l’identifiant ou le mot de passe.");
    }

    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

/**
 * Initialiser le formulaire de connexion et ajouter un écouteur d'événement pour sa soumission.
 */

const init = () => {
  // Récupérer le formulaire de connexion depuis le DOM.
  const form = document.querySelector('.login-container form');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();  // Empêcher le formulaire de soumettre par défaut.

      // Récupérer les valeurs de l'identifiant et du mot de passe depuis le formulaire.
      const email = document.getElementById('username').value.trim();
      const password = document.getElementById('password').value.trim();

      try {
        // Essayer d'authentifier l'utilisateur.
        const data = await loginUser(email, password);

        // Stocker le token dans le localStorage si l'authentification réussit.
        localStorage.setItem("token", data.token);
       
        // Rediriger l'utilisateur vers la page d'accueil.
        window.location.href = "index.html";
 
      } catch (error) {
        // Afficher une notification à l'utilisateur en cas d'erreur.

        showNotification("Identifiants invalides.", false);
      }
    });
  }
};

// Exécuter la fonction init pour initialiser le formulaire.
init();

const isUserAuthenticated = () => {
  return !!localStorage.getItem("token");
};


