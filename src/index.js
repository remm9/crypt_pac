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
const MUMMY = 8;

let gameData = [
    [ 
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 6, 4, 4, 4, 8, 1, 4, 4, 4, 4, 4, 1],
        [1, 4, 1, 1, 1, 4, 1, 4, 1, 1, 1, 4, 1],
        [1, 4, 1, 4, 4, 4, 4, 4, 4, 4, 1, 4, 1],
        [1, 4, 4, 4, 1, 1, 5, 1, 1, 4, 4, 4, 1],
        [1, 4, 1, 4, 4, 4, 4, 4, 4, 4, 1, 4, 1],
        [1, 4, 1, 1, 4, 4, 1, 4, 4, 1, 1, 4, 1],
        [1, 4, 4, 4, 4, 4, 1, 4, 4, 4, 4, 4, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 7, 1] 
    ],

    [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 4, 1, 4, 1, 8, 1, 4, 4, 4, 4, 4, 1],
        [1, 4, 1, 4, 1, 4, 1, 4, 1, 1, 1, 4, 1],
        [1, 4, 1, 4, 1, 4, 1, 4, 4, 4, 1, 4, 1],
        [1, 4, 4, 4, 4, 4, 4, 4, 1, 4, 4, 4, 1],
        [1, 4, 1, 4, 1, 4, 4, 4, 1, 4, 4, 4, 1],
        [1, 4, 1, 4, 1, 4, 1, 4, 4, 4, 1, 4, 1],
        [1, 4, 1, 4, 1, 4, 1, 4, 1, 1, 1, 4, 1],
        [1, 4, 4, 8, 4, 4, 1, 4, 4, 4, 4, 5, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],

];

let grid = gameData[0]
let level = 1;
let score = 0;
let playing = true;
let map;
let playing = true;

let pacman = {
    x: 6,
    y: 4,
    direction: 'right'
};

let ghost = {
    x: 5,
    y: 1,
};

let door = {
    x: 11,
    y: 8,
}

let key = {
    x: 1,
    y: 1,
}

let musicPlay;

function toggleMute() {
    const audio = document.getElementsByTagName('audio')[0];
    if (musicPlay == true) {
        musicPlay = false;
        audio.pause();
    } else {
        musicPlay = true;
        audio.play();
    }
    return musicPlay;
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
        // console.log(grid)
        let tiles = createTiles(grid);
        tiles.forEach(tile => {
            map.appendChild(tile);
        });
        document.getElementById('body').appendChild(map)
        // document.body.appendChild(map);
    }
}

function eraseMap() {
    document.getElementById('body').removeChild(map)
    // document.body.removeChild(map);
}

function gameOver() {
    if (score === 1010) { 
        document.getElementById('game-over').textContent = "You win!!!"
    } else if ((grid[pacman.y + 1][pacman.x] === MUMMY) 
                || (grid[pacman.y - 1][pacman.x] === MUMMY)
                || (grid[pacman.y][pacman.x + 1] === MUMMY)
                || (grid[pacman.y][pacman.x - 1] === MUMMY)) { 
        document.getElementById('game-over').textContent = "Game over"
        eraseMap();
        playing = false;
    }
}

function levelChange() {
    if (grid[pacman.y][pacman.x] === grid[door.y][door.x]) {
        level = 2;
        pacman.direction = "left";
        grid = gameData[1];
        // alert("You are in Level 1")
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

function moveGhost() {
    if ((grid[ghost.y + 1][ghost.x] !== STONE) && (grid[ghost.y + 1][ghost.x] !== DOOR)) {
        // if (pacman to left) turn left
        // if (pacman to right) turn right
    } else {
        // go straight
        // if (ghost touched pacman) {
        //     pacman_dead = true
        // }
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
        } else if (e.keyCode === 82) {
            window.location.reload();
        } else if (e.keyCode === 77) {
            toggleMute();
        }
        screenLevel();
        screenScore();
        doorUnlock();
        levelChange();
        eraseMap();
        drawMap();
        gameOver();
    });
}

function main() {
    drawMap();
    setupKeyboardControls();
}

main();

