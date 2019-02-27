
var contentArray = [["","",""],["","",""],["","",""]];
var dangerBox = [];
var winningBox = [];


// Binding object HTML
var player1box = document.getElementById("player_one_box");
var player2box = document.getElementById("player_two_box");
var scorePlayer1 = document.getElementById("score1");
var scorePlayer2 = document.getElementById("score2");


var isPlayerOne = false;
var totalTurn = 0;
var active = true;



newGame();

//#region function
function boxHover(element){
    var elementID = element.id;
    var arrayID = elementID.split("");
    if(contentArray[arrayID[0]][arrayID[1]]==="" && active){
        var strUrl = (isPlayerOne) ? "url('./images/circle.png')" : "url('./images/x.png')" ;
        element.style.backgroundImage = strUrl;
        element.style.opacity = 0.5;

    }
}
function boxUnhover(element){
    var elementID = element.id;
    var arrayID = elementID.split("");
    if(contentArray[arrayID[0]][arrayID[1]]==="" && active){
        var strUrl = "";
        element.style.backgroundImage = strUrl;
        element.style.opacity = 1;
    }
}
function boxClick(element){
    var elementID = element.id;
    var arrayID = elementID.split("");
    isiKotak(arrayID[0],arrayID[1],element);
    
}

function isiKotak(i,j,element){
    if(contentArray[i][j]==="" && active){
        var isiString = (isPlayerOne) ? "O" : "X" ;
        var strUrl = (isPlayerOne) ? "url('./images/circle.png')" : "url('./images/x.png')" ;
        var id = i.toString()+j.toString();
        var sudahMenang = false;

        //cari id element yang sesuai untuk diganti nilainya
        element.style.backgroundImage = strUrl;
        element.style.opacity = 1;
        //isi array dengan string X atau 0
        contentArray[i][j] = isiString;
        totalTurn++;
        if(totalTurn>2){
            sudahMenang =  checkKemenangan(i,j,isiString);
           
        }
                
        if(!sudahMenang)
        {
            if(totalTurn <9){
                changePlayer(isPlayerOne);
            }else{
                endGame(false);
            }
        }else{
            endGame(true);
        }      
    }
}

function checkKemenangan(indexI,indexJ, XatauO){

    var diagkanan = false;
    var diagkiri = false;
    var hori = checkHorizontal(indexI,XatauO);
    var verti = checkVertical(indexJ, XatauO);
    
    
    if(indexI == 1 && indexJ == 1){           
        diagkanan = checkDiagonalKanan(XatauO);        
        diagkiri = checkDiagonalKiri(XatauO);      
    }
    else if(indexI === indexJ){  
        diagkanan = checkDiagonalKanan(XatauO);
    }else if((Number(indexI) + Number(indexJ)) === 2)
    {
        diagkiri = checkDiagonalKiri(XatauO);
    }

    return diagkanan || diagkiri || hori || verti;
}
function checkHorizontal(row,str){
    var arr = [];
    var possible = "";
    var returnBool = true;
    for(var i = 0; i<3; i++){
        if(contentArray[row][i] !== str){
            possible = "" + row + i;
            returnBool = false;
        }else{
            arr.push(""+row+i);
        }
    }
    if(arr.length === 2){
        isPlayerOne ? dangerBox.push(possible) : winningBox.push(possible)
    }
    if(returnBool){
        changeWinImage(arr,str);
    }
    
    return returnBool; 
}

function checkVertical(col,str){
    var arr = [];
    var possible = "";
    var returnBool = true;
    for(var i = 0; i<3; i++){
        if(contentArray[i][col] !== str){
            possible = "" + i + col;
            returnBool = false;
        }
        else{
            arr.push(""+i+col);
        }
    }
    if(arr.length === 2){
        isPlayerOne ? dangerBox.push(possible) : winningBox.push(possible)
    }
    if(returnBool){
        changeWinImage(arr,str);
    }
    return returnBool;   
}

