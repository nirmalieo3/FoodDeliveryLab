var via, citta, cap, civico;

$(document).ready(function(){
  geolocate();
  
  $("#numCivico").on("input",function(){
    civico=$(this).val();    
    if(civico.length>0){
      $("#alertNumCivico").fadeOut(500);
    }
    else{
      $("#alertNumCivico").fadeIn(500);
    }
  });
  
  
  $("#ricercaIndirizzo").on("input",function(){
    var testo=$(this).val();    
    if(testo.length==0){
      $("#numCivico").removeClass("attivo");
      $("#alertNumCivico").fadeOut(100);        
    }
  });  
  
  
  $("#cerca").click(function(e){
    e.preventDefault();   
    var address=via+" "+civico+" "+cap+" "+citta;  
    
    trovaCoords(address);    
    
    $("#boxConferma h3").html(via+", "+civico+" - "+cap+" "+citta);

  });
  

  
}); //qui chiudo il document.ready



/*****QUI SCRIVO LE FUNZIONI ******/
/**********************************/


var ripetiLeggi;
function trovaCoords(indirizzo){
  var geocoder;
  geocoder = new google.maps.Geocoder();  
  
  geocoder.geocode({'address': indirizzo}, function(results, status) {    
    if (status == google.maps.GeocoderStatus.OK) {
     document.getElementById('latlon').value = results[0].geometry.location;
    } 
    else {
       alert('Geocode non ha funzionato per il seguente motivo: ' + status);
    }
  });
  ripetiLeggi=setInterval(leggiCoords,100);
}


function leggiCoords(){  
  if($('#latlon').val().length>0){
    var coordinate=$('#latlon').val(); 
    clearInterval(ripetiLeggi);
    creaMappa(coordinate);     
  }

}


function creaMappa(coords){

  var dividiCoords=coords.split(",");
  var lat,lon;
  lat=dividiCoords[0].replace("(","").trim();
  lon=dividiCoords[1].replace(")","").trim();  
  
  $("#latitudine").val(lat);
  $("#longitudine").val(lon);  
  
  var centroMappa = new google.maps.LatLng(lat, lon);
  
  var opzioniMappa = {
      zoom: 19,
      center: centroMappa,
      mapTypeId: google.maps.MapTypeId.ROADMAP
  }
 console.log(opzioniMappa)
  var mappa = new google.maps.Map(document.getElementById("mappa"), opzioniMappa);
    var marker = new google.maps.Marker({
        position: centroMappa,
        map: mappa
  });
  
  $("#boxConferma").fadeIn(500);

} 

var autocomplete; 
//variabile globale vista da 3 funzioni:
// initAutocomplete() / fillInAddress() / geolocate()

function initAutocomplete(){
  autocomplete = new google.maps.places.Autocomplete(
    (document.getElementById("ricercaIndirizzo")),
    {types: ['address']});  
    autocomplete.addListener('place_changed', fillInAddress);
}

function fillInAddress(){ 

  try{
    
    var place = autocomplete.getPlace();        
    via=place.address_components[0].long_name;
    citta=place.address_components[1].long_name;
    try{
        cap=place.address_components[6].short_name;  
    }
      catch{
        cap="";
    };

     
      
      $("#home #errore").fadeOut(30);
      //qua scrivo il codice per far comparire l'input indirizzo
      $("#numCivico").val("").addClass("attivo").focus();
      $("#alertNumCivico").fadeIn(1000);
    }
    catch{
      via="";
      cap="";
      citta="";
      $("#home #errore")
      .css("top","-150%")
      .fadeIn(300);
      $("#numCivico").removeClass("attivo");
      $("#alertNumCivico").fadeOut(100);
    }

}



function geolocate(){
  if (navigator.geolocation) {
          
    $("#loading").fadeIn(300);
    
    navigator.geolocation.getCurrentPosition(function(position){              
      var geolocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      $("#loading").fadeOut(200);
      //$("#home section").fadeIn(800);
      
      $("#ricercaIndirizzo").focus();
      
      
      var circle = new google.maps.Circle({
          center: geolocation,
          radius: position.coords.accuracy

      });
      autocomplete.setBounds(circle.getBounds());
    });

  }
}

function closeFun(){
  document.getElementById('boxConferma').style.display ='none'
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('login').onclick = login
})



function login() {
    var repetiPsw = document.forms['loginForm'].elements.repetiPsw;
    var password = document.forms['loginForm'].elements.psw;
    
    if (password.value !== repetiPsw.value){
        alert('non hai compilato correttemente la password');
        
    }

   
}