const selectBox = document.querySelector(".select-box"),
    selectXBtn = selectBox.querySelector(".playerx"),
    selectOBtn = selectBox.querySelector(".playero"),
    playBoard = document.querySelector(".play-board"),
    allBox = document.querySelectorAll("section span"),
    players = document.querySelector(".players"),
    resultBox = document.querySelector(".result-box"),
    wonText = resultBox.querySelector(".won-text"),
    replyBtn = resultBox.querySelector("button");



window.onload = () => {  //once window loaded

    for (let i = 0; i < allBox.length; i++) { //add onclick attribute in all available section's span
        allBox[i].setAttribute("onclick", "clickedBox(this)");
    }

    document.innerHTML

    selectXBtn.onclick = () => {
        selectBox.classList.add("hide"); //hide the select box on the player X button clicked
        playBoard.classList.add("show");  //show the play board section on the player X is button clicked
        // players.setAttribute("class", "players active player"); // adding three class name in player element
    }
    selectOBtn.onclick = () => {
        selectBox.classList.add("hide"); //hide the select box on the player X button clicked
        playBoard.classList.add("show");  //show the play board section on the player X is button clicked
        players.setAttribute("class", "players active player"); // adding three class name in player element
    }
}

let playerXIcon = "X"; //class name of fontawesome cross icon
let playerOIcon = "O"; //class name of fontawesome circle icon
let playerSign = "X"; // suppose player will be x
let runBot = true;


// user click function

function clickedBox(element) {
    if (players.classList.contains("player")) {
        element.innerHTML = `<sapn>${playerOIcon}</span>`;
        players.classList.add("active");
        //if player select o then we'll change the playerSign value to o
        playerSign = "O";
        element.setAttribute("id", playerSign);
    } else {
        element.innerHTML = `<sapn>${playerXIcon}</span>`;
        element.setAttribute("id", playerSign);
        players.classList.add("active");
    }
    selectWinner(); //calling the winner function
    playBoard.style.pointerEvents = "none";  //once user select then user can't select any other box until box select
    element.style.pointerEvents = "none"; // once user selected the box then that box cannot be selected again
    let randomDelayTime = ((Math.random() * 1000) + 200).toFixed(); // generating random time dealy so bot will delay randomly to select box 
    setTimeout(() => {
        bot(runBot);
    }, randomDelayTime)
}

// bot click function

function bot(runBot) {
    if (runBot) { // if robot is true then run the following code
        //first change the playerSign.. so if user has X value in the id then bot will have o
        playerSign = "O";
        let array = []; // creating empty array... we'll store unselected box index in this array
        for (let i = 0; i < allBox.length; i++) {
            if (allBox[i].childElementCount == 0) {  // if span has no any element
                array.push(i);  // inserting unclicked or unselected boxes inside array means that span has no children
                // console.log(i + " " + "has no child");
            }
        }
        let randomBox = array[Math.floor(Math.random() * array.length)] //getting random index from array so bot will select random unselected box
        console.log("random :" + randomBox);
        if (array.length > 0) {
            if (players.classList.contains("player")) {
                allBox[randomBox].innerHTML = `<sapn>${playerXIcon}</span>`;
                players.classList.remove("active");
                // if user is o then the box id value will be X
                playerSign = "X";
                allBox[randomBox].setAttribute("id", playerSign);
            } else {
                allBox[randomBox].innerHTML = `<sapn>${playerOIcon}</span>`;
                players.classList.remove("active");
                allBox[randomBox].setAttribute("id", playerSign);
            }
            selectWinner(); //calling the winner function
        }
        allBox[randomBox].style.pointerEvents = "none";  // once bot select any box then user cant select or click  on the box
        playBoard.style.pointerEvents = "auto";
        playerSign = "X";// passing x value
    }
}

//lets work on winner

function getClass(idname) {
    return document.querySelector(".box" + idname).id;  // returning id name
}

function checkClasses(val1, val2, val3, sign) {
    if (getClass(val1) == sign && getClass(val2) == sign && getClass(val3) == sign) {
        return true;
    }
}

function selectWinner() {
    if (checkClasses(1, 2, 3, playerSign) || checkClasses(4, 5, 6, playerSign) || checkClasses(7, 8, 9, playerSign) || checkClasses(1, 4, 7, playerSign) || checkClasses(2, 5, 8, playerSign) || checkClasses(3, 6, 9, playerSign) || checkClasses(1, 5, 9, playerSign) || checkClasses(3, 5, 7, playerSign)) {
        console.log(playerSign + " " + "is the winner")
        // once the match won by someone then stop the bot
        runBot = false;
        bot(runBot);
        setTimeout(() => {  // we'll delay to show the result box
            playBoard.classList.remove("show");
            resultBox.classList.add("show");
        }, 700) //700 ms dealy

        wonText.innerHTML = `Player <p>${playerSign}</p> won the game !`;
    } else {
        // if match has drawn
        // first we'll check all if  if all paragraph has id and no one won the game then we'll draw the game
        if (getClass(1) != "" && getClass(2) != "" && getClass(3) != "" && getClass(4) != "" && getClass(5) != "" && getClass(6) != "" && getClass(7) != "" && getClass(8) != "" && getClass(9) != "") {
            runBot = false;
            bot(runBot);
            setTimeout(() => {  // we'll delay to show the result box
                playBoard.classList.remove("show");
                resultBox.classList.add("show");
            }, 700) //700 ms dealy

            wonText.textContent = `Match has been drawn!`;
        }
    }
}

replyBtn.onclick= ()=>{
    window.location.reload(); // reload the current page
}

