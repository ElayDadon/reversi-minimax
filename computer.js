
var Computer = function Computer(pboard, depth) {
    var MIN = -10000;
    var MAX = 10000;

    this.gplayer = pboard.gplayer;
    this.board = pboard;
    this.depth = depth;

    function inLimit(i) { return ((0 <= i) && (i < 8)); }
    //==extension
    var cellBonus = [
        [8, 0, 6, 4, 4, 6, 0, 8],
        [0, 0, 4, 4, 4, 4, 0, 0],
        [6, 4, 4, 4, 4, 4, 4, 6],
        [4, 4, 4, 4, 4, 4, 4, 4],
        [4, 4, 4, 4, 4, 4, 4, 4],
        [6, 4, 6, 4, 4, 6, 4, 6],
        [0, 0, 4, 4, 4, 4, 0, 0],
        [8, 0, 6, 4, 4, 6, 0, 8]
    ];
    var m = -63;
    var cellScore = this.cellScore = [
        [m, m, m, m, m, m, m, m],
        [m, m, m, m, m, m, m, m],
        [m, m, m, m, m, m, m, m],
        [m, m, m, m, m, m, m, m],
        [m, m, m, m, m, m, m, m],
        [m, m, m, m, m, m, m, m],
        [m, m, m, m, m, m, m, m],
        [m, m, m, m, m, m, m, m]
    ];
    maxIndex = function (arr) {
        var mx = m;
        var bestmove = [];
        for (i = 0; i < 8; i++)
            for (j = 0; j < 8; j++) {
                if (arr[i][j] > mx) {
                    mx = arr[i][j];
                    bestmove[0] = i;
                    bestmove[1] = j;
                }
            }
        return bestmove;
    }
    min = function (arr) {
        var bestmove = MAX;
        for (i = 0; i < 8; i++)
            for (j = 0; j < 8; j++) {
                if (arr[i][j] < bestmove) {
                    bestmove = arr[i][j];
                    console.log("bestmove is: " + bestmove);
                }
            }
        return bestmove;
    }
    max = function (arr) {
        var bestmove = MIN;
        for (i = 0; i < 8; i++)
            for (j = 0; j < 8; j++) {
                if (arr[i][j] > bestmove) {
                    bestmove = arr[i][j];
                    console.log("bestmove is: " + bestmove);
                }
            }
        return bestmove;
    }

    this.playComputerModel = function (gplayer, round) {
        board.outprintappend("playComputerModel player" + gplayer + " round " + round, 3);
        this.gplayer = gplayer;
        this.scoreBoard(board.clone(), depth);
        //play the best notated cell given by min max algorithm.
        var indexMax = maxIndex(cellScore);
        return indexMax;//return result, let board make the ui updates.
        console.log("indexMax is: " + indexMax);
        console.log("maxIndex is: " + maxIndex);
        console.log("cellscore is: " + cellScore);
        console.log("cell bonus is: " + cellBonus);




    };
    this.scoreBoard = function (board, depth) {

        board.outprintappend("board player" + this.gplayer + " depth " + depth, 3);
        //just play in priority the best notated cells.
    }
}