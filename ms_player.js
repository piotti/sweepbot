var grid;

var width;
var height;



function displayGrid() {
    var s = '';
    for (var i = 0; i < grid.length; i++) {
        s += '\n';
        for (var j = 0; j < grid[i].length; j++) {
            s += grid[i][j].state + ' ';
        }
        
    }
    return s;
}

var GAME_COUNT;
function solveGames(rows, cols) {
    // try 100 games
    GAME_COUNT = 100;
    solve(rows, cols);
    console.log('done');
}

function solve(rows, cols) {
    if (GAME_COUNT == 0)
        return;
    console.log(GAME_COUNT + ' games left');
    GAME_COUNT--;

    width = cols;
    height = rows;
    
    // Create reference to all squares to solve
    var unsolved_squares = new Set();

    // Create Square grid
    grid = [];
    for (var i = 0; i < cols; i++) {
        var col = [];
        for (var j = 0; j < rows; j++) {
            var sq = new Square(i, j);
            col.push(sq);
            // populate unsolved_squares with every square to start
            unsolved_squares.add(sq);
        }
        grid.push(col);
    }

    // start a new game by pressing smile button
    clickSmile();

    // Make an initial guess in top right corner
    click(Math.floor(width/2), Math.floor(height/2));

    while (unsolved_squares.size > 0) {

        // check for game over
        if (gameOver()) {
            console.log('we lost:(');
            // return;
            return solve(rows, cols);
        }
        if (gameWon()) {
            return;
        }

        updateGrid(grid);

        var to_click = [];
        var to_flag = [];

        // Check which unsolved_squares have been revealed and try to solve
        unsolved_squares.forEach(function(sq) {
            var state = sq.state;
            // Check if state is number
            if (typeof(state) === 'number') {
                // If 0, just remove
                if (state == 0) {
                    unsolved_squares.delete(sq);
                    return;
                }

                // Else, check neighbors for flags and unsolved squares
                var neighbors = getNeighbors(sq);
                // Check number of unsolved squares and flagged squares
                var unsolved = [];
                var flagged = [];
                for (var i = 0; i < neighbors.length; i++) {
                    if (neighbors[i].state == '_' && !neighbors[i].flagged)
                        unsolved.push(neighbors[i]);
                    else if (neighbors[i].flagged)
                        flagged.push(neighbors[i]);
                }

                // Compare unsolved and flagged to square number
                if (unsolved.length == 0) {
                    // this tile's job is done
                    unsolved_squares.delete(sq);
                } else if (flagged.length == state) {
                    // All unsolved squared aren't bombs
                    for (var i = 0; i < unsolved.length; i++) {
                        to_click.push(unsolved[i]);
                    }
                    // square is then solved
                    unsolved_squares.delete(sq);
                } else if (flagged.length + unsolved.length == state) {
                    // All unsolved are flags
                    for (var i = 0; i < unsolved.length; i++) {
                        to_flag.push(unsolved[i]);
                    }
                    // square is then solved
                    unsolved_squares.delete(sq);
                } else if (flagged.length > state) {
                    // oops
                    console.log('there was a flagging error');
                    return;
                }
            }
        });

        if (to_click.length + to_flag.length == 0) {
            // Guess first unsolved square
            
            outer:
            for (var i = 0; i < width; i++) {
                for (var j = 0; j < height; j++) {
                    if (grid[i][j].state == '_' && !grid[i][j].flagged) {
                        to_click.push(grid[i][j]);
                        console.log('guessing');
                        break outer;
                    }
                }
            }
        }
        
        // Click all that should be clicked
        for (var i = 0; i < to_click.length; i++) {
            click(to_click[i].x, to_click[i].y);
        }

        // Flag all that should be flagged
        for (var i = 0; i < to_flag.length; i++) {
            to_flag[i].flag();

            // Remove from unsolved
            unsolved_squares.delete(to_flag[i]);
        }
    }
}

function gameOver() {
    return $('#face').attr('class') == 'facedead';
}
function gameWon() {
    return $('#face').attr('class') == 'facewin';
}


function getNeighbors(square) {
    var ns = [];
    var left = Math.max(0, square.x - 1);
    var right = Math.min(width - 1, square.x + 1);
    var top = Math.max(0, square.y - 1);
    var bot = Math.min(height - 1, square.y + 1);

    for (var x = left; x <= right; x++) {
        for (var y = top; y <= bot; y++) {
            if (x == square.x && y == square.y)
                continue;
            ns.push(grid[x][y]);
        }
    }

    return ns;
}

function clickSmile() {
    var targ = $('#face')[0];
    $(document).trigger({type:'mousedown', button:0, target:targ}).trigger({type:'mouseup', button:0, target:targ});  
}

function click(x, y) {
    var targ = $('#'+(y+1)+'_'+(x+1))[0];
    $(document).trigger({type:'mousedown', button:0, target:targ}).trigger({type:'mouseup', button:0, target:targ});    
}

function flag_click(x, y) {
    var targ = $('#'+(y+1)+'_'+(x+1))[0];
    $(document).trigger({type:'mousedown', button:2, target:targ}).trigger({type:'mouseup', button:2, target:targ});    
}

function Square(x, y) {

    this.x = x;
    this.y = y;
    this.state = '_';
    this.flagged = false;

    this.flag = function() {
        this.flagged = true;
        this.state = 'f';

        // show flag on screen (right click)
        flag_click(this.x, this.y);
    };
}

function updateGrid(grid) {
    for (var i = 0; i < width; i++) {
        for (var j = 0; j < height; j++) {
            var val = getValue(i, j);
            grid[i][j].state = val;
        }
    }
}

function getValue(x, y) {
    var classes = $('#'+(y+1)+'_'+(x+1)).attr('class');
    if (classes.startsWith('square open'))
        return parseInt(classes[11]);
    else if (classes == 'square bombflagged')
        return 'f';
    else if (classes == 'square blank')
        return '_';
    return 'X';
}
