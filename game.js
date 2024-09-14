let input = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#resetbtn");
let newgamebtn = document.querySelector("#newgame");
let jsbuttons = document.querySelectorAll(".buttons");
let winnermsg = document.querySelector("#winner-message");
let drawmessage = document.querySelector("#draw-message");
let count = 0;

let turn = true;
let winpatterns = [
    [0, 1, 2],
    [0, 3 ,6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

input.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText === "") {
            count++;
            if (turn) {
                box.innerText = "X"; // it's X's turn
                turn = false;
            } else {
                box.innerText = "O"; // it's Y's turn
                turn = true;
            }
            if (ifwinner()) {
                return;
            }
            if (count >= 9) {
                drawmsg();
            }
        }
    });
});

// if winner function
let ifwinner = () => {
    for (let pattern of winpatterns) {
        const val1position = input[pattern[0]].innerText;
        const val2position = input[pattern[1]].innerText;
        const val3position = input[pattern[2]].innerText;

        if (val1position !== "" && val2position !== "" && val3position !== "") {
            if (val1position === val2position && val2position === val3position) {
                console.log("Winner is " + val1position);
                winnermsg.style.display = "block";
                winnermsg.innerText = "Winner is " + val1position;

                // buttons position
                jsbuttons.forEach(button => {
                    button.classList.add("button-js");
                });
                input.forEach((inputs) => {
                    inputs.disabled = true;
                });
                return true; // Indicates a winner has been found
            }
        }
    }
    return false; // No winner found
};

// reset and new game button functions
resetbtn.addEventListener("click", () => {
    resetgame();
});
newgamebtn.addEventListener("click", () => {
    resetgame();
});

let resetgame = () => {
    count = 0;
    winnermsg.style.display = "none";
    input.forEach(box => {
        box.innerText = "";
        jsbuttons.forEach(button => {
            button.classList.remove("button-js");
        });
        input.forEach((inputs) => {
            inputs.disabled = false;
        });
        turn = true;
        drawmessage.style.display = "none";
    });
};

// draw function
let drawmsg = () => {
    drawmessage.style.display = "block";
    jsbuttons.forEach(button => {
        button.classList.add("button-js");
    });
};