var grid,width,height,GAME_COUNT;function displayGrid(){for(var e="",t=0;t<grid.length;t++){e+="\n";for(var r=0;r<grid[t].length;r++)e+=grid[t][r].state+" "}return e}function solveGames(e,t){GAME_COUNT=100,solve(e,t),console.log("done")}function solve(e,t){if(0!=GAME_COUNT){console.log(GAME_COUNT+" games left"),GAME_COUNT--,width=t,height=e;var r=new Set;grid=[];for(var a=0;a<t;a++){for(var i=[],g=0;g<e;g++){var o=new Square(a,g);i.push(o),r.add(o)}grid.push(i)}for(clickSmile(),click(Math.floor(width/2),Math.floor(height/2));r.size>0;){if(gameOver())return console.log("we lost:("),solve(e,t);if(gameWon())return;updateGrid(grid);var n=[],l=[];if(r.forEach(function(e){var t=e.state;if("number"==typeof t){if(0==t)return void r.delete(e);for(var a=getNeighbors(e),i=[],g=[],o=0;o<a.length;o++)"_"!=a[o].state||a[o].flagged?a[o].flagged&&g.push(a[o]):i.push(a[o]);if(0==i.length)r.delete(e);else if(g.length==t){for(o=0;o<i.length;o++)n.push(i[o]);r.delete(e)}else if(g.length+i.length==t){for(o=0;o<i.length;o++)l.push(i[o]);r.delete(e)}else if(g.length>t)return void console.log("there was a flagging error")}}),n.length+l.length==0)e:for(a=0;a<width;a++)for(g=0;g<height;g++)if("_"==grid[a][g].state&&!grid[a][g].flagged){n.push(grid[a][g]),console.log("guessing");break e}for(a=0;a<n.length;a++)click(n[a].x,n[a].y);for(a=0;a<l.length;a++)l[a].flag(),r.delete(l[a])}}}function gameOver(){return"facedead"==$("#face").attr("class")}function gameWon(){return"facewin"==$("#face").attr("class")}function getNeighbors(e){for(var t=[],r=Math.max(0,e.x-1),a=Math.min(width-1,e.x+1),i=Math.max(0,e.y-1),g=Math.min(height-1,e.y+1),o=r;o<=a;o++)for(var n=i;n<=g;n++)o==e.x&&n==e.y||t.push(grid[o][n]);return t}function clickSmile(){var e=$("#face")[0];$(document).trigger({type:"mousedown",button:0,target:e}).trigger({type:"mouseup",button:0,target:e})}function click(e,t){var r=$("#"+(t+1)+"_"+(e+1))[0];$(document).trigger({type:"mousedown",button:0,target:r}).trigger({type:"mouseup",button:0,target:r})}function flag_click(e,t){var r=$("#"+(t+1)+"_"+(e+1))[0];$(document).trigger({type:"mousedown",button:2,target:r}).trigger({type:"mouseup",button:2,target:r})}function Square(e,t){this.x=e,this.y=t,this.state="_",this.flagged=!1,this.flag=function(){this.flagged=!0,this.state="f",flag_click(this.x,this.y)}}function updateGrid(e){for(var t=0;t<width;t++)for(var r=0;r<height;r++){var a=getValue(t,r);e[t][r].state=a}}function getValue(e,t){var r=$("#"+(t+1)+"_"+(e+1)).attr("class");return r.startsWith("square open")?parseInt(r[11]):"square bombflagged"==r?"f":"square blank"==r?"_":"X"}