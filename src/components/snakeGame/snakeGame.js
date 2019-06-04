// constants
var COLS=26, ROWS=26
// IDs
var EMPTY=0, SNAKE=1, FRUIT=2, POISON=3;
// directions
var LEFT=0, UP=1, RIGHT=2, DOWN=3;
// keyboard direction
var KEY_LEFT = 37, KEY_UP = 38, KEY_RIGHT = 39, KEY_DOWN = 40;
var die = false;
// show score
var database = firebase.database();
var ref = database.ref("scores");
ref.on("value", getData, errData);

var grid = {
    width: null,
    height: null,
    _grid: null,

    // c:colume, r:row. d:size of dxd
    init: function(d, c, r) {
        this.width = c;
        this.height = r;
        this._grid = [];
        for (var x=0; x<c; x++) {
            this._grid.push([])
            for (var y=0; y < r; y++) {
                this._grid[x].push(d);
            }
        }
    },

    set: function(val, x, y) {
        this._grid[x][y] = val;
    },

    get: function(x,y) {
        return this._grid[x][y];
    }
}

var snake = {
    direction: null,
    last: null,
    _queue: null,

    init: function(d, x, y) {
        this.direction = d;
        this._queue = [];
        this.insert(x,y);
    },

    insert: function(x,y) {
        this._queue.unshift({x:x, y:y});
        this.last = this._queue[0];
    },

    remove: function() {
        return this._queue.pop();
    }
}

function setFood() {
    var empty = [];
    for (var x=0; x<grid.width; x++) {
        for (var y=0; y<grid.height; y++) {
            if (grid.get(x,y) == EMPTY) {
                empty.push({x:x, y:y});
            }
        }
    }
    var randpos = empty[Math.floor(Math.random()*empty.length)];
    grid.set(FRUIT, randpos.x, randpos.y);
}

function setPoison() {
    var empty = [];
    for (var x=0; x<grid.width; x++) {
        for (var y=0; y<grid.height; y++) {
            if (grid.get(x,y) == EMPTY) {
                empty.push({x:x, y:y});
            }
        }
    }
    var randpos = empty[Math.floor(Math.random()*empty.length)];
    grid.set(POISON, randpos.x, randpos.y);
}

// Game objects
var canvas, ctx, keystate, frames;

function main() {
    // show scoreboard
    document.getElementById("scorename").style.display = "block";
    document.getElementById("scorelist").style.display = "block";
    sortList();
    die = false;
    frames = 0;
    keystate = {};
    // disable start button after click
    document.getElementById("startBtn").disabled = true;

    canvas = document.createElement("canvas");
    canvas.width = COLS*20;
    canvas.height = ROWS*20;
    ctx = canvas.getContext("2d");
    document.body.appendChild(canvas);

    // disable page scrolling with arrow keys
    window.addEventListener("keydown", function(e) {
        if([37, 38, 39, 40].indexOf(e.keyCode) > -1) {
            e.preventDefault();
        }
    }, false);
    
    // keeps track of the keyboard input
    document.addEventListener("keydown", function(evt) {
        keystate[evt.keyCode] = true;
    });
    document.addEventListener("keyup", function(evt) {
         delete keystate[evt.keyCode];
    });
    
    init();
    loop();
}

function getData(data) {
    var scores = data.val();
    var keys = Object.keys(scores);
    // console.log(keys);
    for (var i=0; i<keys.length; i++) {
        var k = keys[i];
        var name = scores[k].name;
        var score = scores[k].score;
        // console.log(name, score);
        
        var ol = document.getElementById("scorename");
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(name));
        ol.appendChild(li);

        var ul = document.getElementById("scorelist");
        var li2 = document.createElement("li");
        li2.appendChild(document.createTextNode(score));
        ul.appendChild(li2);

    }

}

function errData(err) {
    console.log("Error!");
    console.log(err);
}

function submitScore(name) {
    var data = {
        name: name,
        score: score
    }
    // console.log(data);
    var ref = database.ref("scores");
    ref.push(data);
}

function canvasRestart() {
    document.body.removeChild(canvas);
    main();
}

