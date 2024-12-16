let boxes=document.querySelectorAll(".box");
let resetBtn=document.querySelector("#resetBtn");
let newGameBtn=document.querySelector("#newBtn");
let msgContainer=document.querySelector(".msgContainer");
let msg=document.querySelector("#msg");
let countbox=0;

let turn=true;
const winPatterns=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

const resetGame=()=>{
    turn=true;
    countbox=0;
    msgContainer.classList.add("hide");
    boxes.forEach((box)=>{
        box.disabled=false;
        box.innerText="";
    })
}

resetBtn.addEventListener("click",resetGame);
newGameBtn.addEventListener("click",resetGame);


boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        box.innerText= turn ? "O":"X";
        countbox++;
        box.disabled=true;
        turn=(turn^(true));
        let winner=checkWinner();
        if(winner!=="N"){
            showWinner(winner);
        }
        if(countbox===9 && winner==="N"){
            showDraw();
        }
    });
});

const showWinner=(winner)=>{
    msg.innerText=`${winner} is the winner of this match!`;
    boxes.forEach((box)=>{
        box.disabled=true;
    });
    msgContainer.classList.remove("hide");
}

const showDraw=()=>{
    msg.innerText=`This match is a draw!`;
    boxes.forEach((box)=>{
        box.disabled=true;
    });
    msgContainer.classList.remove("hide");

}

const checkWinner=()=>{
    for(let i=0;i<winPatterns.length;i++){
        let winPattern=winPatterns[i];
        let countO=0,countX=0;
        for(let j=0;j<winPattern.length;j++){
            if(boxes[winPattern[j]].innerText==="O")countO++;
            else if(boxes[winPattern[j]].innerText==='X')countX++;
        }
        if(countO===winPattern.length)return "O";
        else if(countX===winPattern.length)return "X";
    }
    return "N";
}