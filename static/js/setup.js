/* Methods used to redraw the game field on reload
 * - Clear the canvas for redraw
 * - Make the field background gray (fade black using alpha channel)
 * - Draw green grid lines
 * 		- Grid is in 40x40 squares
 * - Draw Fog of War (completely black layer that goes over everything else)
*/


// Clear the canvases
function clearAll(){
	$("canvas")[0].width = $("canvas")[0].width;
	$("canvas")[1].width = $("canvas")[1].width;
	$("canvas")[2].width = $("canvas")[2].width;
}


// Set field background
function background(){
	$("canvas")[0].ctx.beginPath();
	$("canvas")[0].ctx.fillStyle = "rgba(0, 0, 0, .3)";
	$("canvas")[0].ctx.fillRect(0, 0, width, height);
	$("canvas")[0].ctx.closePath();
}


// Grid lines
function drawGrid(){
	$("canvas")[0].ctx.beginPath();
	$("canvas")[0].ctx.strokeStyle = "rgb(0, 255, 0)";
	
	for(var i = 0; i <= $("canvas")[0].width; i = i + 40){
		$("canvas")[0].ctx.moveTo(i, 0);
		$("canvas")[0].ctx.lineTo(i, $("canvas")[0].height);
		$("canvas")[0].ctx.stroke();
	}
	
	for(var i = 0; i <= $("canvas")[0].height; i = i + 40){
		$("canvas")[0].ctx.moveTo(0, i);
		$("canvas")[0].ctx.lineTo($("canvas")[0].width, i);
		$("canvas")[0].ctx.stroke();
	}
	
	$("canvas")[0].ctx.closePath();
}


// Fog of War
function fogOfWar(){
	$("canvas")[0].ctx.beginPath();
	$("canvas")[0].ctx.fillStyle = "rgba(0, 0, 0, 1.0)";
	$("canvas")[0].ctx.fillRect(0, 0, width, height);
	$("canvas")[0].ctx.closePath();
}