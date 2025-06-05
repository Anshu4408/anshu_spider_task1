let canvas = document.getElementById("myCanvas");
let bcanvas = document.getElementById("myBCanvas");
let y = 100;
let ctx = canvas.getContext("2d");
let bctx = bcanvas.getContext("2d");
let cord = new Set();
let Cord = new Map();
let color = "yellow";
let movement = false;
let totwin = [];
let Box = new Map();
let Filled = new Map();//to check whether a box is filled or not
let Blocked = new Set();
let b = new Map();//for removing event listeners
let fns = new Map();
let flag = false;
let leaderboard = [];
let rmoves = 0;
let ymoves = 0;
let min1=2;
let min2=2;
let sec1=0;
let sec2=0;
let player1timer;
let player2timer;
let blockSound=new Audio("video-games-select-337214.mp3");;
let music=new Audio("game-music-player-console-8bit-background-intro-theme-297305.mp3");
//grid design
for(let i=1;i<=7;i++)
{
bctx.strokeStyle="white";
bctx.strokeRect(199+(i-1)*115,186,115,606)
}
for(let i=1;i<=6;i++)
{
bctx.strokeStyle="white";
bctx.strokeRect(199,186+(i-1)*(101),805,101)
}

//for sound
let flagg=false;
document.querySelector(".audio").addEventListener(`click`,()=>{
    console.log("clicked")
    if(flagg===true)
        {
            
            flagg=false;
    document.querySelector(".audio").innerHTML=`<img src="volume-mute.png">`
    music.pause();
        }
        else{
            document.querySelector(".audio").innerHTML=`<img src="speaker-filled-audio-tool.png">` 
            flagg=true; 
            music.play();
            

        }
})


//for timer
timer1();//for red player
function timer1 (){
 player1timer=setInterval(()=>
{
    if(sec1<=0 )
    {
        min1--;
        sec1=60;
    }
    sec1--;
    document.getElementById("t1").innerHTML=`RED PLAYER TIMER <br>${min1}:${sec1}`;
    if(min1<=0&&sec1<=0)
    {
        clearInterval(player1timer);
    }

},1000)
}
function timer2 (){
 player2timer=setInterval(()=>
{
    if(sec2<=0 )
    {
        min2--;
        sec2=60;
    }
    sec2--;
    document.getElementById("t2").innerHTML=`YELLOW PLAYER TIMER <br>${min2}:${sec2}`;
    if(min2<=0&&sec2<=0)
    {
        clearInterval(player2timer);
    }

},1000)
}


async function Mygame() {
    while (true) {
        console.log("1")
        await block();
        await turn();
        console.log("2")
    }
}
if (localStorage.getItem("1") === undefined || localStorage.getItem("1") === null)
    leaderboard.push(localStorage.setItem("1", 42));
if (localStorage.getItem("2") === undefined || localStorage.getItem("2") === null)
    leaderboard.push(localStorage.setItem("2", 42));
if (localStorage.getItem("3") === undefined || localStorage.getItem("3") === null)
    leaderboard.push(localStorage.setItem("3", 42));
if (localStorage.getItem("4") === undefined || localStorage.getItem("4") === null)
    leaderboard.push(localStorage.setItem("4", 42));
if (localStorage.getItem("5") === undefined || localStorage.getItem("5") === null)
    leaderboard.push(localStorage.setItem("5", 42));

    leaderboard.push(parseInt(localStorage.getItem("1")));
    leaderboard.push(parseInt(localStorage.getItem("2")));
    leaderboard.push(parseInt(localStorage.getItem("3")));
    leaderboard.push(parseInt(localStorage.getItem("4")));
    leaderboard.push(parseInt(localStorage.getItem("5")));

Mygame();

async function turn() {
    return new Promise((resolve) => {

        document.querySelectorAll(".box").forEach((box) => {
            const fn = async (e) => {

                let a = parseInt(box.id);
                if (!Blocked.has(a)) {
                    if (movement === false) {
                        if (color === "yellow") {
                            color = "red";
                            timer2();
                            clearInterval(player1timer);
                            document.querySelector(".turn").innerHTML = `YELLOW PLAYER TURN`;
                            rmoves++;
                        }
                        else {
                             timer1();
                            clearInterval(player2timer);
                            color = "yellow";
                            document.querySelector(".turn").innerHTML = `RED PLAYER TURN`;
                            ymoves++;
                        }

                        let k = a % 7;
                        if (a % 7 == 0)
                            k = 7;
                        a = 250 + 115 * (k - 1);

                        if (Cord.get(a) === undefined || Cord.get(a) <= 5) {

                            ctx.beginPath();

                            ctx.fillStyle = color;
                            ctx.strokeStyle = color;
                            ctx.arc(a, 100, 40, 0, 2 * Math.PI);
                            ctx.fill();
                            ctx.stroke();

                            move(a, color);

                            ctx.beginPath();
                            ctx.fillStyle = color;
                            ctx.strokeStyle = color;
                            ctx.arc(a, y, 40, 0, 2 * Math.PI);
                            ctx.fill();
                            ctx.stroke();

                            if (Cord.get(a) === undefined) {

                                Cord.set(a, 0);
                            }
                        }
                        document.querySelectorAll(".box").forEach(bx => {
                            bx.removeEventListener("click", fns.get(bx));
                        });
                        resolve();
                    }

                }
            }
            box.addEventListener("click", fn);
            fns.set(box, fn);
        })

    })


}

