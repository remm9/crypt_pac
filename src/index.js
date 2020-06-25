import './styles/index.scss'
import './styles/reset.scss'

window.addEventListener("DOMContentLoaded", main);

const STONE = 1;
const SAND = 4;
const GROUND = 3;
const COIN= 2;
const PACMAN = 5;
const KEY = 6;
const DOOR = 7;

let gameData = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1],
    [1, 2, 2, 2, 1, 1, 5, 1, 1, 2, 2, 2, 1],
    [1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1],
    [1, 2, 1, 1, 2, 2, 1, 2, 2, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 7, 1]
];

let map;

let pacman = {
    x: 6,
    y: 4,
    direction: 'right'
};

function createTiles(data) {
    let tilesArray = [];
    data.forEach(row => {
        row.forEach(col => {
            let tile = document.createElement('div');
            tile.classList.add('tile');

            if (col === STONE) {
                tile.classList.add('stone');
            } else if (col === COIN) {
                tile.classList.add('coin');
            } else if (col === GROUND) {
                tile.classList.add('ground')
            } else if (col === SAND) {
                tile.classList.add('sand');
            } else if (col === PACMAN) {
                tile.classList.add('pacman');
                tile.classList.add(pacman.direction);
            } else if (col === KEY) {
                tile.classList.add('key');
            } else if (col === DOOR) {
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
    // debugger
    map = document.createElement('div');
    let tiles = createTiles(gameData);
    tiles.forEach(tile => { 
        map.appendChild(tile);
    });
    document.body.appendChild(map);
}

function eraseMap() {
    document.body.removeChild(map);
}

function moveDown() {
    pacman.direction = 'down';
    if (gameData[pacman.y + 1][pacman.x] !== STONE) {
        gameData[pacman.y][pacman.x] = GROUND;
        pacman.y = pacman.y + 1;
        gameData[pacman.y][pacman.x] = PACMAN;
    }
}

function moveUp() {
    pacman.direction = 'up';
    if (gameData[pacman.y - 1][pacman.x] !== STONE) {
        gameData[pacman.y][pacman.x] = GROUND;
        pacman.y = pacman.y - 1;
        gameData[pacman.y][pacman.x] = PACMAN;
    }
}

function moveLeft() {
    pacman.direction = 'left';
    if (gameData[pacman.y][pacman.x - 1] !== STONE) {
        gameData[pacman.y][pacman.x] = GROUND;
        pacman.x = pacman.x - 1;
        gameData[pacman.y][pacman.x] = PACMAN;
    }
}

function moveRight() {
    pacman.direction = 'right';
    if (gameData[pacman.y][pacman.x + 1] !== STONE) {
        gameData[pacman.y][pacman.x] = GROUND;
        pacman.x = pacman.x + 1;
        gameData[pacman.y][pacman.x] = PACMAN;
    }
}

function setupKeyboardControls() {
    document.addEventListener('keydown', function (e) {
        console.log(e.keyCode);
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
    });
}

function main() {
    setupKeyboardControls();
    drawMap();
}

main();

