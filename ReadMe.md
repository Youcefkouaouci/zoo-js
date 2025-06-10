Voici un **plan clair des étapes à suivre pour chaque élément** de ton évaluation en JavaScript, suivi d’un **fichier template de base** en JS/HTML pour t’aider à démarrer.

---

## ✅ **Étapes par élément**

### 1. **Création des données**

Objectif : créer un tableau d’objets représentant tes données.

**Étapes** :

- Créer une structure d’objet (ex: `{ id, nom, email, age }`)
- Créer un tableau contenant plusieurs objets
- Optionnel : stocker ou charger ces données depuis `localStorage`

```js
let utilisateurs = [
  { id: 1, nom: "Alice", email: "alice@email.com", age: 25 },
  { id: 2, nom: "Bob", email: "bob@email.com", age: 30 },
];
```

---

### 2. **Affichage général**

Objectif : afficher toutes les données dans le HTML (table, liste, etc.)

**Étapes** :

- Sélectionner l'élément HTML d'affichage
- Parcourir les données avec `.forEach()` ou `.map()`
- Générer et insérer le HTML dynamiquement (innerHTML ou DOM API)

```js
function afficherUtilisateurs() {
  const tbody = document.getElementById("utilisateurs");
  tbody.innerHTML = ""; // Vider avant réaffichage

  utilisateurs.forEach((u) => {
    tbody.innerHTML += `
      <tr>
        <td>${u.nom}</td>
        <td>${u.email}</td>
        <td>${u.age}</td>
      </tr>`;
  });
}
```

---

### 3. **Filtrage des données**

Objectif : filtrer dynamiquement selon un critère (ex: nom ou âge)

**Étapes** :

- Ajouter un champ de recherche (`input`)
- Récupérer la valeur du filtre
- Utiliser `.filter()` sur le tableau
- Réafficher les résultats filtrés

```js
function filtrerUtilisateurs(valeur) {
  const resultat = utilisateurs.filter((u) =>
    u.nom.toLowerCase().includes(valeur.toLowerCase())
  );
  afficherUtilisateurs(resultat);
}
```

---

### 4. **Ajout de données / Formulaires (4,5 points)**

Objectif : permettre l’ajout via un formulaire

**Étapes** :

- Créer un formulaire HTML avec champs (nom, email, âge)
- Écouter `submit`
- Récupérer les données
- Valider (voir point 5)
- Ajouter au tableau, puis réafficher

```js
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const nom = form.nom.value.trim();
  const email = form.email.value.trim();
  const age = parseInt(form.age.value);

  if (!nom || !email || isNaN(age)) {
    alert("Champs invalides");
    return;
  }

  const nouvelUtilisateur = { id: Date.now(), nom, email, age };
  utilisateurs.push(nouvelUtilisateur);
  afficherUtilisateurs();
  form.reset();
});
```

---

### 5. **Validation des données**

Objectif : vérifier les données côté JS

**Étapes** :

- Vérifier que les champs ne sont pas vides
- Vérifier le type (ex: `email`, `age > 0`)
- Afficher des messages d’erreur ou styliser les champs invalides

---

### 6. **UX/UI**

Objectif : rendre l’interface agréable

**Étapes** :

- Affichage clair (tableaux, listes)
- Boutons visibles, styles CSS simples
- Feedback utilisateur (alertes, messages, animations)
- Responsive design si possible (flexbox, media queries)

---

## 📁 **Fichier template JS/HTML de base**

```html
<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <title>Gestion Utilisateurs</title>
    <style>
      body {
        font-family: Arial;
        margin: 20px;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
      }
      th,
      td {
        border: 1px solid #ccc;
        padding: 10px;
        text-align: left;
      }
      input[type="text"],
      input[type="number"],
      input[type="email"] {
        padding: 5px;
      }
    </style>
  </head>
  <body>
    <h1>Liste des Utilisateurs</h1>

    <input type="text" id="filtre" placeholder="Filtrer par nom..." />

    <form id="formulaire">
      <h2>Ajouter un utilisateur</h2>
      <input type="text" name="nom" placeholder="Nom" required />
      <input type="email" name="email" placeholder="Email" required />
      <input type="number" name="age" placeholder="Âge" required />
      <button type="submit">Ajouter</button>
    </form>

    <table>
      <thead>
        <tr>
          <th>Nom</th>
          <th>Email</th>
          <th>Âge</th>
        </tr>
      </thead>
      <tbody id="utilisateurs"></tbody>
    </table>

    <script>
      let utilisateurs = [
        { id: 1, nom: "Alice", email: "alice@email.com", age: 25 },
        { id: 2, nom: "Bob", email: "bob@email.com", age: 30 },
      ];

      const tbody = document.getElementById("utilisateurs");
      const form = document.getElementById("formulaire");
      const filtreInput = document.getElementById("filtre");

      function afficherUtilisateurs(liste = utilisateurs) {
        tbody.innerHTML = "";
        liste.forEach((u) => {
          tbody.innerHTML += `<tr><td>${u.nom}</td><td>${u.email}</td><td>${u.age}</td></tr>`;
        });
      }

      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const nom = form.nom.value.trim();
        const email = form.email.value.trim();
        const age = parseInt(form.age.value);

        if (!nom || !email || isNaN(age) || age <= 0) {
          alert("Veuillez remplir tous les champs correctement.");
          return;
        }

        utilisateurs.push({ id: Date.now(), nom, email, age });
        afficherUtilisateurs();
        form.reset();
      });

      filtreInput.addEventListener("input", () => {
        const val = filtreInput.value;
        const filtré = utilisateurs.filter((u) =>
          u.nom.toLowerCase().includes(val.toLowerCase())
        );
        afficherUtilisateurs(filtré);
      });

      afficherUtilisateurs();
    </script>
  </body>
</html>
```

---

Si tu veux que je t’aide à personnaliser ce code pour un sujet spécifique (ex: livres, produits, élèves), dis-moi.
