/* 
fichier js du TP : 32_TP_JS-Ajax_Meteo : version 01
30_TP_JS-AJAX_Meteo.js : lecture par ajax d'un web service : réponse json
Didier Bonneau CDI Afpa Créteil
*/


/**
 * Envoi de la requete
 */
function requete() {
    // Création d'un objet XMLHttpRequest
    objetXHR = creationXHR();
    // création de la fonction de callback
    objetXHR.onreadystatechange = reponse;
    // Configuration de requête GET et Synchrone
    objetXHR.open("get", "https://www.prevision-meteo.ch/services/json/paris", true);
    // supression des tr de la table
    document.getElementById("result").innerHTML = "";
    // Affichage du chargeur
    document.getElementById("chargeur").style.display = "block";
    // Envoi de la requête
    objetXHR.send( null ); 
}

/**
 * traitement de la réponse
 */
function reponse() {
   /*---------- Attente du retour SYNCHRONE  : */
   if(objetXHR.readyState == 4){
       if(objetXHR.status == 200){
           //alert("reponse reçue");
            // Récupération  du résultat renvoyé par le serveur
            // traduction de expos en objet javascript
            meteo = JSON.parse(objetXHR.responseText);
             // création des <tr> du tableau
            var tr = '';
            var heure = '';
            for(var i=0; i<24; i++){
                heure = i + 'H00';
                tr += '<tr><td>'+ i+'H00</td><td>'+meteo.fcst_day_0.hourly_data[heure].TMP2m+'</td><td><img src="'+meteo.fcst_day_0.hourly_data[heure].ICON+'"></td></tr>';
            }
            document.getElementById("result").innerHTML = tr;
            // Arrêt du chargeur
            document.getElementById("chargeur").style.display = "none";
       }
   }
}

