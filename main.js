const gameBoard = (function (){
   const boardArray = ["", "", "", "", "", "", "", "", ""];

   const setSymbol = (index, symbol) => {
        if(boardArray[index] === ""){
            boardArray[index] = symbol;
        } else{
            console.log('a')
        }
   }

   const reset = () =>{
    boardArray = ["", "", "", "", "", "", "", "", ""];
   }

   return { boardArray, setSymbol, reset};
  
})();

const player = function(symbol) {
return{symbol};
}

const playerX = player('X');
const playerO = player('O');

const winGame = (function(){
    const winCombinations = [
        [0,3,6],
        [0,1,2],
        [0,4,8],
        [3,4,5],
        [6,7,8],
        [2,5,8],
        [2,4,6],
        [1,4,7],
    ]

    const searchComb = (array) =>{
        let x = 0;
        let o = 0;
        for(let i = 0; i < winCombinations.length; i++){
            x = 0;
            o = 0;
            for(let j = 0; j < 3; j++){
                if(array[winCombinations[i][j]] == 'x'){
                    x++;
                } else if(array[winCombinations[i][j]] == 'o'){
                    o++;
                    console.log(`broj o:${o}`);
                }

                if(x === 3){
                    console.log('x pobeda');
                } else if(o === 3){
                    console.log('o pobeda');
                }
                
            }
        }

        }

return {searchComb};

    })();


    const domfunct = (function(){
        const grids = document.querySelectorAll('.grid-part');

        const clickFunction = () =>{
            grids.forEach(grid =>{
                grid.addEventListener('click', (e) =>{
                    if(gameBoard.boardArray[e.target.dataset.index] == ''){
                        gameBoard.setSymbol(e.target.dataset.index, 'x');
                        e.target.textContent = 'x';
                        randomSymbol(gameBoard.boardArray);
                        winGame.searchComb(gameBoard.boardArray);
                    }

                })
            })
        }


        const randomSymbol = (array) =>{
            let indexArr = [];
            for(let i = 0; i < 9; i++){
                console.log(array[i])
                if(array[i] === ''){
                    indexArr.push(i);
                    console.log(indexArr)
                }
            }
            const number = Math.floor(Math.random() * indexArr.length);
            console.log(indexArr[number]);
            grids.forEach(grid =>{
                if(grid.dataset.index == indexArr[number]){
                    grid.textContent = 'o';
                    gameBoard.setSymbol(indexArr[number], 'o');
                    console.log(gameBoard)
                }
            })
        }

        return{clickFunction, randomSymbol}
    })();






    domfunct.clickFunction()





















   

    






