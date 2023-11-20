const gameTiles = document.querySelectorAll('.tile')
const gameBoard = document.querySelector('#puzzle-board')

const gameState = createGameState()

function createGameState(){
    const gameState2 = [[],[],[]]
    const tilesNumber = [0,1,2,3,4,5,6,7,8]
    const newAray = []
    let randomTilesNumber

    for(i = 0; i < 3; i++){
        for(j = 0; j < 3; j++){
            randomTilesNumber = Math.floor(Math.random() * tilesNumber.length)
            if(newAray.includes(randomTilesNumber)){
                while(newAray.includes(randomTilesNumber) === true){
                    randomTilesNumber = Math.floor(Math.random() * tilesNumber.length)
                }
            }
            gameState2[i].push(gameTiles[randomTilesNumber])  
            newAray.push(randomTilesNumber)
        }
    }
    return gameState2
}

const gameRender = (gameBoard, gameState) => {
    gameState.forEach((row, rowIndex) => {
        row.forEach((column, columnIndex) => {
            column.style.top = `${rowIndex * 100}px`
            column.style.left = `${columnIndex * 100}px`

            gameBoard.appendChild(column)
        })
    })
}

const moveElement = (element1, element2) => {
    let tempTop, tempLeft
    tempTop = element1.style.top;
    tempLeft = element1.style.left;

    element1.style.top = element2.style.top
    element1.style.left = element2.style.left
    element2.style.top = tempTop
    element2.style.left = tempLeft
}

gameRender(gameBoard, gameState)
gameBoard.addEventListener('click', (e) => {
    const target = e.target

    let x,y

    gameState.forEach((row, rowIndex) => {
        row.forEach((column, columnIndex) => {
            if(column === target){
                x = rowIndex
                y = columnIndex
            }
        })
    })

    let emptyX, emptyY

    gameState.forEach((row, rowIndex) => {
        row.forEach((column, columnIndex) => {
            if(column.innerText === ''){
                emptyX = rowIndex
                emptyY = columnIndex
            }
        })
    })

    if(
        ((y === emptyY) && (x + 1 === emptyX || x - 1 === emptyX)) || 
        (x === emptyX) && (y + 1 === emptyY || y - 1 === emptyY)) {

            moveElement(gameState[x][y], gameState[emptyX][emptyY])

        const temp = gameState[x][y]
        gameState[x][y] = gameState[emptyX][emptyY]
        gameState[emptyX][emptyY] = temp
    }

})