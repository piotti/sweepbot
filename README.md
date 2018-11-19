# Sweepbot

## Setup

### Locally
Download all files into same directory. Load `ms.html` into your webbrowser. The file `ms_player.js` will be automatically loaded into the web page. 

### Deployed
Go to [minesweeperonline.com](http://minesweeperonline.com). Copy code (either from `ms_player.js`, or more conveniently, `ms_player_min.js`) into developer's console (open with `Ctrl-Shift-J` in Chrome).

## Solving
Open developer's console, and type `solveGames(height, width)`. E.g. for expert game, type `solveGames(16, 30)`. This will run 100 games, or until you win. If you don't win, just run again.
