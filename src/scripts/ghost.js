import { grid, pacman, ghost, STONE, MUMMY, KEY} from '../index.js'

function moveGhostDown() {
    if ((grid[ghost.y + 1][ghost.x] !== STONE)) {
        let last = grid[ghost.y + 1][ghost.x];
        grid[ghost.y][ghost.x] = last;
        ghost.y = ghost.y + 1;
        grid[ghost.y][ghost.x] = MUMMY;
    }
}

function moveGhostRight() {
    if ((grid[ghost.y][ghost.x + 1] !== STONE) && (grid[ghost.y][ghost.x + 1] !== KEY)) {
        let last = grid[ghost.y][ghost.x + 1];
        grid[ghost.y][ghost.x] = last;
        ghost.x = ghost.x + 1;
        grid[ghost.y][ghost.x] = MUMMY;
    }
}
function moveGhostLeft() {
    if ((grid[ghost.y][ghost.x - 1] !== STONE) && (grid[ghost.y][ghost.x + 1] !== KEY)) {
        let last = grid[ghost.y][ghost.x - 1];
        grid[ghost.y][ghost.x] = last;
        ghost.x = ghost.x - 1;
        grid[ghost.y][ghost.x] = MUMMY;
    }
}

function moveGhostUp() {
    if (grid[ghost.y - 1][ghost.x] !== STONE) {
        let last = grid[ghost.y - 1][ghost.x];
        grid[ghost.y][ghost.x] = last;
        ghost.y = ghost.y - 1;
        grid[ghost.y][ghost.x] = MUMMY;
    }
}

export function moveGhost() {

    if ((pacman.x > ghost.x) && (pacman.y > ghost.y)) {
        moveGhostDown();
        moveGhostRight();
    } else if ((pacman.x < ghost.x) && (pacman.y < ghost.y)) {
        moveGhostUp();
        moveGhostLeft();
    } else if ((pacman.x >= ghost.x) && (pacman.y <= ghost.y)) {
        moveGhostRight();
        moveGhostUp();
    } else if ((pacman.x <= ghost.x) && (pacman.y <= ghost.y)) {
        moveGhostLeft();
        moveGhostDown();
    }
}