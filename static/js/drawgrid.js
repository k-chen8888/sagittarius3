var drawGrid = function(boxWidth, gridColor){
	canvas[0].ctx.strokeStyle = gridColor;
	for(var i = 0; i <= canvas[0].width; i = i + boxWidth){
		canvas[0].ctx.moveTo(i, 0);
		canvas[0].ctx.lineTo(i, canvas[0].height);
		canvas[0].ctx.stroke();
	}
	for(var i = 0; i <= canvas[0].height; i = i + boxWidth){
		canvas[0].ctx.moveTo(0, i);
		canvas[0].ctx.lineTo(canvas[0].width, i);
		canvas[0].ctx.stroke();
	}
}