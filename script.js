let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameButton = document.querySelector("#new-btn")
let msgContainer = document.querySelector(".msg-container")
let msg = document.querySelector("#msg")

let turnO = true;

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

const resetGame = () => {
    turnO = false;
    enableBoxes();
    msgContainer.classList.add("hide")
}

const showDraw = () => {
    msg.innerText = "Game is draw. Start new game!";
    msgContainer.classList.remove("hide");
}

let count = 0;
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO) {// player O
            box.innerText = "O";
            turnO = false;
        } else { // player X
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true; // disable the function of button once it is used
        count++;
        checkWinner();
        if(count == 9){
            showDraw();
        }
    })
})

const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = ""
    }
}

const showWinner = (winner) => {
    msg.innerText = `Congratulations! Winner is ${winner}`
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const checkWinner = () => {
    for(let pattern of winPatterns){
        let val1 = boxes[pattern[0]].innerText;
        let val2 = boxes[pattern[1]].innerText;
        let val3 = boxes[pattern[2]].innerText;

        if(val1 != "" && val2 != "" && val3 != ""){
            if(val1 === val2 && val2 === val3) {
                showWinner(val1);
            }
        }
    }
}

resetBtn.addEventListener("click", resetGame)
newGameButton.addEventListener("click", resetGame)