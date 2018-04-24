const generatePlayerBoard = (numOfRows, numOfCols) => {
  const board = [];
  for(rowI = 0; rowI < numOfRows; rowI++){
    const row = [];
    for(colI = 0; colI < numOfCols; colI++){
      row.push(' ');
    }
    board.push(row);
  }
  return board;
};

const generateBombBoard = (numOfRows, numOfCols, numOfBombs) => {
  const bombBoard = [];
  for(rowI = 0; rowI < numOfRows; rowI++){
    const row = [];
    for(colI = 0; colI < numOfCols; colI++){
      row.push(null);
    }
    bombBoard.push(row);
  }

  let numberOfBombsPlaced = 0;
  while (numberOfBombsPlaced < numOfBombs) {
    let randomRowIndex = Math.floor(Math.random() * numOfRows);
    let randomColIndex = Math.floor(Math.random() * numOfCols);
    //does not currently check to see if bomb is already placed in index
    if(bombBoard[randomRowIndex][randomColIndex] !== 'B'){
      bombBoard[randomRowIndex][randomColIndex] = 'B';
      numberOfBombsPlaced++;
    }
  }

  return bombBoard;
};

const printBoard = board => {
  return board.map(row => {
    return row.join(' | ');
  }).join('\n');
}

const getNumberOfNeighborBombs = (bombBoard, rowIndex, colIndex) => {
  neighborOffsets = [[-1,-1],[-1,0],[-1,1],[0,1],[1,1],[1,0],[1,-1],[0,-1]];
  numberOfRows = bombBoard.length;
  numberOfCols = bombBoard[0].length;
  numberOfBombs = 0;
  neighborOffsets.forEach( offset => {
    const neighborRowIndex = rowIndex + offset[0];
    const neighborColIndex = colIndex + offset[1];
    if((neighborRowIndex >= 0 && neighborRowIndex < numberOfRows) && (neighborColIndex >= 0 && neighborColIndex < numberOfCols)){
      if(bombBoard[neighborRowIndex][neighborColIndex] === 'B'){
        numberOfBombs++;
      }
    }
  });
  return numberOfBombs;
};

const flipTile = (playerBoard, bombBoard, rowIndex, colIndex) => {
  if(playerBoard[rowIndex][colIndex] !== ' '){
    console.log('This tile has already been flipped!');
    return;
  }
  else if(bombBoard[rowIndex][colIndex] === 'B'){
    playerBoard[rowIndex][colIndex] = 'B';
  }
  else{
    playerBoard[rowIndex][colIndex] = getNumberOfNeighborBombs(bombBoard, rowIndex, colIndex);
  }
};

//calling game functions

let playerBoard = generatePlayerBoard(3,4);
let bombBoard = generateBombBoard(3,4,5);

console.log('Player Board: ');
console.log(printBoard(playerBoard));
console.log('Bomb Board: ');
console.log(printBoard(bombBoard));

flipTile(playerBoard, bombBoard, 1, 1);
console.log('Updated Player Board: ');
console.log(printBoard(playerBoard));
