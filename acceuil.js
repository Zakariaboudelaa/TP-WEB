
var rootRef = firebase.database().ref().child("ARTICLES");
var uid = null;



firebase.auth().onAuthStateChanged(function(user) {
  var fb = firebase.database().ref();
  if(user){
  fb.child('USERS').orderByKey().equalTo(user.uid).once('child_added', snap=> { 
  if(snap.child("ISADMIN").val() == String(1)){
    $("#navigation_admin").append("<li class='nav-item' id='cree'><a class='nav-link text-light font-weight-bold text-uppercase px-3' href='creation.html'>Création</a></li><li class='nav-item' id='modif' ><a class='nav-link text-light font-weight-bold text-uppercase px-3' href='modification.html'>Modification</a> </li>       <li class='nav-item' id='users-list'><a class='nav-link text-light font-weight-bold text-uppercase px-3' href='userslist.html'>Utilisateurs</a></li>");
    
 	 }
  else{

  } 
  });
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
                        "</td><td  class='mb-0'><a href='profil.html?id="+snapshot.ref.getKey()+"' target='_blank'>" + auteur + "</a></td></tr>");
    });
    });
  



