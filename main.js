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
   }



   return { boardArray, setSymbol, restart};
  
})();

const player = function(symbol) {
return{symbol};
}



const winGame = (function(){
    const winWrapper = document.querySelector('.win-wrapper');
    const winScreen = document.querySelector('.win-screen');
    const winState = document.querySelector('.win-state');
    const playAgainBtn = document.querySelector('.play-again');


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

    const winMessage = (winner) =>{
        winScreen.classList.add('clicked');
        winWrapper.classList.add('clicked');
        winState.textContent = `${winner} has won`;
        playAgainBtn.addEventListener('click', () =>{
            gameBoard.restart();
            winWrapper.classList.remove('clicked');
            winScreen.classList.remove('clicked');
        })
    }

    const searchComb = (array) =>{
        let x = 0;
        let o = 0;
        for(let i = 0; i < winCombinations.length; i++){
            let gameOver = false;
            x = 0;
            o = 0;
            for(let j = 0; j < 3; j++){
                if(array[winCombinations[i][j]] == 'x'){
                    x++;
                } else if(array[winCombinations[i][j]] == 'o'){
                    o++;
                }


                console.log(`${x} || ${o}`)
                if(x === 3){
                    console.log('win x')
                    winMessage('x');
                    gameOver = true;
                    break
                } else if(o === 3){
                    console.log('win o')
                    winMessage('o');
                    gameOver = true;
                    break
                } else if(!gameBoard.boardArray.includes("") && x !== 3 && o !== 3){
                    console.log('draw')
                    winScreen.classList.add('clicked');
                    winWrapper.classList.add('clicked');
                    winState.textContent = `Draw`;
                    playAgainBtn.addEventListener('click', () =>{
                        gameBoard.restart();
                        winWrapper.classList.remove('clicked');
                        winScreen.classList.remove('clicked');
                    })
                }
                
            }
            if(gameOver === true){
                break;
            }
        }

        }

return {searchComb};

    })();






    const domfunct = (function(){
        const grids = document.querySelectorAll('.grid-part');

        const clickFunction = (symbol ,symbol2) =>{
            grids.forEach(grid =>{
                grid.addEventListener('click', (e) =>{
                    if(gameBoard.boardArray[e.target.dataset.index] == ''){
                        gameBoard.setSymbol(e.target.dataset.index, symbol);
                        console.log(gameBoard.boardArray)
                        e.target.textContent = symbol;
                        randomSymbol(gameBoard.boardArray ,symbol2);
                        winGame.searchComb(gameBoard.boardArray);
                    }

                })
            })
        }


        const randomSymbol = (array, symbol) =>{
            let indexArr = [];
            for(let i = 0; i < 9; i++){
                if(array[i] === ''){
                    indexArr.push(i);
                }
            }
            const number = Math.floor(Math.random() * indexArr.length);
            grids.forEach(grid =>{
                if(grid.dataset.index == indexArr[number]){
                    grid.textContent = symbol;
                    gameBoard.setSymbol(indexArr[number], symbol);
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


    const pvpFunct = (function(){
        const grids = document.querySelectorAll('.grid-part');

        const clickFunction = () =>{
            let symbolState = 'x';
            grids.forEach(grid =>{
                grid.addEventListener('click', (e) =>{
                    if(gameBoard.boardArray[e.target.dataset.index] == ''){
                        if(symbolState === 'x'){
                            gameBoard.setSymbol(e.target.dataset.index, 'x');
                            e.target.textContent = 'x';
                            winGame.searchComb(gameBoard.boardArray);
                            symbolState = 'o';
                        } else{
                            gameBoard.setSymbol(e.target.dataset.index, 'o');
                            e.target.textContent = 'o';
                            winGame.searchComb(gameBoard.boardArray);
                            symbolState = 'x';
                        }

                    }

                })
            })
        }

            const resetGrids = () =>{
                grids.forEach(grid =>{
                    grid.textContent = '';
                })
            }

            return{clickFunction, resetGrids}
        
    })();

    


    const ChoseWay = (function(){
        const pvp = document.querySelector('.pvp');
        const pva = document.querySelector('.pva');
        const blackBack = document.querySelector('.black-back');
        const secondBlack = document.querySelector('.second-black');
        const choseX = document.querySelector('.chose-x');
        const choseO = document.querySelector('.chose-o');
        const popUp = document.querySelector('.pop-up');
        const resetButton = document.querySelector('.button');


        const resetFunct = () =>{
            resetButton.addEventListener('click', () =>{
                    gameBoard.restart();
            })
        }

        const choseSymbol = () =>{
            choseX.addEventListener('click', () =>{
            domfunct.clickFunction('x', 'o');
            secondBlack.classList.remove('clicked');
            popUp.classList.remove('clicked');
            })

            choseO.addEventListener('click', () =>{
            domfunct.clickFunction('o', 'x');
            secondBlack.classList.remove('clicked');
            popUp.classList.remove('clicked');
        })
    }


        const chose = () =>{
            pva.addEventListener('click', () =>{
                secondBlack.classList.add('clicked');
                blackBack.classList.add('chose');
                popUp.classList.add('clicked');
                choseSymbol();
                resetFunct();
            })  

            pvp.addEventListener('click', () =>{
                blackBack.classList.add('chose');
                pvpFunct.clickFunction();
                resetFunct();
            })
        }
        return{chose}
   
    })();

    


ChoseWay.chose();





















   

    






