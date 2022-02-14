var titre, auteur, date;
var today = new Date();
var url = window.location.href;
var id = Number(url.substr(url.indexOf("=")+1,url.length))

Ready();
affichage_article();
affichage_commentaire();

//fonction de firebase pour identifer l'utilisateur actuellement connecte
firebase.auth().onAuthStateChanged(function(user) {
	if(user){
		  	//Verifier les previleges de l'utilisateur actuelle
  var fb = firebase.database().ref();
  fb.child('USERS').orderByKey().equalTo(user.uid).once('child_added', snap=> { 
    var url = snap.child("PROFILE").val();
 		 if(snap.child("ISADMIN").val() == String(1))
 		{
    		$("#navigation_admin").append("<li class='nav-item' id='cree'><a class='nav-link text-light font-weight-bold text-uppercase px-3' href='creation.html'>Création</a></li><li class='nav-item' id='modif' ><a class='nav-link text-light font-weight-bold text-uppercase px-3' href='modification.html'>Modification</a> </li>");
  		}
  		if(snap.child("ISBANNED").val()==String(0))
  		{
    		$("#comment").append("<div class='bg-light p-2'><div class='d-flex flex-row align-items-start'><img class='rounded-circle' src='"+url+"' alt='' width='50' height='50' style='border-radius:50%;'><textarea id='contenu' class='form-control ml-1 shadow-none textarea' placeholder='Votre commentaire...' ></textarea></div><div class='mt-2 text-right'><button id='ajout' class='btn btn-primary btn-sm shadow-none' type='button' onclick='ajout_commentaire()'>Publier le commentaire</button><button id='modif' class='btn btn-outline-primary btn-sm ml-1 shadow-none' type='button'>Modifier le commentaire</button></div></div>");
        $("#comment").find("#modif").hide();
      }

  });
  }
}); 


function ajout_commentaire()
{
//fonction de firebase pour identifer l'utilisateur actuellement connecte	
firebase.auth().onAuthStateChanged(function(user) {
var fb = firebase.database().ref();
fb.child('USERS').orderByKey().equalTo(user.uid).once('child_added', snap=> { 

var ref = firebase.database().ref().child("COMMENTAIRES");
ref.once("value", data=> {
			//verifier si on doit cree  le premier article est le premier dans la base de donnes
	if(data.numChildren() > 0){
    ref.limitToLast(1).orderByKey().once("child_added", snapshot=> {
          a = snapshot.key;
            a++;
          firebase.database().ref("COMMENTAIRES/"+a).set({
          	      	//creation commentaires avec ces champs
          CONTENU: document.getElementById("contenu").value,
          DATE: String(today).substring(0,24),
          IDARTICLE: id,
          UID: snap.ref.getKey(),
        }).then(() => { document.location.reload();
}).catch(function(erreur){
        var errorcode = erreur.code;
          var errormessage = erreur.message;
          alert("Commentaire ne doit pas être vide");
          document.location.reload();
        });
        });
  }
  else{
    firebase.database().ref("COMMENTAIRES/1").set({
          CONTENU: document.getElementById("contenu").value,
          DATE: String(today).substring(0,24),
          IDARTICLE: id,
          UID: snap.ref.getKey(),
        }).then(() => { document.location.reload();
}).catch(function(erreur){
        var errorcode = erreur.code;
          var errormessage = erreur.message;
          alert("Commentaire ne doit pas être vide");
          document.location.reload();
        });
  }
 });  	



  });
	});        		

}  

