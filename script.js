//i = shura 
//j = amuda 
//UpdatedBoard = updated board 


var Board = function Board() {  /*we set the board for the first building 8*8 and scoring and against computer*/
    var speedDelay = 100;
    var computerDelay = 500;
    var debug = 0; //bool of debugging, 
    var playerId = 1;   // playerId is: 0-computer, 1-black, 2-white 
    var boardGrid; //this 2d array contains the positions of the black and white pieces
    var gameover = false;
    var score = new Array(3); /*we create an empty slot like that score = (3)[empty × 3]*/
    var round = 0;
    var lang = "en";
    var i18n = {
        en: {
            playerNames: ['', 'Black', 'White']
        }
    }
    //i18n[lang].playerNames[playerId]
//========= C# ========================================
//    class Board {
//        public bool noGraphics;
//        public int createTable() {
//            ...
//        }
//    }

//    Board b = new Board();
//    b.noGraphics = false;
//    xx b.boardGrid
//    b.createTable();
//===================================================

    this.noGraphics = false;//true to update noGraphics only
    this.depth = 4;//simulation depth, 0 mean real.
    
    this.createTable = function createTable() {   /*first this function sends to the function this.onCellClick*/
        var i, j;
        for (i = 0; i < 8; i++) {
            document.write('<tr>');
            for (j = 0; j < 8; j++) {
                document.write('<td onclick="board.onCellClick(this,' + i + ',' + j + ')"><div id="cell' + i + '_' + j + '" ></div> </td>');
            }
            document.write('</tr>');
        }
        initGame();
    }
    // i = clicked column in table
    // j = clicked row in table 
    this.onCellClick = function (cell, i, j) { /*get values from the botton pressing on the board and then cellindex is x and i is y that means shura amuda when shura is i and amuda is x*/
        doTestAndPlay(playerId, i, j); /*goes to test and play with the values from the board*/
    }
    //after this.docell the computer run in all of the functions because they need first value
    // i = clicked column in table
    // j = clicked row in table 
    function doTestAndPlay(player, i, j) { /* player = 1(black) player = 2 (white) */  /*j = amuda i= shura*/ /* UpdatedBoard = false*/
        app.game.started = true;
        this.noGraphics = false;
        if (gameover) return;
        var opponentCounter = doPlay(player, i, j, false);
        if (opponentCounter > 0) {
            setOpponentPlayer();
            outprintappend("Round " + (round++) + ". Got " + opponentCounter + " changes ", 2);
            doNextPlayer();
        }
    }
   //this function gets a value of the player who is playing then the value of the opponent 
    //so if the value of the player is 2 then the opponent value is 1
    function setOpponentPlayer() {
        var opponent = 3 - playerId;
        if (isPlayable(opponent)) {
            playerId = opponent;
        } else {
            if (!isPlayable(playerId)) {
                stopGames();
                return 1;
            }
        }

    }
    //when you press start, the computer sends to this function
    //so this function send the computer with the player id and then the checking for the best value begins
    //if it's the computer turns then the player value is 2 but the function refers to the computer by the set string
    //this function makes the turns valid so if the black piece play now this function gives it a value that we gave it
    // if it's the computer turns from the options that were set beforehand
    //for the computer play delay is 0.7(s)
    function doNextPlayer() {
        if (gameover) return;
        outprintappend(i18n[lang].playerNames[playerId] + " please");
        console.log("the playerid is: " + playerId);
        if (app.params['player' + playerId] == 'Computer') {
            var turn = playComputer(playerId);
            //זה בעצם מגדיר בסה"כ אם בהגדרות שמו מחשב, אם אחד מהשחקנים מחשב, אם הוא מתחיל הוא עושה תור, אם לא הוא מחכה לתור ואז משחק
            if (turn.length) {
                doTestAndPlay(playerId, turn[0], turn[1]);
            } else {
                setOpponentPlayer();
                doNextPlayer();
            }
        }
    }

    //in the function doPlaySwitchUI we do the switching on the board by printing it
    //this function get values from the eatOpponent and adds in the places that it told her peices
    //when the time is not defined we switch the pieces beacuse when we have a time there is one of our peices
    //for example if Im playing as the black piece then when I get to a black peice the time is 1 
    //and when im on a empty peice i want to go to the time is undifined after all of the function checking what moves are valid  
    var delay = 0;  /*first we set the delay value to 0 and all of the other function we have the first set in comments*/
    function doPlaySwitchUI(player, i, j, time) { /* doPlaySwitchUI = ƒ doPlaySwitchUI(player,i,j,time)*/
       console.log("for the function doPlaySwitchUI"+" Player is:" + player + ", i is:" + i + " , j is:" + j + " , time is:" + time);
        outprintappend("playUI" + player + i + j, 2); /*outprintappend = undefined*/
        //if (!speedDelay) { /*speedDelay = 100*/
        //    document.getElementById("cell" + i + "_" + j).className = "player" + player; //set class from app.css to div in table cell
        //    return;
        //}
        //this function shows the other player piece that he eats and switches it
        delay = delay ? delay + speedDelay : (speedDelay);  /*delay = 0, speedDelay = 100*/
        //x = (y==2) ? 5 : 9
        setTimeout(function () {
            document.getElementById("cell" + i + "_" + j).className = "player" + player; //set class from app.css to div in table cell
            delay = 0;
            lastPlayDelay = 1; /*lastPlayDelay = undefined*/
        }, time || delay);   /*delay*/
    }



    function outprint(msg) {
        outprintappend(msg, 0); /*outprintappend = undefined*/
    }
    var outprintappend = this.outprintappend = function outprintappend(msg, level) {   /* outprintappend = ƒ outprintappend(msg,level)*/
        level = level || 0;
        if (level && level > debug) return; /*first output: debug = 0*/
        console.log(msg);
        var message = document.getElementById('message');
        if (message) {
            if (level < 1)
                setTimeout(function () {
                    message.innerHTML = msg;
                }, delay);   /*delay = 0*/

        }
    }

    /*don't forget to number the acitons taken in this code!!!!!!!!!!!!!!!!*/
    var initGame = function initGame() {     /* initGame = ƒ ()*/
        boardGrid = new Array(8);  /* first time of the function: boardGrid = undefined*/
        var i, j;
        for (i = 0; i < 8; i++) {
            boardGrid[i] = new Array(8); /*boardGrid = undefined*/
            //eatOpponent = ƒ eatOpponent(player, i, j, time)
            //eatOpponentsInGivenDireciton = ƒ eatOpponentsInGivenDireciton(player, i, j, directionX, directionY, nb)
            //eatOpponent = ƒ eatOpponent(player, i, j, time)
            //eatOpponent = ƒ eatOpponent(player, i, j, time)
            //outprintappend = ƒ outprintappend(msg, level)
            //boardGrid = undefined
            //doPlaySwitchUI = ƒ doPlaySwitchUI(player, i, j, time)

            for (j = 0; j < 8; j++) {
                boardGrid[i][j] = 0;
            }
        }
        //make the board dynamic for late usage
        eatOpponent(1, 3, 3); /*definition for them all: eatOpponent = ƒ eatOpponent(player, i, j, time)*/
        eatOpponent(1, 4, 4);
        eatOpponent(2, 3, 4);
        eatOpponent(2, 4, 3);   
        //srarting position 
    }.bind(this);

    function eatOpponentsInGivenDireciton(player, clickedX, clickedY, directionX, directionY, opponentCounter) {   /*eatOpponentsInGivenDireciton = ƒ eatOpponentsInGivenDireciton(player, i, j, directionX, directionY, nb)*/
        var i = clickedX;
        var j = clickedY;
        var k;
        
        for (k = 0; k < opponentCounter; k++) {
            i += directionX; j += directionY;
            eatOpponent(player, i, j); /*eatOpponent = ƒ eatOpponent(player, i, j, time)*/
        }
    }
    //this function switch the player that been eaten and in general puts the player in there places
    //example: if we eat 3 times then this function goes to every place and switch the player to the player that made the move
    //so for example im the black piece and I eat one in the place i = 2 j = 4
    //so the function call the place I need to switch to black and then call the empty place
    //when she calls the place we switch the time is not difined but when she call the place of the player we need to switch the time is 1 
    function eatOpponent(player, eatenOpponentX, eatenOpponentY, time) {   /* definition of the function: eatOpponent = ƒ eatOpponent(player, i, j, time)*/
        //console.log("this for the function eatOpponent "+" ,Player is:" + player + ", i is:" + i + " , j is:" + j + " , time is:" + time);
        outprintappend("eatOpponent (change piece color) " + eatenOpponentX + "," + eatenOpponentY + " player" + player + " " + time, 3); /*outprintappend = ƒ outprintappend(msg, level)*/
        boardGrid[eatenOpponentX][eatenOpponentY] = player; /*boardGrid = undefined*/
        if (!this.noGraphics) doPlaySwitchUI(player, eatenOpponentX, eatenOpponentY, time); /*doPlaySwitchUI = ƒ doPlaySwitchUI(player, i, j, time)*/
    }
    var lastPlayDelay = 1;






    //TODO reset to 100, 500
    /*
    var speedDelay=0;
    var computerDelay=0;
    */
    /*
    algorithm 
    loop in 8 direction till border, find other color, till ours, if none, return unplayable code ie 0.
    */
    // i = clicked column in table
    // j = clicked row in table 

    function doPlay(player, i, j, UpdatedBoard) {

        // If user clicked on a non-empty cell then
        // there is no move to do
        if (boardGrid[i][j] != 0) return 0;

        var directionX, directionY, opponentCounter = 0;

        //Check all neighbour cells of clicked cell
        for (directionX = -1; directionX <= 1; directionX++)
            for (directionY = -1; directionY <= 1; directionY++)
                //opponentCounter adds to itself the result of 
                //doPlayerDir which counts the opponents in the given direction
                //defined by directionX,directionY
                opponentCounter += doPlayDir(player, i, j, directionX, directionY, UpdatedBoard);
        if (UpdatedBoard) return opponentCounter;
        outprintappend("doPlay (try player" + player + " )" + i + "," + j + " " + UpdatedBoard, 2);

        if (opponentCounter > 0) {
            eatOpponent(player, i, j, lastPlayDelay);
            if (!this.noGraphics) {
                outprintappend("eatOpponent (change piece color) " + i + "," + j + " player" + player + " ", 3);
            }
        }
        return opponentCounter;
    }

    this.doPlay = doPlay;

    //Returns number of oponnents in the direction
    //defined by directionX, directionY
    //This function counts the opponents in the given direction
    //starting from the clicked cell defined by clickedX,clickedY till the
    //current player piece.
    //Example: directionX=1 directionY=1   -  direction is down-right
     function doPlayDir(player, clickedX, clickedY, directionX, directionY, UpdatedBoard) {  /* UpdatedBoard = sumulation of the board for checking every possible move computer*/
        //console.log("clickedX=" + clickedX + " clickedY=" + clickedY + " directionX=" + directionX + " directionY=" + directionY);
        var i = clickedX, j = clickedY;
        //Ignore the clicked cell, as we check only the neighbour cells
        if ((directionX == 0) && (directionY == 0)) return 0;
        var opponentCounter = 0;
        var opponent = 3 - player;  //example: if player==1 then opponent==2
        //if directionX and directionY point to the top neighbour (0,-1)
        //then i=clicked cell x   and   j=clicked cell y -1
        i += directionX; j += directionY;

        //return 2
        //b   
        //b           
        //clicked            b    b  b   return 3  
        //b
        //w
         // in this while we count the opponents in the given direction 
        while (inBoardLimit(i) && inBoardLimit(j) && (boardGrid[i][j] == opponent)) {
            i += directionX; j += directionY; opponentCounter++;
         }
         //this if checks if there is a player piece after the sequence of opponents 
        if (inBoardLimit(i) && inBoardLimit(j) && boardGrid[i][j] == player) {
            //console.log("result(dir=" + directionX + "," + directionY + ")=" + opponentCounter);
            if (UpdatedBoard) return opponentCounter;
            eatOpponentsInGivenDireciton(player, clickedX, clickedY, directionX, directionY, opponentCounter);
            return opponentCounter;
        }
        return 0;
    }

    function isPlayable(player) {
        for (i = 0; i < 8; i++)
            for (j = 0; j < 8; j++) {
                if (doPlay(player, i, j, true) > 0) return true;


            }
        return false;
    }
    function stopGames() {
        score[1] = 0;
        score[2] = 0;
        for (i = 0; i < 8; i++)
            for (j = 0; j < 8; j++) {
                score[boardGrid[i][j]]++;
            }
        app.params.name1 = app.params.name1 || app.params.player1;
        app.params.name2 = app.params.name2 || app.params.player2;
        //scores[app.params.name1]=score[1];
        //scores[app.params.name2]=score[2];
        if (score[1] > score[2]) {
            app.scores[app.params.name1].win++;
            app.scores[app.params.name2].lost++;
        } else {
            app.scores[app.params.name1].lost++;
            app.scores[app.params.name2].win++;
        }
        localStorage['scoresWin' + app.params.name1] = app.scores[app.params.name1].win;
        localStorage['scoresWin' + app.params.name2] = app.scores[app.params.name2].win;
        localStorage['scoresLost' + app.params.name1] = app.scores[app.params.name1].lost;
        localStorage['scoresLost' + app.params.name2] = app.scores[app.params.name2].lost;
        gameover = true;
        outprint("Black:</b> " + score[1] + " - <b>White:</b> " + score[2]);
        var bigmsg = '';
        var human = 0;
        if (score[1] == score[2]) {
            bigmsg = "TIE";
        }
        else if (app.params.player1 == 'Human' && app.params.player2 != 'Human') {
            if (score[1] > score[2]) bigmsg = "You WIN";
            else bigmsg = "You LOSE";
        }
        else if (app.params.player2 == 'Human' && app.params.player1 != 'Human') {
            if (score[2] > score[1]) bigmsg = "You WIN";
            else bigmsg = "You LOSE";
        } else if (score[1] > score[2]) bigmsg = "Black WIN";
        else bigmsg = "White WIN"

        document.getElementById('gameover').innerHTML = bigmsg;
        setTimeout(function () {
            document.getElementById('gameover').style.display = "table-cell";
        }, delay);

    }

    function inBoardLimit(i) { return ((0 <= i) && (i < 8)); }
    //==extension
    var myarray = [
        [8, 0, 8, 4, 4, 8, 0, 8],
        [0, 0, 4, 4, 4, 4, 0, 0],
        [8, 4, 4, 4, 4, 4, 4, 8],
        [4, 4, 4, 4, 4, 4, 4, 4],
        [4, 4, 4, 4, 4, 4, 4, 4],
        [8, 4, 6, 4, 4, 6, 4, 8],
        [0, 0, 4, 4, 4, 4, 0, 0],
        [8, 0, 8, 4, 4, 8, 0, 8]
    ]
    function playComputer(playerId) {
        delay = delay + computerDelay;
        lastPlayDelay = delay;
        outprintappend("play computer " + playerId, 2);
        for (k = 8; k >= -1; k--)
            for (i = 0; i < 8; i++)
                for (j = 0; j < 8; j++) {
                    if (myarray[i][j] >= k) {
                        nb = doPlay(playerId, i, j, true);//UpdatedBoard
                        console.log("nb is: " + nb + " ,playerId is:" + playerId + ", last play delay is:" + lastPlayDelay);
                        console.log("delay is" + delay);
                        //we have here a function that is like the computer.js function,
                        //he searches for the best move in the function so we have values that go into doPlay
                        //when the value is 1 then that is the best place to put your piece
                        //he checks for all of the places he can go and then choose by there value from myarray
                        //after that he finished he makes the play in the game
                        //so he sends back the i and j of the best move possible
                        // nb זה משתנה שהוא בסה"כ אחראי להגיד שאפשר לשחק את המהלך הזה
                        // הפונקציה מחזירה שורה ועמודה ואז מבצעת אותה במשחק. 
                        if (nb > 0) {
                            return [i, j];

                        }
                    }
                }
    };
    //this function happens when you press on the start button 
    this.restart = function restart() {
        if (!app.game.started) {
            doNextPlayer();
            return;
        }

        if (gameover || confirm("Current game wil be lost, are you sure?")) {
            window.location.reload();
        }
    };
    this.setBoard = function (board) { this.board = boardGrid = board; };
    this.setGplayer = function (p) { playerId = p; };
    this.getGplayer = function (p) { return playerId };

    this.setRound = function (p) { round = p; };
    this.getBoard = function () { return boardGrid };
    this.clone = function () {
        var res = new Board();
        res.setGplayer(playerId);
        res.setRound(round);
        res.noGraphics   = true;
        var boardClone = new Array(8);
        var i, j;
        for (i = 0; i < 8; i++) {
            boardClone[i] = new Array(8);
            for (j = 0; j < 8; j++) {
                boardClone[i][j] = boardGrid[i][j];
            }
        }
        res.setBoard(boardClone);
        res.parent = this;
        res.depth = this.depth + 1;
        //debugger; check clone
        return res;
    };
    //no indentation for that level: just a class wrapper
    return this;
};
var board = new Board();
