let xPlays = []; //Array that stores all player X moves.
let oPlays = []; //Array that stores all player O moves.
let allPlays = [];  //Array that stores all moves.
let points = {
   x: 0,
   o: 0,
   addX(){this.x++},
   addO(){this.o++}
};

function clientMark(square,field) { //Onclick function which will mark the field chosen by the customer and soon after it will be checked if there was a winner.
      if(square.innerHTML == ''){
         square.innerHTML = '<div class="scoreboardFigX"></div>';
         xPlays.push(field);
         allPlays.push(field);
         }else{
         window.alert('Escolha outro campo...');
         return
         };

         checkAll() 
}

function check(y){
	let possibilities = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]]; //Array containing all wins conditions.
    for(u of possibilities){ //Variable 'U' contains the current condition.
        let currentArr = []; 
        for(i of u){ //Each index of the current condition.
         currentArr.push(y.includes(i)); //If the X move is in win condition, set the value true to the currentArr veriable.
        };
        if(currentArr + '' == [true, true, true] + ''){ 
            return true
        };
    };
   return false
};

function checkAll() { //Function that will check if there is a winner after a move.
   const result = document.getElementById('result');
   const restartButton = document.getElementById('restartButton');

   function markO(){ //Function to mark 'O' after customer move.
      if(allPlays.length < 9){
         let test = true;
         while(test == true){ //Loop to identify a square that has not been marked.
            let random = Math.ceil(Math.random() * 9); //number drawn.
            if(allPlays.includes(random) == false){ //If the matrix does not have the square marked, the chosen field will be chosen to be filled.
                  oPlays.push(random);
                  allPlays.push(random);
                  document.getElementsByClassName('square')[random - 1].innerHTML = '<div class="scoreboardFigO"></div>';
                  test = false;
            }
         }
      }
   }
   if(check(xPlays) == true){ //Function that will check if X made the winning move, if so, it will show the winner screen to the client.
      points.addX(); //Add a dot to the X.
      result.innerHTML = 'PARABÉNS, <br> VOCÊ GANHOU! &#128512';
      result.style.display = 'flex';
      restartButton.style.display = 'block';
      document.getElementById('scoreX').innerHTML = `${points.x}`;
     }else{ //If not, it will be the player's turn to play.
      markO();
     }  
   if(check(oPlays) == true){
      points.addO();
      result.innerHTML = 'QUE PENA! <br>VOCÊ PERDEU. <br> &#x1F625';
      result.style.display = 'flex';
      restartButton.style.display = 'block';
      document.getElementById('scoreO').innerHTML = `${points.o}`;
      return 
   }
   if(check(xPlays) != true && check(oPlays) != true && allPlays.length === 9){ //If Xplays and Oplays do not return a winner; and if the total moves is equal to 9, the tie will be shown on the screen.
      result.innerHTML = 'VELHA!&#x1F475';
      result.style.display = 'flex';
      restartButton.style.display = 'block';
   }
}

function restartGame() { //Function that resets the marked fields and makes the restart button evident.
   xPlays = [];
   oPlays = [];
   allPlays = [];
   let quadrado = document.getElementsByClassName('square');
   for (i of quadrado) {
      i.innerText = '';
   }
   result.style.display = 'none';
   restartButton.style.display = 'none';
}