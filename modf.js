
var rootRef = firebase.database().ref().child("ARTICLES");
var uid = null;



//fonction de firebase pour identifer l'utilisateur actuellement connecte

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
            //Verifier les previleges de l'utilisateur actuelle
     firebase.database().ref().child('USERS').orderByKey().equalTo(user.uid).once('child_added', snap=> { 
  if(snap.child("ISADMIN").val() == String(1)){
    $("#navigation_admin").append("<li class='nav-item' id='cree'><a class='nav-link text-light font-weight-bold text-uppercase px-3' href='creation.html'>Création</a></li><li class='nav-item' id='modif' ><a class='nav-link text-light font-weight-bold text-uppercase px-3' href='modification.html'>Modification</a> </li>       <li class='nav-item' id='users-list'><a class='nav-link text-light font-weight-bold text-uppercase px-3' href='userslist.html'>Utilisateurs</a></li>");
    
   }
 });
    rootRef.orderByKey().on("child_added", snap => {
    var fb = firebase.database().ref();  
    var Idarticle = snap.ref.getKey();
      fb.child('USERS/'+snap.child("UID").val()).on('value', snapshot=> {
      i= Number(Idarticle);
      var titre = snap.child("TITRE").val();
      var resume = snap.child("RESUME").val();
      var date = snap.child("DATE_CREATION").val();
      var auteur = snapshot.child("NOM").val();
    $("#table_body").append("<tr id='kk'><td ><h3 class='h5 mb-0'><a href='article.html?id="+i+"'>" + titre + "</a></h3><p class='mb-0'>"+resume+"</p></td><td  class='mb-0'>" + date +
                        "</td><td  class='mb-0'><a href='profil.html?id="+snapshot.ref.getKey()+"' target='_blank'>" + auteur + "</a></td><td class='cell'><button class='btn btn-danger btn-sm shadow-none ml-3' id='"+i+"' onclick='Supprimer_article()' >Supprimer </button></td><td class='cell'><button class='btn btn-primary btn-sm shadow-none ml-3' id='"+i+"' onclick='Modifier_article()' >Modifier</button></td></tr>");

  
    });
    });
    }
});


function Supprimer_article() {

	$('#table_body').on('click', 'button', function(e) {
    var rootRef1 = firebase.database().ref();
    var rootRef2 = firebase.database().ref().child("COMMENTAIRES");
event.preventDefault();
     var r = confirm("Appuyez sur un button!\nOK ou annuler\nVous etes Sure !!");
     if (r == true) {
      event.preventDefault();
  rootRef1.child("ARTICLES/"+e.target.id).remove();
   rootRef2.on("child_added",snap=>{
    var Idar = snap.child("IDARTICLE").val();  
    if (Number(Idar)== Number(e.target.id)) {
    snap.ref.remove();
 
    }
   })
    window.alert("L'article a été supprimé avec succès.");
  document.location.reload();
  } 
});
}

function Modifier_article(){

	$('#table_body').on('click', 'button', function(e) {
    window.location = "creation.html? modifier_id="+e.target.id;
});



}




