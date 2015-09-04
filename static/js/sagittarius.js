var width = 800, height = 640;


var players = new Array(2);

players[0] = new Player(1, 0, 'rgb(0, 0, 255)', "orange"); // Player 1
//players[0].standardShips.push(new Squadron(50, 50, new Standard(), players[0]));

players[1] = new Player(2, 1, 'rgb(255, 0, 0)', "orange"); // Player 2
//players[1].standardShips.push(new Squadron(100, 100, new Standard(), players[1]));

// This is the main event loop
// 1. Read stack/queue
// 2. Set up modes, prepare for actions
// 3. Apply changes
// 4. Redraw canvases
// 5. Clean up, collect variables for next case
$(document).ready(function(){
	
	// Set up canvases
	$("canvas")[0].width = width + 400;
	$("canvas")[0].height = height;
	$("canvas")[0].ctx = $("canvas")[0].getContext('2d');

	$("canvas")[1].width = width + 400;
	$("canvas")[1].height = height;
	$("canvas")[1].ctx = $("canvas")[1].getContext('2d')

	$("canvas")[2].width = width + 400;
	$("canvas")[2].height = height;
	$("canvas")[2].ctx = $("canvas")[2].getContext('2d')
	
	
	// Loop to draw the main game objects
	setInterval(function(){
		
		// Clear the canvases
		clearAll();
		
		
		// Set field background
		background();
		
		
		// Grid lines
		drawGrid();
		
		
		// Fog of War
		fogOfWar();
		
		
		// Draw background for control panel
		$("canvas")[2].ctx.beginPath();
		$("canvas")[2].ctx.fillStyle = "rgb(0, 0, 205)";
		$("canvas")[2].ctx.fillRect(width, 0, width + 400, height);
		$("canvas")[2].ctx.closePath();
		
		
		// Simulates a click on bottom canvas to redraw all 3 canvases
		$("canvas")[0].click(function(e){
			e.preventDefaults();
			
			$("canvas")[0].trigger('redraw');
		});
		
	}, 500);
	
});