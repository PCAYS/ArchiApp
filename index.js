var express = require('express'); //import de la bibliothèque Express
var app = express(); //instanciation d'une application Express

// Pour s'assurer que l'on peut faire des appels AJAX au serveur
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Ici faut faire faire quelque chose à notre app...
// On va mettre les "routes"  == les requêtes HTTP acceptéés par notre application.

// Test 
app.get('/test/blihblah', function(req, res) {
  res.json({"msg": "blihblah"});
})

/* Compteur */
let cpt = 0;

/* Query */
app.get('/cpt/query', function(req, res) {
  res.json({"compteur": cpt});
})

/* Inc */
app.get('/cpt/inc', function(req, res) {
  let incr = 1;
  // La requête a-t-elle un paramètre "valeur" ?
  if (req.query.v !== undefined) {
      if (req.query.v.match(/^[-+]?\d+$/)) {
          incr = parseInt(req.query.v);
      } else {
          return res.json({ "code": -1 });
      }
  }
  // Si il n'y a pas de paramètre "valeur"
  cpt += incr;
  res.json({"code" : 0});
})

// Micro-service de gestion de messages

let allMsgs = [
  { pseudo: "Nimi Nightmare", msg: "Konbakuwa ~", timestamp: "2024-03-07 15:56" },
  { pseudo: "Napling", msg: "Non-stop Nimi Nightmare !", timestamp: "2024-03-08 12:30" },
  { pseudo: "Napling", msg: "We love Baby Bean <3", timestamp: "2024-03-09 4:17" },
  {pseudo: "Nimi Nightmare", msg : "Feel-better beeeeam"  , timestamp: "2024-03-10 11:37"},
  {pseudo: "Nimi Nightmare", msg : "Oyasunimi <3"  , timestamp: "2024-03-10 21:08"}
];

/* Get message with its number */
app.get('/msg/get/*', function(req, res) {
  // Extraire l'indice depuis l'URL après /msg/get/
  let indexStr = req.url.substr(9);
  // Vérifie si indexStr est un entier
  if (indexStr.match(/^[-+]?\d+$/)) {
    let index = parseInt(indexStr);
    // Vérifie que l'indice est dans les bornes du tableau
    if (index >= 0 && index < allMsgs.length) {
      return res.json({ "code": 1, "msg": allMsgs[index] });
    } 
    else {
        return res.json({ "code": 0});
    }
  }   
})

/* Get number of messages */
app.get('/msg/nber', function(req, res) {
  res.json({"Longueur de la liste": allMsgs.length});
})

/* Get all messages */
app.get('/msg/getAll', function(req, res) {
  res.json({allMsgs: allMsgs});
})

/* Erase message with its number */
app.get('/msg/del/*', function(req, res) {
  // Extraire l'indice depuis l'URL après /msg/get/
  let indexStr = req.url.substr(9);
  // Vérifie si indexStr est un entier
  if (indexStr.match(/^[-+]?\d+$/)) {
    let index = parseInt(indexStr);
    if (index >= 0 && index < allMsgs.length) {
      const deletedMsg = allMsgs.splice(index, 1);
      return res.json({ code: 1, msg:"Message supprimé", deleted: deletedMsg[0], allMsgs });
    } 
    else {
        return res.json({ "code": 0});
    }
  }
})

/* Post message */
app.get('/msg/post', function(req, res) {
  // Extraire le message depuis l'URL
  if (req.query.pseudo !== undefined) {
    pseudo = req.query.pseudo;
  } else {
      return res.json({ "code": -1 });
  }
  if (req.query.msg !== undefined) {
    message = req.query.msg;
  } else {
      return res.json({ "code": -1 });
  }
  if (!message || message.trim() === "") {
      return res.json({ code: -1, msg: "Aucun message à ajouter" });
    }
  // Ajout du message à la fin du tableau
  let now = new Date().toLocaleString();
  allMsgs.push({ pseudo: pseudo, msg: message, timestamp: now });
  const index = allMsgs.length - 1;
  return res.json({ code: 1, msg: "Message ajouté", index: index, allMsgs });
  });



// Listen
app.listen(8080); //commence à accepter les requêtes
console.log("App listening on port 8080...");

