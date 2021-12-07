const container = document.querySelector(".container");
const squareArray = [];
let nextMove = "X";
let player = document.querySelector(".player");

function gameOver(winner) {
    document.querySelector(".winner").innerHTML = `Player ${winner} won!`;
    container.style.display = "none";
    document.getElementById("winner").classList.add(`player${winner}`);
    document.querySelector(".gameOver").style.display = "block";
}

function tie() {
    let draw = true;
    squareArray.forEach(({ state }) => {
        if(state === "") draw = false;
    });
    return draw
};

function GameWon() {
    const grid = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for(let i = 0; i < grid.length; i++) {
        const [a, b, c] = grid[i];
        if (
            squareArray[a].state !== "" &&
            squareArray[a].state == squareArray[b].state &&
            squareArray[a].state == squareArray[c].state
        ) {
            return true
        } 
    };
    return false;

};


class ClassSquare {
    constructor(element, index) {
        this.element = element;
        this.index = index;
        this.state = "";
    }
    clicked() {
        this.state = nextMove;
        this.element.querySelector('p').innerHTML = nextMove;
        this.element.classList.remove("notClicked");
        this.element.onclick = function() {
            return false
        }
        if (GameWon()) {
            gameOver(nextMove);
        }

        if (tie()) {
            gameOver("Tie");        
        }
        
        if (nextMove === "X") {
            nextMove = "O";
            player.classList.remove("playerX");
            player.classList.add("playerO");

        } else {
            nextMove = "X"
            player.classList.remove("playerO");
            player.classList.add("playerX")
        };
        player.innerHTML = nextMove;
    };
};

for(let index = 0; index < 9; index++) {
    const div = document.createElement("div");
    container.appendChild(div);
    div.classList.add("square", "notClicked"); 
    div.appendChild(document.createElement("p"));
    const square = new ClassSquare(div, index);
    div.onclick = function() {
        square.clicked();
    };
    squareArray.push(square);
}

console.log(squareArray);