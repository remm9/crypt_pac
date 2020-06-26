import './styles/index.scss'
import './styles/reset.scss'

// window.addEventListener("DOMContentLoaded", main);

const STONE = 1;
const SAND = 2;
const GROUND = 3;
const COIN = 4;
const PACMAN = 5;
const KEY = 6;
const DOOR = 7;

let gameData = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 6, 4, 4, 4, 4, 1, 4, 4, 4, 4, 4, 1],
    [1, 4, 1, 1, 1, 4, 1, 4, 1, 1, 1, 4, 1],
    [1, 4, 1, 4, 4, 4, 4, 4, 4, 4, 1, 4, 1],
    [1, 4, 4, 4, 1, 1, 5, 1, 1, 4, 4, 4, 1],
    [1, 4, 1, 4, 4, 4, 4, 4, 4, 4, 1, 4, 1],
    [1, 4, 1, 1, 4, 4, 1, 4, 4, 1, 1, 4, 1],
    [1, 4, 4, 4, 4, 4, 1, 4, 4, 4, 4, 4, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 7, 1]
];

let map;

let pacman = {
    x: 6,
    y: 4,
    direction: 'right'
};

let door = {
    x: 11,
    y: 8,
}

let key = {
    x: 1,
    y: 1,
}

let score = 0;

let level = 0;

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
            }
            tilesArray.push(tile);
        }) 
        let breakTile = document.createElement('br');
        tilesArray.push(breakTile);
    })
    return tilesArray;
}

function drawMap() {
    map = document.createElement('div');
    let tiles = createTiles(gameData);
    tiles.forEach(tile => { 
        map.appendChild(tile);
    });
    document.getElementById('body').appendChild(map)
    // document.body.appendChild(map);
}

function eraseMap() {
    document.getElementById('body').removeChild(map)
    // document.body.removeChild(map);
}

function screenScore() {
    document.getElementById('score').textContent = "Score: " + score;
}

function doorUnlock() {
    if (gameData[key.y][key.x] !== KEY) {
        gameData[door.y][door.x] = GROUND;
    }
}

function moveDown() {
    pacman.direction = 'down';
   
    if ((gameData[pacman.y + 1][pacman.x] !== STONE) && (gameData[pacman.y + 1][pacman.x] !== DOOR)) {
        if (gameData[pacman.y + 1][pacman.x] === COIN) {
            score = score += 10;
        } 
        gameData[pacman.y][pacman.x] = GROUND;
        pacman.y = pacman.y + 1;
        gameData[pacman.y][pacman.x] = PACMAN;
    } 
}

function moveUp() {
    pacman.direction = 'up';
    if (gameData[pacman.y - 1][pacman.x] !== STONE) {
        if (gameData[pacman.y - 1][pacman.x] === COIN) {
            score = score += 10;
        }
        gameData[pacman.y][pacman.x] = GROUND;
        pacman.y = pacman.y - 1;
        gameData[pacman.y][pacman.x] = PACMAN;
    }
}

function moveLeft() {
    pacman.direction = 'left';
    if (gameData[pacman.y][pacman.x - 1] !== STONE) {
        if (gameData[pacman.y][pacman.x - 1] === COIN) {
            score = score += 10;
        }
        gameData[pacman.y][pacman.x] = GROUND;
        pacman.x = pacman.x - 1;
        gameData[pacman.y][pacman.x] = PACMAN;
    }
}

function moveRight() {
    pacman.direction = 'right';
    if (gameData[pacman.y][pacman.x + 1] !== STONE) {
        if (gameData[pacman.y][pacman.x + 1] === COIN) {
            score = score += 10;
        }
        gameData[pacman.y][pacman.x] = GROUND;
        pacman.x = pacman.x + 1;
        gameData[pacman.y][pacman.x] = PACMAN;
    }
}

function setupKeyboardControls() {
    document.addEventListener('keydown', function (e) {
        // console.log(e.keyCode);
        if (e.keyCode === 37) {
            moveLeft();
        } else if (e.keyCode === 38) {
            moveUp();
        } else if (e.keyCode === 39) {
            moveRight();
        } else if (e.keyCode === 40) {
            moveDown();
        }
        eraseMap();
        drawMap();
        screenScore();
        doorUnlock();
    });
}

function main() {
    drawMap();
    setupKeyboardControls();
}

main();

