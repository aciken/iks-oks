const gameBoard = (function (){
   let boardArray = ["", "", "", "", "", "", "", "", ""];

   const setSymbol = (index, symbol) => {
    console.log(boardArray);
        if(boardArray[index] === ""){
            boardArray[index] = symbol;
        } else{
        }
   }

   const restart = () =>{
    domfunct.resetGrids(); 
    for(let i = 0; i < boardArray.length; i++){
        boardArray[i] = "";
    }
    console.log(boardArray);
   }



   return { boardArray, setSymbol, restart};
  
})();

const player = function(symbol) {
return{symbol};
}

const playerX = player('x');
const playerO = player('o');

console.log(playerO.symbol)

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
                    gameBoard.restart();

                } else if(o === 3){
                    gameBoard.restart();
 
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
                        console.log(e.target.dataset.index)
                        gameBoard.setSymbol(e.target.dataset.index, 'x');
                        console.log(gameBoard.boardArray)
                        e.target.textContent = 'x';
                        console.log(gameBoard.boardArray);
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
                }
            }
            const number = Math.floor(Math.random() * indexArr.length);
            grids.forEach(grid =>{
                if(grid.dataset.index == indexArr[number]){
                    grid.textContent = 'o';
                    gameBoard.setSymbol(indexArr[number], 'o');
                }
            })

            for(let i = 0; i < gameBoard.boardArray.length; i++){
                if(!gameBoard.boardArray.includes('x') || !gameBoard.boardArray.includes('o')){
                    indexArr = [];
                }
            }

        }

        const resetGrids = () =>{
            grids.forEach(grid =>{
                grid.textContent = '';
            })

            console.log('reset')
        }

        return{clickFunction, randomSymbol, resetGrids}
    })();



    const ChoseWay = (function(){
        const pvp = document.querySelector('.pvp');
        const pva = document.querySelector('.pva');
        const blackBack = document.querySelector('.black-back')

        const chose = () =>{
            pva.addEventListener('click', () =>{
                domfunct.clickFunction()
                console.log('asd')
                blackBack.classList.add('chose');
            })  

            pvp.addEventListener('click', () =>{
                blackBack.classList.add('chose');
            })
        }
        return{chose}
   
    })();

    


ChoseWay.chose();





















   

    






