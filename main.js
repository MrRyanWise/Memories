const divResultat = document.querySelector("#resultat");
const divGame =  document.getElementById("Game");
const nbCoups = document.getElementById("coups");
const timerElement = document.getElementById("timer");
const monAlert = document.getElementById("alert");



//Generer un tableau qui aura nos captureEvents
var tableau = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
];

 
let minutes = 00;
let secondes = 00;
timerElement.innerText = "0"+minutes + ": 0"+secondes;

var tabResultat = genererTableauAleatoire();

var oldSelection = [];
var nbAffiche = 0;
var nbAfficheTotal = 0;
var coups = 0; 
var ready = true;
 
let temps = 0;

function augmenterTemps() {
    minutes = parseInt(temps / 60, 10);
    secondes = parseInt(temps % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes
    secondes = secondes < 10 ? "0" + secondes : secondes
    timerElement.innerText = minutes + ":" + secondes;
    temps++;
}

setInterval(augmenterTemps, 1000);

afficherTableau();

function afficherTableau(){
    var txt="";

    for(var i=0; i<tableau.length; i++){
        txt += "<div>";
        for(var j=0; j<tableau[i].length; j++){
            if(tableau[i][j] == 0){
                 txt += "<button class='btn btn-primary m-2' style='width:100px;height:100px; background-image: url(\"./images/Animals/logo.png\");  background-size: 170px;background-repeat: no-repeat;' onClick='verif(\""+i+"-"+j+"\")'></button>";
            }else{
                txt  += "<img class='btn btn-primary m-2' src=' ./images/Animals/"+tableau[i][j]+".png 'style='width:100px;height:100px' class='m-2' />";
            }
        }
        txt += "</div>";
    }
    
    nbCoups.innerHTML = coups; 
    divResultat.innerHTML = txt;

    if(nbAfficheTotal > 7 ){
        jeuTermine();
    }
 
}

 

function verif(bouton){
    if(ready){ 
        coups ++;
        nbAffiche++;

        var ligne = bouton.substr(0,1);
        var colonne = bouton.substr(2,1);
    
        tableau[ligne][colonne] = tabResultat[ligne][colonne];

        afficherTableau();   

        if(nbAffiche > 1){
            //verification
            ready = false;
            //Après combien de temps il realise ses actions flèchées
            setTimeout(() => {
                if( tableau[ligne][colonne] !== tabResultat[oldSelection[0]][oldSelection[1]] ){
                    tableau[ligne][colonne] = 0;
                    tableau[oldSelection[0]][oldSelection[1]]= 0;
                }else{
                    nbAfficheTotal ++;
                }
                afficherTableau();  
                ready = true;
                nbAffiche = 0;
                oldSelection = [ligne,colonne];

                
            }, 300) 
        }else{
            oldSelection = [ligne,colonne];
        }
    }
}

function genererTableauAleatoire(){
    var tab = [];
    var nbImagePosition=[0,0,0,0,0,0,0,0];

    for(var i = 0; i < 4; i++){
        var ligne = [];
        for(var j = 0; j < 4; j++){
            var fin = false;
            while(!fin){
                var randomImage = Math.floor(Math.random() * 8);
                if(nbImagePosition[randomImage] < 2){
                    ligne.push(randomImage+1);
                    nbImagePosition[randomImage]++;
                    fin = true;
                }
            } 
        }
        tab.push(ligne);
    }
    return tab;
}
 
   
function jeuTermine(){
    if(tableau.indexOf(0) === -1 ){
        
        divGame.style.display ='none';

        monAlert.style.display = 'block';

        monAlert.innerHTML += "<h4 class='alert-heading'>Félicitations Jeu Terminé :) </h4>\n <p> Nombre de coups : "+coups+"\n  Temps : "+minutes + ":" + secondes+"</p>";
     
        setTimeout(() => {        
            window.location.reload();
        }, 5000)    
    }
}
