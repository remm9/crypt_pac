import './styles/index.scss'
import './styles/reset.scss'
import { toggleMute } from './scripts/music.js'
import { moveGhost } from './scripts/ghost.js'
 

export const STONE = 1;
export const SAND = 2;
export const GROUND = 3;
export const COIN = 4;
export const PACMAN = 5;
export const KEY = 6;
export const DOOR = 7;
export const MUMMY = 8;

let gameData = [
    [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 4, 4, 4, 4, 8, 1, 4, 4, 4, 4, 4, 1],
        [1, 4, 6, 1, 1, 4, 1, 4, 1, 1, 1, 4, 1],
        [1, 4, 1, 4, 4, 4, 4, 4, 4, 4, 1, 4, 1],
        [1, 4, 4, 4, 1, 1, 5, 1, 1, 4, 4, 4, 1],
        [1, 4, 1, 4, 4, 4, 4, 4, 4, 4, 1, 4, 1],
        [1, 4, 1, 1, 4, 4, 1, 4, 4, 1, 1, 4, 1],
        [1, 4, 4, 4, 4, 4, 1, 4, 4, 4, 4, 4, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 7, 1]
    ],

    [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 4, 1, 4, 1, 4, 1, 4, 4, 4, 4, 4, 1],
        [1, 4, 1, 4, 1, 4, 1, 4, 1, 1, 1, 4, 1],
        [1, 4, 1, 4, 1, 4, 1, 4, 4, 4, 1, 4, 1],
        [1, 4, 4, 4, 4, 4, 4, 4, 1, 4, 4, 4, 1],
        [1, 4, 1, 4, 1, 4, 4, 4, 1, 4, 4, 4, 1],
        [1, 4, 1, 4, 1, 4, 1, 4, 4, 4, 1, 4, 1],
        [1, 4, 1, 4, 1, 4, 1, 4, 1, 1, 1, 4, 1],
        [1, 4, 4, 4, 4, 4, 1, 4, 4, 4, 4, 5, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],

];

export let grid = gameData[0]
export let score = 0;
let level = 1;
let playing = true;
let map;

export let pacman = {
    x: 6,
    y: 4,
    direction: 'right'
};

export let ghost = {
    x: 5,
    y: 1
};

let door = {
    x: 11,
    y: 8,
}

let key = {
    x: 2,
    y: 2,
}

function createTiles(data) {
    let tilesArray = [];
    data.forEach(row => {
        row.forEach(el => {
            let tile = document.createElement('div');
            tile.classList.add('tile');

            if (el === STONE) {
                tile.classList.add('stone');
            } else if (el === SAND) {
                tile.classList.add('sand');
            } else if (el === GROUND) {
                tile.classList.add('ground')
            } else if (el === COIN) {
                tile.classList.add('coin');
            } else if (el === PACMAN) {
                tile.classList.add('pacman');
                tile.classList.add(pacman.direction);
            } else if (el === KEY) {
                tile.classList.add('key');
            } else if (el === DOOR) {
                tile.classList.add('door')
            } else if (el === MUMMY) {
                tile.classList.add('mummy');
            }
            tilesArray.push(tile);
        })
        let breakTile = document.createElement('br');
        tilesArray.push(breakTile);
    })
    return tilesArray;
}

function drawMap() {
    if (playing) {
        map = document.createElement('div');
        let tiles = createTiles(grid);
        tiles.forEach(tile => {
            map.appendChild(tile);
        });
        document.getElementById('body').appendChild(map)
        // document.body.appendChild(map);
    }
}

function eraseMap() {
    if (playing === false) {
        document.getElementById('body')
    } else {
        document.getElementById('body').removeChild(map)
    }
    // document.body.removeChild(map);
}

function gameOver() {
    if (score === 1050) {
        document.getElementById('game-over').textContent = "You win!!!";
        // eraseMap();
        playing = false;
    } else if ((grid[pacman.y + 1][pacman.x] === 8)
        || (grid[pacman.y - 1][pacman.x] === 8)
        || (grid[pacman.y][pacman.x + 1] === 8)
        || (grid[pacman.y][pacman.x - 1] === 8)) {
        document.getElementById('game-over').textContent = "Game over";
        eraseMap();
        playing = false;
        drawMap();
    } else if (grid[pacman.y][pacman.x] === grid[ghost.y][ghost.x]) {
        document.getElementById('game-over').textContent = "Game over";
        eraseMap();
        playing = false;
        drawMap();
    }
}

function levelChange() {
    if (grid[pacman.y][pacman.x] === grid[door.y][door.x]) {
        level = 2;
        pacman.direction = "left";
        grid = gameData[1];
    }
}

function screenLevel() {
    document.getElementById('level').textContent = "Level: " + level;
}

function screenScore() {
    document.getElementById('score').textContent = "Score: " + score;
}

function doorUnlock() {
    if (grid[key.y][key.x] !== KEY && level === 1) {
        grid[door.y][door.x] = GROUND;
    }
}

function moveDown() {
    pacman.direction = 'down';

    if ((grid[pacman.y + 1][pacman.x] !== STONE) && (grid[pacman.y + 1][pacman.x] !== DOOR)) {
        if (grid[pacman.y + 1][pacman.x] === COIN) {
            score = score += 10;
        }
        grid[pacman.y][pacman.x] = GROUND;
        pacman.y = pacman.y + 1;
        grid[pacman.y][pacman.x] = PACMAN;
    }
}

function moveUp() {
    pacman.direction = 'up';
    if (grid[pacman.y - 1][pacman.x] !== STONE) {
        if (grid[pacman.y - 1][pacman.x] === COIN) {
            score = score += 10;
        }
        grid[pacman.y][pacman.x] = GROUND;
        pacman.y = pacman.y - 1;
        grid[pacman.y][pacman.x] = PACMAN;
    }
}

function moveLeft() {
    pacman.direction = 'left';
    if (grid[pacman.y][pacman.x - 1] !== STONE) {
        if (grid[pacman.y][pacman.x - 1] === COIN) {
            score = score += 10;
        }
        grid[pacman.y][pacman.x] = GROUND;
        pacman.x = pacman.x - 1;
        grid[pacman.y][pacman.x] = PACMAN;
    }
}

function moveRight() {
    pacman.direction = 'right';
    if (grid[pacman.y][pacman.x + 1] !== STONE) {
        if (grid[pacman.y][pacman.x + 1] === COIN) {
            score = score += 10;
        }
        grid[pacman.y][pacman.x] = GROUND;
        pacman.x = pacman.x + 1;
        grid[pacman.y][pacman.x] = PACMAN;
    }
}

function setUpMusucToggle() {
    document.addEventListener('keyup', function(e) {
        if (e.keyCode === 77) {
            toggleMute();
        }
    }); 
}

function setupKeyboardControls() {
    document.addEventListener('keydown', function (e) {
        if (e.keyCode === 37) {
            moveLeft();
        } else if (e.keyCode === 38) {
            moveUp();
        } else if (e.keyCode === 39) {
            moveRight();
        } else if (e.keyCode === 40) {
            moveDown();
        } else if (e.keyCode === 82) {
            window.location.reload();
        } 
        screenLevel();
        screenScore();
        doorUnlock();
        levelChange();
        moveGhost();
        eraseMap();
        drawMap();
        gameOver();
    });
}

// let start = grid[ghost.y][ghost.x]
// let end = grid[pacman.y][pacman.x]
// let result = astar.search(grid, start, end)
// console.log(result)
// return result

function main() {
    setUpMusucToggle();
    setupKeyboardControls();
    drawMap();
}

main();