function affichage_commentaire(){
  firebase.auth().onAuthStateChanged(function(user) {
    if(user){
   
  var rootRef = firebase.database().ref().child("COMMENTAIRES");
  rootRef.on("child_added", commentaire => {
var fb = firebase.database().ref();
    fb.child('USERS').on('child_added', admin=> {
   if(admin.ref.getKey()==user.uid)
   {   
    var IDcommentaire = commentaire.ref.getKey();
      i= Number(IDcommentaire);
   var uid = commentaire.child("UID").val();
   var text = commentaire.child("CONTENU").val();
   var dates = commentaire.child("DATE").val();
   var idarticle = commentaire.child("IDARTICLE").val();
   var auteur;
var ref = firebase.database().ref("USERS/"+uid);
  ref.equalTo(String(uid)).on("value", function(snapshot) {
    ref.on("value",snap=>{
      auteur = snap.child("NOM").val();
    var url = snap.child("PROFILE").val();
        var storageRef=firebase.storage().ref();
          var pathReference;
  if(idarticle == id && user )
  {
    i= Number(IDcommentaire);
    
    if(admin.child("ISADMIN").val() == String(1))
      {

          if(admin.ref.getKey()==commentaire.child("UID").val())
          {
          
              $("#tab_com").append("<article class='comment'><a  class='comment-img' href='profil.html?id="+uid+"' target='_blank'><img class='rounded-circle img-thumbnail comm-avatar-crop' src='"+url+"' alt=''></a><div class='comment-body'><div class='text'><p>"+text+"</p></div><p class='attribution'> par <a href='profil.html?id="+uid+"' target='_blank'>"+auteur+"</a> à "+dates.substring(0,24)+"<button class='btn btn-danger btn-sm shadow-none ml-3' type='button' id='"+i+"' onclick='Supprimer_commentaire()' >Supprimer</button><button class='btn btn-primary btn-sm shadow-none ml-3' type='button'  id='"+i+"' onclick='Modifier_commentaire()' >Modifier</button><p></p></p></div></article>");  
          } 
           else{
              $("#tab_com").append("<article class='comment'><a  class='comment-img' href='profil.html?id="+uid+"' target='_blank'><img class='rounded-circle img-thumbnail comm-avatar-crop' src='"+url+"' alt=''></a><div class='comment-body'><div class='text'><p>"+text+"</p></div><p class='attribution'> par <a href='profil.html?id="+uid+"' target='_blank'>"+auteur+"</a> à "+dates.substring(0,24)+"<button class='btn btn-danger btn-sm shadow-none ml-3' type='button' id='"+i+"' onclick='Supprimer_commentaire()' >Supprimer</button></p></p></div></article>");
          }
        }

      else
      {
          if(admin.ref.getKey()==commentaire.child("UID").val())
          {
              $("#tab_com").append("<article class='comment'><a  class='comment-img' href='profil.html?id="+uid+"' target='_blank'><img class='rounded-circle img-thumbnail comm-avatar-crop' src='"+url+"' alt=''></a><div class='comment-body'><div class='text'><p>"+text+"</p></div><p class='attribution'> par <a href='profil.html?id="+uid+"' target='_blank'>"+auteur+"</a> à "+dates.substring(0,24)+"<button class='btn btn-danger btn-sm shadow-none ml-3' type='button' id='"+i+"' onclick='Supprimer_commentaire()' >Supprimer</button><button class='btn btn-primary btn-sm shadow-none ml-3' type='button'  id='"+i+"' onclick='Modifier_commentaire()' >Modifier</button><p></p></p></div></article>");  
          }
          else
          {
              $("#tab_com").append("<article class='comment'><a  class='comment-img' href='profil.html?id="+uid+"' target='_blank'><img class='rounded-circle img-thumbnail comm-avatar-crop' src='"+url+"'  alt=''></a><div class='comment-body'><div class='text'><p>"+text+"</p></div><p class='attribution'> par <a href='profil.html?id="+uid+"' target='_blank'>"+auteur+"</a> à "+dates.substring(0,24)+"</p></p></div></article>");
 
          }
      }


     
  }

  })
  });
}
});
});
}
});  
}



function affichage_article(){
firebase.database().ref("ARTICLES/"+id).on('value',function(snapshot){
  var fb = firebase.database().ref();  
    fb.child('USERS/'+snapshot.val().UID).on('value', snap=> { 
  titre.innerHTML = snapshot.val().TITRE;
  auteur.innerHTML = "<a href='profil.html?id="+snapshot.val().UID+"'>"+snap.val().NOM+"</a>";
  date.innerHTML = snapshot.val().DATE_CREATION;
  contenu.innerHTML = snapshot.val().CONTENU;
  });
});
} 

function Supprimer_commentaire(){
	$('#tab_com').on('click', 'button', function(e) {
        var rootRef1 = firebase.database().ref();
event.preventDefault();
     var r = confirm("Appuyez sur un button!\nOK ou annuler\nVous etes Sure !!");
     if (r == true) {
      event.preventDefault();
  rootRef1.child("COMMENTAIRES/"+e.target.id).remove();
    window.alert("Le commentaire est Supprime");
  document.location.reload();
  } 
});
}

function Modifier_commentaire(){
  $('#tab_com').on('click', 'button', function(e) {

event.preventDefault();
  firebase.database().ref("COMMENTAIRES/"+e.target.id).on('value',function(snapshot){
  document.getElementById("contenu").innerHTML = snapshot.val().CONTENU;
  $("#comment").find("#modif").show();
    document.getElementById("ajout").style.display = "none";

   $('#comment').on('click', 'button', function(ee) {
    firebase.database().ref("COMMENTAIRES/"+e.target.id).update({
      CONTENU: document.getElementById("contenu").value
      }).then(() => { document.location.reload();
}).catch(function(erreur){

        var errorcode = erreur.code;
        var errormessage = erreur.message;
          alert("Commentaire ne doit pas être vide");
          document.location.reload();
    });
      
  });

  });


});
}


function Ready(){
	//recuperer les valeurs depuis html
  titre = document.getElementById("titrev");
  auteur = document.getElementById("auteurv");
  date = document.getElementById("datev");
  contenu = document.getElementById("contenuv");

 }