function init() {
    score = 0;
    grid.init(EMPTY, COLS, ROWS);
    var sp = {x:Math.floor(COLS/2), y:ROWS-1}; // start position
    snake.init(UP, sp.x, sp.y);
    grid.set(SNAKE, sp.x, sp.y);
    setFood();
    setPoison();
}

function loop() {
    update();
    draw();

    window.requestAnimationFrame(loop, canvas);
}

function gameOver() {
    clearInterval(this.interval);
    die = true;
    sortList();
}

function update() {
    frames++;
    if (keystate[KEY_LEFT] && snake.direction !== RIGHT) {
        snake.direction = LEFT;
    }
    if (keystate[KEY_UP] && snake.direction !== DOWN) {
        snake.direction = UP;
    }
    if (keystate[KEY_RIGHT] && snake.direction !== LEFT) {
        snake.direction = RIGHT;
    }
    if (keystate[KEY_DOWN] && snake.direction !== UP) {
        snake.direction = DOWN;
    }
    
    // each ten frames update the game state.
    if (frames%10 === 0) {
        // pop the last element from the snake queue i.e. the
        // head
    var nx = snake.last.x;
    var ny = snake.last.y;
        // updates the position depending on the snake direction
    switch (snake.direction) {
        case LEFT:
            nx--;
            break;
        case UP:
            ny--;
            break;
        case RIGHT:
            nx++;
            break;
        case DOWN:
            ny++;
            break;
    }
    // checks all gameover conditions
    if (0 > nx || nx > grid.width-1  ||
        0 > ny || ny > grid.height-1 ||
        grid.get(nx, ny) === SNAKE ||
        grid.get(nx, ny) === POISON) {
            // remove last score list so when the game restart, scores don't stack up
            var ul = document.getElementById("scorename");
            while(ul.firstChild) ul.removeChild(ul.firstChild);

            var ul2 = document.getElementById("scorelist");
            while(ul2.firstChild) ul2.removeChild(ul2.firstChild);

            // put'Game over' message here

            // put the pop up here ask for name, then save the input
            var name = prompt("Please enter your name to save the score:");
            submitScore(name);
            sortList();
            return gameOver();
            
    }
    // check wheter the new position are on the fruit item
    if (grid.get(nx, ny) === FRUIT) {
        // increment the score and sets a new fruit position
        score++;
        setFood();
        setPoison();
    } else {
        // take out the first item from the snake queue i.e
        // the tail and remove id from grid
        var tail = snake.remove();
        grid.set(EMPTY, tail.x, tail.y);
    }
    // add a snake id at the new position and append it to 
    // the snake queue
    grid.set(SNAKE, nx, ny);
    snake.insert(nx, ny);
    }
}

function draw() {
    var tw = canvas.width/grid.width;
    var th = canvas.height/grid.height;

    

    for (var x=0; x<grid.width; x++) {
        for (var y=0; y<grid.height; y++) {
            switch(grid.get(x,y)) {
                case EMPTY:
                    ctx.fillStyle = "#00e600";
                    break;
                case SNAKE:
                    ctx.fillStyle = "blue";
                    break;
                case FRUIT:
                    ctx.fillStyle = "red";
                    // ctx.fillStyle = ctx.createPattern(image, "no-repeat");

                    // var fruit = document.getElementById("apple");
                    // var pat = ctx.createPattern(fruit, "no-repeat");
                    // ctx.fillStyle = pat;
                    // ctx.fill;
                    break;
                case POISON:
                    ctx.fillStyle = "violet";
            }
            ctx.fillRect(x*tw, y*th, tw, th);
        }
    }
    ctx.font = "15px Arial";
    ctx.fillStyle = "#000";
    ctx.fillText("Score: " + score, 10, canvas.height - 10);

    if (die) {
        var gradient=ctx.createLinearGradient(200,200,300,300);
        gradient.addColorStop("0","magenta");
        gradient.addColorStop("0.5","blue");
        gradient.addColorStop("1.0","red");
        ctx.font = "35px Arial";
        ctx.fillStyle = gradient;
        ctx.fillText("Good Job!", 170, 270);
        
        keystate[evt.keyCode] = false; // disable key
    }
}
