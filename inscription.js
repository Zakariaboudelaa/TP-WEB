var files =[];
const  fileType = files['type'];
const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

//afficher path de l'image 
var input = document.getElementById("up");
input.onchange = e => {
  files = e.target.files;
  document.getElementById("label").innerHTML = input.value;
  input.click();
}





function inscrire(){
//recuperer les valeurs depuis html
var email= document.getElementById("email");
var nom = document.getElementById("name");
var motpass = document.getElementById("pass");
//creation d'un nouveau utilisateur par son email et mot pass
firebase.auth().createUserWithEmailAndPassword(email.value,motpass.value).then(function(reponse){
  var ref = firebase.database().ref().child("USERS");
     //recuperation de l'image et stocker dans firebase storage et recuperer son URL
    var storageRef = firebase.storage().ref('Profile/'+firebase.auth().currentUser.uid+'.png');
   var uploadTask = storageRef.put(files[0]);
    uploadTask.on("state_changed",null,null,function(){
    storageRef.getDownloadURL().then(function(url){
     firebase.database().ref("USERS/"+firebase.auth().currentUser.uid).set({
      //initialisation des champs dans la base de donnes d'un nouveau utilisateur
    EMAIL: firebase.auth().currentUser.email,
    ISADMIN: 0,
    ISBANNED: 0,
    NOM: nom.value,
    PROFILE:url,
  }).then(() => { alert("Inscription réussie.")
        window.location = "login.html"
}).catch(function(erreur){
        var errorcode = erreur.code;
          var errormessage = erreur.message;
          alert("Inscription échouée");
       	 firebase.auth().currentUser.delete().then(function() {
				}).catch(function(error) {
				});
			   storageRef.delete().then(function() {
				}).catch(function(error) {
				});		

        });
 
        });
    });
}).catch(function(erreur){
        var errorcode = erreur.code;
          var errormessage = erreur.message;
          alert(errormessage);
        });
}


