var url = window.location.href;
var id = url.substr(url.indexOf("=")+1,url.length);
var rootRef = firebase.database().ref().child("ARTICLES");

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


  firebase.database().ref("USERS/"+id).on('value',function(snapshot){
  document.getElementById("profil-avatar").innerHTML="<img src='"+snapshot.val().PROFILE+"' class='rounded-circle img-thumbnail profil-avatar-crop' alt='profile-image'>";
  
  if(snapshot.val().ISADMIN==String(1)){
  	var nb=0;
  	document.getElementById("profil-info").innerHTML="<h4 class='mt-3'>"+snapshot.val().NOM+" <h4 style='font-style:italic;'>(Administrateur)</h4></h4><p class='text-muted' style='text-align: center'>"+snapshot.val().EMAIL+"</p>";
  	document.getElementById("tableau").style.display="block";
  	document.getElementById("table-title").style.display="block";
  	document.getElementById("table-title").innerHTML="Publications de "+snapshot.val().NOM;
    
  	rootRef.orderByKey().on("child_added", snap => {
    var fb = firebase.database().ref();  
    var Idarticle = snap.ref.getKey();
      fb.child('USERS/'+snap.child("UID").val()).on('value', snapshottt=> {
      i= Number(Idarticle); 
      var titre = snap.child("TITRE").val();
      var resume = snap.child("RESUME").val();
      var date = snap.child("DATE_CREATION").val();
      var auteur = snapshottt.child("NOM").val();
      if(id==snap.child("UID").val()){
      	nb++;
    $("#table_body").append("<tr id='kk'><td ><h3 class='h5 mb-0' style='text-align: left;'><a href='article.html?id="+i+"'>" + titre + "</a></h3><p class='mb-0'>"+resume+"</p></td><td  class='mb-0'>" + date +
                        "</td><td  class='mb-0'><a href='profil.html?id="+snapshottt.ref.getKey()+"' target='_blank'>" + auteur + "</a></td></tr>");
    }
    });
      document.getElementById("total-contri").innerHTML="<p class='mb-0 text-muted' style='text-align: center;''>Nombre d'articles publiés </p><h4 class='mb-4'>"+nb+"</h4>"
    });



  }
  else {
  	document.getElementById("profil-info").innerHTML="<h4 class='mt-3'>"+snapshot.val().NOM+"</h4><p class='text-muted' style='text-align: center'>"+snapshot.val().EMAIL+"</p>";
    firebase.auth().onAuthStateChanged(function(user) {

      if (user) {
        firebase.database().ref("USERS/"+user.uid).on('value',function(snap){
          if (snap.val().ISADMIN==String(1)) {
            if(snapshot.val().ISBANNED==String(0)){
            document.getElementById("btn-bloquer").innerHTML="<button type='button' onclick='bannir()' class='btn btn-danger btn-sm shadow-none mt-3 btn-rounded waves-effect w-md waves-light'>Bloquer l'utilisateur</button>"
          }
          else{
            document.getElementById("btn-bloquer").innerHTML="<h4 style='font-style:italic;'>(Cet utilisateur est banni)</h4>"
          }
          }
        });
      } 
    });
  };
  });

//fonction de bannir l'utilisateur selectionne par l'admin connecte
function bannir(){

  firebase.database().ref("USERS/"+id).update({
    ISBANNED:1,
  }).then(() => { alert("L'utilisateur a été banni !");
}).catch(function(erreur){

        var errorcode = erreur.code;
        var errormessage = erreur.message;
        alert(errormessage);
    });
  

}






  





  