function checkDiagonalKanan(str){
    var arr = [];
    var possible = "";
    var returnBool = true;
    for(var i = 0; i<3; i++){
        if(contentArray[i][i] !== str){
            possible = "" + i + i;
            returnBool = false;
        }else{          
            arr.push(""+i+i);           
        }
    }
    if(arr.length === 2){
        isPlayerOne ? dangerBox.push(possible) : winningBox.push(possible)
    }
    if(returnBool){
        changeWinImage(arr,str);
    }
    return returnBool; 
}

function checkDiagonalKiri(str){
    var arr = [];
    var possible = "";
    var returnBool = true;
    for(var i = 0; i<3; i++){
        if(contentArray[i][2-i] !== str){
            possible = "" + i + (2-i);
            returnBool = false;
        }else{          
            arr.push(""+i+(2-i)); 
        }                  
    }
    if(arr.length === 2){
        isPlayerOne ? dangerBox.push(possible) : winningBox.push(possible)
    }
    if(returnBool){
        changeWinImage(arr,str);
    }
    return returnBool;
}
function changeWinImage(array,str,i){
   
    for(var i = 0; i<array.length;i++){
        if(str === "O"){            
            var element = document.getElementById(array[i]);      
            element.style.backgroundImage = "url('./images/circle_shadow.png')";
        }else if(str === "X"){
            var element = document.getElementById(array[i]);      
            element.style.backgroundImage = "url('./images/x_shadow.png')" ;
      
        }
    }
}

function changePlayer(varBoolean){
    isPlayerOne = !varBoolean;
    //alert(isPlayerOne);
    // lakukan perubahan html yang terkait dengan change player
    if(isPlayerOne){
        player1box.style.opacity = 1;
        player2box.style.opacity = 0.3;
    }else{
        player2box.style.opacity = 1;
        player1box.style.opacity = 0.3;
        keputusanComp();
    }
}

function endGame(adaPemenang){

    var message = "Tidak ada pemenang, Rematch?";
    if(adaPemenang){
        var namaPemenang = isPlayerOne ? "Player 1 " : "Computer ";
        message = namaPemenang + "memenangkan pertandingan!, rematch?";
        if(isPlayerOne){         
            scorePlayer1.innerHTML = Number(scorePlayer1.innerHTML) + 10;
        }else{       
             scorePlayer2.innerHTML = Number(scorePlayer2.innerHTML) + 10;
        }

    }
        var pilihanUser=confirm(message);
        if(pilihanUser){
            newGame();
        }else{
            active = false;
            player1box.style.opacity = 1;
            player2box.style.opacity = 1;
        }

}


function newGame(){
    
    totalTurn = 0;
    dangerBox = [];
    winningBox = [];
    contentArray = [["","",""],["","",""],["","",""]];
    for(var i = 0; i<3; i++){
        for(var j= 0; j<3; j++){
            var strID = i+""+j+"";
            var element = document.getElementById(strID);
           
            element.style.backgroundImage = "";
        }
    }
   
    changePlayer(isPlayerOne);
    
}

function keputusanComp(){

    
    var id = "";
    if(winningBox.length != 0){      
        for(var i = 0; i<winningBox.length; i++){
            var index = winningBox[i].split("");
            if(contentArray[index[0]][index[1]]===""){
                id = winningBox[i];
                break;
            }
            
        }
    }
    if(id === "" && dangerBox.length != 0){
        for(var i = 0; i<dangerBox.length; i++){
            var index = dangerBox[i].split("");
            if(contentArray[index[0]][index[1]]===""){
                id = dangerBox[i];
                break;
            }
        }
    }
    if(id === ""){
        var arrayRandom = getRandomIJ();
        id = ""+ arrayRandom[0] + arrayRandom[1];
    }

    var element = document.getElementById(id);
    var arId = id.split("");
    isiKotak(arId[0],arId[1],element);

}

function getRandomIJ(){
    var i =  Math.floor(Math.random()*Math.floor(3));
    var j =  Math.floor(Math.random()*Math.floor(3));

    if(contentArray[i][j] === ""){
        return [i,j];
    }
    return getRandomIJ();
    
}

//#endregion
