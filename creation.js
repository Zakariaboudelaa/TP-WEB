var titre, auteur, resume;
var a;
 var today = new Date();
var url = window.location.href;
var id = Number(url.substr(url.indexOf("=")+1,url.length))

//fonction de firebase pour identifer l'utilisateur actuellement connecte
firebase.auth().onAuthStateChanged(function(user) {
  var fb = firebase.database().ref();
  if(user){
  	//Verifier les previleges de l'utilisateur actuelle
  fb.child('USERS').orderByKey().equalTo(user.uid).once('child_added', snap=> { 
  if(snap.child("ISADMIN").val() == String(1)){
    $("#navigation_admin").append("<li class='nav-item' id='cree'><a class='nav-link text-light font-weight-bold text-uppercase px-3' href='creation.html'>Création</a></li><li class='nav-item' id='modif' ><a class='nav-link text-light font-weight-bold text-uppercase px-3' href='modification.html'>Modification</a> </li>       <li class='nav-item' id='users-list'><a class='nav-link text-light font-weight-bold text-uppercase px-3' href='userslist.html'>Utilisateurs</a></li>");
    
   }
  else{

  } 
  });
  }
});    

//verifier si on doit modifier ou cree un nouveau article
if(Number.isNaN(id)==false){

  firebase.database().ref("ARTICLES/"+id).on('value',function(snapshot){
  document.getElementById("titrev").value = snapshot.val().TITRE;
  document.getElementById("resumev").value = snapshot.val().RESUME;
  document.getElementById("contenuv").innerHTML = snapshot.val().CONTENU;
  });
  }
 

function submitclick(){
Ready();
firebase.auth().onAuthStateChanged(function(user) {
	var fb = firebase.database().ref();
	if(Number.isNaN(id)){
	var ref = firebase.database().ref().child("ARTICLES");
    ref.once("value", data=> {
		//verifier si on doit cree  le premier article est le premier dans la base de donnes
      if(data.numChildren() > 0){

        ref.limitToLast(1).orderByKey().once("child_added", snapshot=> {
      a = snapshot.key;
        a++;
      firebase.database().ref("ARTICLES/"+a).set({
      	//creation article avec ces champs
      TITRE: titre,
      RESUME: resume,
      UID: user.uid,
      DATE_CREATION: String(today).substring(0,24),
      CONTENU:contenu
      }).then(() => { alert("L'article a été créé avec succès.")
        window.location = "acceuil.html"
}).catch(function(erreur){

        var errorcode = erreur.code;
        var errormessage = erreur.message;
        alert("Vérifier si les champs ne sont pas vides.");
        document.location.reload();
    });
       
  
    });

      }
      else{
        firebase.database().ref("ARTICLES/1").set({
      TITRE: titre,
      RESUME: resume,
      UID: user.uid,
      DATE_CREATION: String(today).substring(0,24),
      CONTENU:contenu
      }).then(() => { alert("L'article a été créé avec succès.")
        window.location = "acceuil.html"
}).catch(function(erreur){

        var errorcode = erreur.code;
        var errormessage = erreur.message;
        alert("Vérifier si les champs ne sont pas vides.");
        document.location.reload();
    });

      }



});
	}
  else{
  	//ici c'est modification article par fonction update
    firebase.database().ref("ARTICLES/"+id).update({
      TITRE: titre,
      RESUME: resume,
      CONTENU:contenu
      }).then(() => { alert("La modification a été effectuée avec succès.")
        window.location = "acceuil.html"
}).catch(function(erreur){

        var errorcode = erreur.code;
        var errormessage = erreur.message;
        alert("Vérifier si les champs ne sont pas vides.");
        document.location.reload();
    });
        

  }
	});
	
  
}

function Ready(){
	//recuperer les valeurs depuis html
	  titre = document.getElementById("titrev").value;
	  contenu = document.getElementById("contenuv").value;
    resume = document.getElementById("resumev").value;
 }