async function move(a, color) {


    y = 100;
    const circle = setInterval(() => {
        if (y >= (740 - (Cord.get(a) * 100))) {
            let z = parseInt(((a - 250) / 115) + ((y - 240) / 100) * 7) + 1;
            Box.set(z, color);
            Filled.set(z, "F");
            clearInterval(circle);
            cord.add({ a, y, color });
            movement = true;
            Cord.set(a, Cord.get(a) + 1);

        }

        y += 5;
        movement = false;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        draw();
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.strokeStyle = color;
        ctx.arc(a, y, 40, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    }, 10)


}
function draw() {
    if (cord.size !== 0) {
        for (let point of cord) {


            ctx.beginPath();
            ctx.fillStyle = point.color;
            ctx.strokeStyle = point.color;
            ctx.arc(point.a, point.y, 40, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();
        }
    }
}

//wininig condn

totwin = [];
//diagonals
let rows = 6; let col = 7; let k = 4;
for (let i = 0; i <= rows - k; i++) {
    for (let j = 0; j <= col - k; j++) {
        let win = [];
        for (let l = 0; l < k; l++) {
            win.push((l + i) * col + j + l + 1);
        }
        totwin.push(win);
    }
}
for (let i = 0; i <= rows - k; i++) {
    for (let j = 0; j <= col - k; j++) {
        let win = [];
        for (let l = 0; l < k; l++) {
            win.push((i + l + 1) * col - j - l + i);
        }
        totwin.push(win);
    }
}
//for horizontal
for (let i = 0; i < rows; i++) {
    for (let j = 1; j <= k; j++) {
        let win = [];
        for (let l = 0; l < k; l++) {
            win.push((i * col + l + j));
        }
        totwin.push(win);
    }
}

//for vertical
for (let i = 0; i < col; i++) {
    for (let j = 1; j < k; j++) {
        let win = [];
        for (let l = 0; l < k; l++) {
            win.push(((l + j - 1) * col + 1 + i));
        }
        totwin.push(win);
    }
}
function iswin() {


    totwin.forEach((e) => {
        const a = Box.get(e[0]);
        const b = Box.get(e[1]);
        const c = Box.get(e[2]);
        const d = Box.get(e[3]);

        if (a && a === b && b === c && c === d) {
            document.querySelector(".turn").innerHTML = ` ${a.toUpperCase()} "Player" "won!"`;
            pause();

            if (a === "red") {
                
                   
                    leaderboard.push(rmoves);
                    leaderboard.sort((a, b) => a - b);
                     leaderboard.pop();
                
            }
            if (a === "yellow") {
            
                    leaderboard.push(ymoves);
                    leaderboard.sort((a, b) => a - b);
                     leaderboard.pop();
                
            }
            localStorage.setItem("1", leaderboard[0]);
            localStorage.setItem("2", leaderboard[1]);
            localStorage.setItem("3", leaderboard[2]);
            localStorage.setItem("4", leaderboard[3]);
            localStorage.setItem("5", leaderboard[4]);
            let A=leaderboard[0];
            let B=leaderboard[1];
            let C=leaderboard[2];
            let D=leaderboard[3];
            let E=leaderboard[4];
            if(A===42)
            {
                A="...";
            }
            if(B===42)
            {
                B="...";
            }if(C===42)
            {
                C="...";
            }if(D===42)
            {
                D="...";
            }if(E===42)
            {
                E="...";
            }
            document.querySelector(".leaderboard").innerHTML = `<table border="1">
  <thead>
    <tr>
      <th>RANK</th>
      <th>MOVES TAKEN</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>${A}</td>
    </tr>
    <tr>
      <td>2</td>
      <td>${B}</td>
    </tr>
     <tr>
      <td>3</td>
      <td>${C}</td>
    </tr>
     <tr>
      <td>4</td>
      <td>${D}</td>
    </tr>
     <tr>
      <td>5</td>
      <td>${E}</td>
    </tr>
  </tbody>
</table>`
            document.querySelector(".leaderboard").style.zIndex = 100000000000;
             clearInterval(WIN);
        }
    });
   if((min2===0)&&sec2===0||(min1===0&&sec1===0))
   { let a;
    if(min2===0&&sec2===0)
        a="red";
     if(min1===0&&sec1===0)
        a="yellow";
     document.querySelector(".turn").innerHTML = ` ${a.toUpperCase()} "Player" "won!"`;
            pause();

            if (a === "red") {
                
                   
                    leaderboard.push(rmoves);
                    leaderboard.sort((a, b) => a - b);
                     leaderboard.pop();
                
            }
            if (a === "yellow") {
            
                    leaderboard.push(ymoves);
                    leaderboard.sort((a, b) => a - b);
                     leaderboard.pop();
                
            }
            localStorage.setItem("1", leaderboard[0]);
            localStorage.setItem("2", leaderboard[1]);
            localStorage.setItem("3", leaderboard[2]);
            localStorage.setItem("4", leaderboard[3]);
            localStorage.setItem("5", leaderboard[4]);
            let A=leaderboard[0];
            let B=leaderboard[1];
            let C=leaderboard[2];
            let D=leaderboard[3];
            let E=leaderboard[4];
            if(A===42)
            {
                A="...";
            }
            if(B===42)
            {
                B="...";
            }if(C===42)
            {
                C="...";
            }if(D===42)
            {
                D="...";
            }if(E===42)
            {
                E="...";
            }
            document.querySelector(".leaderboard").innerHTML = `<table border="1">
  <thead>
    <tr>
      <th>RANK</th>
      <th>MOVES TAKEN</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>${A}</td>
    </tr>
    <tr>
      <td>2</td>
      <td>${B}</td>
    </tr>
     <tr>
      <td>3</td>
      <td>${C}</td>
    </tr>
     <tr>
      <td>4</td>
      <td>${D}</td>
    </tr>
     <tr>
      <td>5</td>
      <td>${E}</td>
    </tr>
  </tbody>
</table>`
            document.querySelector(".leaderboard").style.zIndex = 100000000000;
             clearInterval(WIN);
        
   }

}
const WIN=setInterval(() => {
    iswin();
}, 100)
function pause() {
    movement = true;
}
async function block() {

    document.querySelector(".info").innerHTML = `${color.toUpperCase()} PLAYER WILL SELECT COLUMN TO BLOCK`;
    return new Promise((resolve) => {

        document.querySelectorAll(".box").forEach((box) => {

            const bl = () => {
                if(flagg===true)
                    blockSound.play();
                let a = parseInt(box.id);
                let k = a % 7;
                if (a % 7 == 0)
                    k = 7;
                a = 250 + 115 * (k - 1);
                Blocked.clear();
                for (let i = 0; i <= 5; i++) {
                    let z = parseInt(((a - 250) / 115) + i * 7) + 1;
                    Blocked.add(z);
                }
                if (check(Blocked)) {
                    flag = true;
                    Blocked.clear();
                    document.querySelector(".info").innerHTML = `NO COLUMN TO BE BLOCKED`;
                }

                else
                    grey(a);


                document.querySelectorAll(".box").forEach(bx => {
                    bx.removeEventListener("click", b.get(bx));
                });
                if (flag === false)
                    document.querySelector(".info").innerHTML = `COLUMN BLOCKED`;
                resolve();
            }

            box.addEventListener("click", bl);
            box.style.backgroundColor = "unset";
            b.set(box, bl);

        })


    })

}

function check(Blocked) {
    for (let i = 1; i <= 42; i++) {
        if (!Blocked.has(i))
            if (Filled.get(i) !== "F")
                return false;
    }
    return true;
}
function grey(a) {
    for (let i = 0; i <= 5; i++) {
        let z = parseInt(((a - 250) / 115) + i * 7) + 1;
        document.getElementById(`${z}`).style.backgroundColor = "grey";
    }


}

//for darkTheme
let f = false;
document.querySelector(".theme").addEventListener("click", () => {
    for (let i = 0; i < 42; i++)
        document.querySelectorAll(".box")[i].classList.toggle(`dark`);
    document.querySelectorAll("*").forEach(el => {
        el.classList.toggle(`darkbg`);
    })
    if (f === false) {
        document.querySelector(".theme").innerHTML = `LIGHT THEME`;
        f = true;
         document.querySelector("img").style.filter = "invert(1)";
    }
    else {
        document.querySelector(".theme").innerHTML = `DARK THEME`;
         document.querySelector("img").style.filter = "invert(0)";
        f = false;
    }

    document.querySelector(".theme").classList.toggle("darktheme");
    document.querySelector(".nav").classList.toggle("darknav");

   
})
