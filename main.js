import "./style.css";
// Données initiales
const animals = [
  {
    nom: "Lion",
    description: "Grand félin carnivore, roi de la savane.",
    categorie: "terrestre",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/7/73/Lion_waiting_in_Namibia.jpg",
  },
  {
    nom: "Dauphin",
    description: "Mammifère marin intelligent et joueur.",
    categorie: "aquatique",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/d/da/NMMP_dolphin_with_locator.jpeg",
  },
  {
    nom: "Aigle",
    description: "Rapace puissant à la vue perçante.",
    categorie: "volant",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/6/60/Steinadler%2C_Aquila_chrysaetos_01.JPG",
  },
  {
    nom: "Tigre",
    description: "Félin rayé, chasseur solitaire.",
    categorie: "terrestre",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/56/Tiger.50.jpg",
  },
  {
    nom: "Manchot empereur",
    description: "Oiseau marin ne volant pas, vit en Antarctique.",
    categorie: "aquatique",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/0/07/Emperor_Penguin_Manchot_empereur.jpg",
  },
];

// Classe Animal
class Animal {
  constructor(nom, description, categorie, image) {
    this.nom = nom;
    this.description = description;
    this.categorie = categorie;
    this.image = image;
  }
}

// Ajout du Loup
const Loup = new Animal(
  "Loup",
  "quadrupède, couvert de fourrure habituellement grise.",
  "terrestre",
  "https://upload.wikimedia.org/wikipedia/commons/e/e8/Loup_gris_%28Canis_lupus_%29.jpg"
);
animals.push(Loup);

// Catégories valides
const validCategories = ["terrestre", "aquatique", "volant"];

// Fonction pour afficher les animaux
function displayAnimals(animalsToShow) {
  const div = document.getElementById("animals");
  div.innerHTML = "";

  animalsToShow.forEach((animal) => {
    const card = document.createElement("div");
    card.className = "animal-card";
    card.innerHTML = `
            <h2>${animal.nom}</h2>
            <p><strong>Description :</strong> ${animal.description}</p>
            <p><strong>Catégorie :</strong> ${animal.categorie}</p>
            <img src="${animal.image}" alt="${animal.nom}">
          `;
    div.appendChild(card);
  });
}

// Fonction de validation
function validateForm(formData) {
  let isValid = true;
  const errors = {};

  // Validation du nom
  if (!formData.nom.trim()) {
    errors.nom = "Le nom est obligatoire";
    isValid = false;
  }

  // Validation de la description
  if (!formData.description.trim()) {
    errors.description = "La description est obligatoire";
    isValid = false;
  }

  // Validation de la catégorie
  if (!formData.categorie) {
    errors.categorie = "Veuillez sélectionner une catégorie";
    isValid = false;
  } else if (!validCategories.includes(formData.categorie)) {
    errors.categorie =
      "Catégorie inconnue. Les catégories valides sont : terrestre, aquatique, volant";
    isValid = false;
  }

  // Validation de l'image
  if (!formData.image.trim()) {
    errors.image = "Le lien de l'image est obligatoire";
    isValid = false;
  } else {
    try {
      new URL(formData.image);
    } catch {
      errors.image = "Veuillez entrer une URL valide";
      isValid = false;
    }
  }

  return { isValid, errors };
}

// Fonction pour afficher les erreurs
function displayErrors(errors) {
  // Effacer toutes les erreurs précédentes
  document.querySelectorAll(".form-group").forEach((group) => {
    group.classList.remove("error");
  });

  // Afficher les nouvelles erreurs
  Object.keys(errors).forEach((field) => {
    const input = document.querySelector(`[name="${field}"]`);
    if (input) {
      const formGroup = input.closest(".form-group");
      formGroup.classList.add("error");
      const errorMessage = formGroup.querySelector(".error-message");
      errorMessage.textContent = errors[field];
    }
  });
}

// Fonction pour effacer les erreurs
function clearErrors() {
  document.querySelectorAll(".form-group").forEach((group) => {
    group.classList.remove("error");
  });
}

// Fonction pour afficher le message de succès
function showSuccessMessage() {
  const successMessage = document.getElementById("successMessage");
  successMessage.style.display = "block";
  setTimeout(() => {
    successMessage.style.display = "none";
  }, 3000);
}

// Gestionnaire de soumission du formulaire
document.getElementById("animalForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(this);
  const animalData = {
    nom: formData.get("nom"),
    description: formData.get("description"),
    categorie: formData.get("categorie"),
    image: formData.get("image"),
  };

  const validation = validateForm(animalData);

  if (validation.isValid) {
    // Créer une nouvelle instance d'Animal
    const newAnimal = new Animal(
      animalData.nom,
      animalData.description,
      animalData.categorie,
      animalData.image
    );

    // Ajouter au tableau
    animals.push(newAnimal);

    // Réafficher tous les animaux
    displayAnimals(animals);

    // Réinitialiser le formulaire
    this.reset();
    clearErrors();
    showSuccessMessage();

    console.log("Nouvel animal ajouté:", newAnimal);
    console.log("Tableau animals mis à jour:", animals);
  } else {
    displayErrors(validation.errors);
  }
});

// Affichage initial
displayAnimals(animals);

// Gestionnaire pour le filtrage
const animalFilter = document.getElementById("animalFilter");
animalFilter.addEventListener("change", function () {
  const selectedCategory = animalFilter.value;

  if (selectedCategory === "tous") {
    displayAnimals(animals);
  } else {
    const filtered = animals.filter((animal) => {
      return animal.categorie === selectedCategory;
    });
    displayAnimals(filtered);
  }
});
