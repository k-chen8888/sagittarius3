// This is the loader file
var FPS = 50;
var xPlayerStart = 50, yPlayerStart = 50;
var xEnemyStart = 750, yEnemyStart = 590;

var players = new Array(2);
players[0] = new Player(1, 0, 'rgb(0, 0, 255)', "orange"); // Player 1
players[1] = new Player(2, 1, 'rgb(255, 0, 0)', "orange"); // Player 2

var canvas = new Array();
canvas.push(document.getElementById('screen_base'));
canvas.push(document.getElementById('screen1'));
canvas.push(document.getElementById('screen2'));
var width = 800, height = 640;

canvas[0].width = width + 400;
canvas[0].height = height;
canvas[0].ctx = canvas[0].getContext('2d')

canvas[1].width = width + 400;
canvas[1].height = height;
canvas[1].ctx = canvas[1].getContext('2d')

canvas[2].width = width + 400;
canvas[2].height = height;
canvas[2].ctx = canvas[2].getContext('2d')

var allSquadrons = new Array(2);

// Make playable squadrons
allSquadrons[players[0].playerIndex] = new Array();
allSquadrons[players[0].playerIndex][0] = new Squadron(xPlayerStart, yPlayerStart, 500, players[0], true, false, 0, 0);
allSquadrons[players[0].playerIndex][1] = new Squadron(xPlayerStart + 50, yPlayerStart + 15, 15000, players[0], true, false, 0, 0);

allSquadrons[players[1].playerIndex] = new Array();
allSquadrons[players[1].playerIndex][0] = new Squadron(80, 100, 500, players[1], true, true, 0, 0);
allSquadrons[players[1].playerIndex][1] = new Squadron(80, 200, 15000, players[1], true, true, 0, 0);

/*
setInterval( // Loop to attack enemy ships
	function(){
		// If in range (true), attack
	},
	500
);
*/

/*
setInterval( // Loop to check for collisions
	function(){
		for(var i = 0; i < allSquadrons.length; i++){
			for(var j = 0; j < allSquadrons.length; j++){
				if(i != j && allSquadrons[i].checkCollision(allSquadrons[j])){
					allSquadrons[i].dx = 0;
					allSquadrons[i].dy = 0;
					
					allSquadrons[j].dx = 0;
					allSquadrons[j].dy = 0;
				}
			}
		}
	},
	500
);
*/

setInterval( // Loop to draw the main game objects
	function(){
		canvas[0].width = canvas[0].width; // Cheating way to clear the canvas for redrawing
		canvas[0].ctx.strokeStyle = "rgba(0, 0, 0, 0)";
		
		// Fog of War
		canvas[0].ctx.beginPath();
		canvas[0].ctx.fillStyle = "rgba(0, 0, 0, 1.0)";
		canvas[0].ctx.fillRect(0, 0, width, height);
		canvas[0].ctx.closePath();

		// Function to clear fog of war using clip on the rectangle
		// Player only
		canvas[0].ctx.beginPath();
		for(var i = 0; i < allSquadrons[0].length; i++){ // Squadrons
			if(allSquadrons[0][i] != 0){ // Some slots will be null after squadrons are destroyed; 0 is placeholder for null
				allSquadrons[0][i].drawFoV();
				
				for(var j = 0 ; j < allSquadrons[0][i].scouts.length; j++){ // Scouts
					allSquadrons[0][i].scouts[j].drawScoutFoV();
				}
			}
		}
		canvas[0].ctx.closePath();
		canvas[0].ctx.clip(); // Cuts out the FoVs to "see" in fog of war
		
		// Set field background
		canvas[0].ctx.beginPath();
		canvas[0].ctx.fillStyle = "rgb(255, 255, 255)";
		canvas[0].ctx.fillRect(0, 0, width, height);
		canvas[0].ctx.fillStyle = "rgba(0, 0, 0, .3)";
		canvas[0].ctx.fillRect(0, 0, width, height);
		canvas[0].ctx.closePath();
		
		// Grid lines
		canvas[0].ctx.beginPath();
		drawGrid(40, "rgb(0, 255, 0)");
		canvas[0].ctx.closePath();
		
		// Place squadrons & scouts
		canvas[0].ctx.beginPath();
		for(var i = 0 ; i < allSquadrons[0].length; i++){
			if(allSquadrons[0][i] != 0){
				allSquadrons[0][i].drawSquadron(); // Squadrons
				
				for(var j = 0 ; j < allSquadrons[0][i].scouts.length; j++){ // Scouts
					allSquadrons[0][i].scouts[j].drawScout();
				}
			}
			
			if(allSquadrons[1][i] != 0){
				allSquadrons[1][i].drawSquadron(); // Squadrons
				
				for(var j = 0 ; j < allSquadrons[1][i].scouts.length; j++){ // Scouts
					allSquadrons[1][i].scouts[j].drawScout();
				}
			}
		}
		canvas[0].ctx.closePath();
		/*
		// Move (still in testing)
		for(var i = 0; i < allSquadrons[0].length; i++){
			if(allSquadrons[0][i] != 0){ allSquadrons[0][i].testMove(); }
			if(allSquadrons[1][i] != 0){ allSquadrons[1][i].testMove(); }
		}*/
		
		
		// Perform attacks (Move this to attack loop)
		//player2Mothership.openFire(allSquadrons[0]);
		
		//console.log(allSquadrons[0].collisionTest(allSquadrons[1]));
		
		//drawMissile( allSquadrons[0][0], allSquadrons[0][0].xCenter, allSquadrons[0][0].yCenter, allSquadrons[0][0].angleTo(allSquadrons[1][0]) );
	},
	100
);