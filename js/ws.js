var unplacedwords = [];
var placedwords = [];

function placeWordInGrid(word, grid, gridSize) {
    let directions = [[0, 1], [1, 0], [1, 1]]; // Right, Down, Diagonal
    let attempts = 0;
    let placed = false;

    while (!placed && attempts < 100) {
        let direction = directions[Math.floor(Math.random() * directions.length)];
        let row = Math.floor(Math.random() * gridSize);
        let col = Math.floor(Math.random() * gridSize);

        if (canPlaceWordAt(word, row, col, direction, grid, gridSize)) {
            for (let i = 0; i < word.length; i++) {
                grid[row + i * direction[0]][col + i * direction[1]] = word[i];
            }
            placedwords.push(word);
            placed = true;
        }
        attempts++;
    }

    if (!placed) {
        // console.error(`Could not place word: ${word}`);
        unplacedwords.push(word);
    }
}

function canPlaceWordAt(word, row, col, direction, grid, gridSize) {
    for (let i = 0; i < word.length; i++) {
        let newRow = row + i * direction[0];
        let newCol = col + i * direction[1];
        if (newRow >= gridSize || newCol >= gridSize || (grid[newRow][newCol] !== '-' && grid[newRow][newCol] !== word[i])) {
            return false;
        }
    }
    return true;
}

function calculateGridSize(words) {
    let maxSize = words.reduce((max, word) => Math.max(max, word.length), 0);
    let gridSize = Math.max(maxSize, Math.ceil(Math.sqrt(words.join('').length)));
    return gridSize;
}

function generateWordSearch(words, gridSize) {
    // gridSize ?? calculateGridSize(words);
    let grid = Array.from({ length: gridSize }, () => Array(gridSize).fill('-'));
    unplacedwords = [];
    placedwords = []; 

    words.forEach(word => placeWordInGrid(word, grid, gridSize));

    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            if (grid[row][col] === '-') {
                grid[row][col] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
            }
        }
    }

    return {
        grid: grid,
        unplaced: unplacedwords,
        words: placedwords
    }
}

// Example usage
// let words = ["wizard", "magic", "puzzle", "code", "computer", "javascript", "gaming", "nerd", "geek", "fun", "awesome", "cool", "game", "play", "programming", "developer", "software", "engineer", "hacker", "nerd", "geek", "fun", "awesome", "cool", "game", "play", "programming", "developer", "software", "engineer", "hacker"];
// let wordSearchGrid = generateWordSearch(words,10);
// console.log(wordSearchGrid);
