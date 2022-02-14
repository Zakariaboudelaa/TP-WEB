firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    alert("Connexion réussie : "+user.email);
    window.location = "acceuil.html";
  } else {
    
  }
});
  
//fonction d'identification utilisateur
function login(){
  var userEmail = document.getElementById("inputEmail").value;
  var userPass = document.getElementById("inputPassword").value;
  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    window.alert("ERREUR : " + errorMessage);
    // ...
  });

}

