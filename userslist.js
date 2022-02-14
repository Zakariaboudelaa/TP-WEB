var url = window.location.href;
var id = url.substr(url.indexOf("=")+1,url.length);
var rootRef = firebase.database().ref().child("USERS");

//fonction de firebase pour identifer l'utilisateur actuellement connecte
    firebase.auth().onAuthStateChanged(function(user) {
      var fb = firebase.database().ref();
      if(user){
                    //Verifier les previleges de l'utilisateur actuelle
      fb.child('USERS').orderByKey().equalTo(user.uid).once('child_added', snap=> { 
      if(snap.child("ISADMIN").val() == String(1)){
        $("#navigation_admin").append("<li class='nav-item' id='cree'><a class='nav-link text-light font-weight-bold text-uppercase px-3' href='creation.html'>Création</a></li><li class='nav-item' id='modif' ><a class='nav-link text-light font-weight-bold text-uppercase px-3' href='modification.html'>Modification</a> </li>       <li class='nav-item' id='users-list'><a class='nav-link text-light font-weight-bold text-uppercase px-3' href='userslist.html'>Utilisateurs</a></li>");
        
        rootRef.orderByKey().on("child_added", info => {
    var IdUser = info.ref.getKey();
      i= IdUser; 
      var nom = info.child("NOM").val();
      var email = info.child("EMAIL").val();
      var isAdmin = info.child("ISADMIN").val();
      var url = info.child("PROFILE").val();
      var banned = info.child("ISBANNED").val();
//affichage de liste utilisateurs si l'utilisateur connecte est admin
      if(isAdmin==String(1)){
        $("#table_body").append("<tr><td width='10%'><div class='col-md-2 col-sm-2'><img src='"+url+"' alt='"+nom+"' class='rounded-circle profile-photo-lg'></div></td><td width='90%'><div class='col-md-7 col-sm-7'><h5><a href='profil.html?id="+i+"' class='profile-link'>"+nom+"</a></h5><p class='text-muted'>"+email+"</p></div></td></tr>");
      }
      else{
//affichage de liste utilisateurs si l'utilisateur connecte n'est pas admin


        $("#table_body").append("<tr><td width='10%'><div class='col-md-2 col-sm-2'><img src='"+url+"' alt='"+nom+"' class='rounded-circle profile-photo-lg'></div></td><td width='80%'><div class='col-md-7 col-sm-7'><h5><a href='profil.html?id="+i+"' class='profile-link'>"+nom+"</a></h5><p class='text-muted'>"+email+"</p></div></td><td><div class='col-md-3 col-sm-3'><button name='botto' id='"+i+"' onclick='makeadmin()' class='btn btn-primary pull-right'>Ajouter le rôle administrateur</button></div></td></tr>");

          //affichage de liste utilisateurs si l'utilisateur connecte est banni

        if(banned == String(1))
        {

			$("#table_body").find("#"+String(i)).hide();        	
        }

      }
      
    
    });
       } 
      });
      }
    });  
//fonction pour rendre un utilisateur selectionne par l'admin connecté un admin
function makeadmin(){

$('#table_body').on('click', 'button', function(e) {
  firebase.database().ref("USERS/"+e.target.id).update({
    ISADMIN:1,
  }).then(() => { alert("L'utilisateur EST ADMIN !");
  document.location.reload();
}).catch(function(erreur){

        var errorcode = erreur.code;
        var errormessage = erreur.message;
        alert(errormessage);
    });;
});
}
   









  





  