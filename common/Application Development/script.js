let x = 500;
let y = 100;
let score;
let sound = new Audio("hammer-hitting-a-head-100624.mp3");
let soundWon = new Audio("music.mp3");
let angle = 0.1;
let turn = 1;
let play;
let turn1score = 0;
let turn2score = 0;
Play();
function Play() {
    play = setInterval(() => {
        x = 300 + (200 * Math.cos(angle * (Math.PI / 180)));
        y = 100 + (200 * Math.sin(angle * (Math.PI / 180)));
        if (angle <= 10 || angle >= 175)
            angle += 0.04;
        else if (angle <= 110 && angle >= 70)
            angle += 0.15;
        else
            angle += 0.1;
        document.getElementById("line").setAttribute("x1", "300");
        document.getElementById("line").setAttribute("y1", "100");
        document.getElementById("line").setAttribute("x2", `${x}`);
        document.getElementById("line").setAttribute("y2", `${y}`);

        if (y < 100) {
            angle = 0.1;
            x = 500;
            y = 100;
        }

    }, 0.1);

}


document.querySelector(".stop").addEventListener("click", () => {
    setTimeout(() => {
        clearInterval(play);
        sound.play();
        score = parseInt(100 * Math.sin(angle * (Math.PI / 180)));
        if (turn === 1) turn1score = score;
        if (turn === -1) turn2score = score;
        if (turn1score > turn2score && turn2score != 0) {
            soundWon.play();
            document.querySelector(".turn").innerHTML = `Player 1 WON`;
            document.querySelector(".won img").style.width=`400px`;
        }

        if (turn1score < turn2score && turn2score != 0) {
            document.querySelector(".turn").innerHTML = `Player 2 WON`;
            document.querySelector(".won img").style.width=`400px`;
            soundWon.play();
        }
        else {
            document.querySelector("#score").innerHTML = `${score}`;
            document.querySelector("#score").setAttribute("x", 272);
        }
        if (turn == 1) turn = 2;

        if (turn == 2) {
            document.querySelector(".turn").innerHTML = `Player 2 turn`;
            setTimeout(() => {
                angle = 0.1;
                Play();
                document.querySelector(".btn").style.transform = "translate(65vw,0)";
                document.querySelector(".btn").style.transition = "transform 0.7s ease";
                turn = -1;
                score = 0;

                document.querySelector("#score").innerHTML = `${score}`;
                document.querySelector("#score").setAttribute("x", 287);
                document.querySelector(".hammer img").style.transform = "rotate(160deg)";
                document.querySelector(".hammer img").style.transition = "transform 0.7s ease";

            }, 1000)

        }
    }, 700);

    document.querySelector(".hammer img").style.transform = "rotate(0deg)";
    document.querySelector(".hammer img").style.transition = "transform 0.7s ease";

})
document.querySelector(".re").addEventListener("click", () => {

    location.reload(true);//just reload the page basically resets
})
