/*
// Calcul de n!
function fact(n) {
   if (n === 0 || n === 1) {
        return 1;
    }
   return n * fact(n - 1);
}
// Afficher 6!
console.log(fact(6))
// Appliquer une fonction aux éléments d'un tableau
function applique(f, tab) {
   return tab.map(f);
}
// Afficher un tableau des factorielles de 1 à 6
console.log(applique(fact,[1,2,3,4,5,6]));
// Afficher un tableau des nombres suivants de 1 à 6
console.log(applique(function(n) { return (n+1); } , [1,2,3,4,5,6]));
*/

let msgs = [];

// Fonction de mise à jour
function update(messages) {
    // Sélectionne la liste des messages dans le DOM
    let listContainer = document.querySelector("ul");

    // Efface tout le contenu existant de la liste
    listContainer.innerHTML = "";

    // Parcourt le tableau de messages et crée des <li>
    messages.forEach(item => {
        let li = document.createElement("li");
        if (item.pseudo) {
              li.innerHTML = `${item.msg} <br><small>Publié par <strong>${item.pseudo} </strong> le ${item.timestamp}</small>`;
        } 
        else {
              li.textContent = item.msg;
        }
        listContainer.appendChild(li);
    });
}

// Ajout de l'événement sur le bouton pour mettre à jour la liste
document.querySelector("#màj").addEventListener("click", function() {
    fetch('https://f78c639f-346e-47d7-994e-291aa6d9472b-00-1zkj4hu6q5ngw.spock.replit.dev/msg/getAll')
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      update(data.allMsgs);
    });
});

// Ajout de l'événement sur le bouton pour changer le style de la page
document.querySelector("#style").addEventListener("click", function() {
    document.body.classList.toggle('dark-mode');
});

// Ajout de l'événement sur le bouton pour envoyer un message
document.querySelector("#envoyer").addEventListener("click", function() {
    let pseudo = document.querySelector("#pseudo").value.trim();
    let message = document.querySelector("#commentaire").value.trim();
    if (pseudo && message) {
        let now = new Date().toLocaleString();
        fetch(`https://f78c639f-346e-47d7-994e-291aa6d9472b-00-1zkj4hu6q5ngw.spock.replit.dev/msg/post?pseudo=${encodeURIComponent(pseudo)}&msg=${encodeURIComponent(message)}`)
        .then(response => response.json())
        .then(data => {
            if (data.code === 1) {
                console.log("Message ajouté !");
                document.querySelector("#commentaire").value = "";
document.querySelector("#pseudo").value = "";
            };
        });
    } else {
        alert("Merci de remplir le pseudo et le message !");
    }
});

// Mise en relation
fetch('https://f78c639f-346e-47d7-994e-291aa6d9472b-00-1zkj4hu6q5ngw.spock.replit.dev/msg/getAll')
.then(function(response) {
  return response.json();
})
.then(function(data) {
  update(data.allMsgs);
});
