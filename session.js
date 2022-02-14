//garder la session d'utilisateur et la mettre en local
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  .then(function() {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  })
  .catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
  });

//fonction de firebase pour identifer l'utilisateur actuellement connecte

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
            //Verifier les privileges de l'utilisateur actuelle

 	var ref = firebase.database().ref().child("ARTICLES");
 	//afficher les statistiques de blog 'nombre de commentaires et articles'
    ref.once("value", data=> {

    	$("#card").append("<h2 class='h4 card-title'>Statistiques</h2><dl class='row mb-0'><dt class='col-8'>Publications</dt><dd class='col-4 mb-0'>"+data.numChildren()+"</dd></dl>");

    });
    var ref = firebase.database().ref().child("COMMENTAIRES");
    ref.once("value", data=> {
    	$("#card").append("<dl class='row mb-0'><dt class='col-8'>Commentaires</dt><dd class='col-4 mb-0'>"+data.numChildren()+"</dd></dl>");

    });
    document.getElementById("logout").style.display ="block";


  } else {
  	document.getElementById("stats").style.display ="none";
    
  }
});

//fonction de deconnexion 
function logout() {
    firebase.auth().signOut().then(() => {
      window.location="login.html";
  // Sign-out successful.
}).catch((error) => {
  // An error happened.
});

  }

