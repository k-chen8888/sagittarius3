// Some squadron of ships
var squadronSprite1 = function(xCenter, yCenter, color){ // Drawn on canvas[0]
	//yCenter -= 10;
	console.log(xCenter);
	console.log(yCenter);
	
	canvas[0].ctx.beginPath();
	canvas[0].ctx.moveTo(xCenter, yCenter);
	canvas[0].ctx.lineTo(xCenter - 2.5, yCenter - 5 * Math.sqrt(3)/2);
	canvas[0].ctx.lineTo(xCenter + 2.5, yCenter - 5 * Math.sqrt(3)/2);
	canvas[0].ctx.lineTo(xCenter - 2.5 - 8, yCenter + 20 + 5 * Math.sqrt(3)/2);
	canvas[0].ctx.lineTo(xCenter - 5 - 8, yCenter + 20);
	canvas[0].ctx.lineTo(xCenter + 5 + 8, yCenter + 20);
	canvas[0].ctx.lineTo(xCenter + 2.5 + 8, yCenter + 20 + 5 * Math.sqrt(3)/2);
	canvas[0].ctx.lineTo(xCenter, yCenter);
	canvas[0].ctx.fillStyle = color;
	canvas[0].ctx.fill();
	canvas[0].ctx.closePath();
	/*
	canvas[0].ctx.beginPath();
	canvas[0].ctx.moveTo(xCenter, yCenter);
	canvas[0].ctx.moveTo(xCenter - 2.5, yCenter - );
	canvas[0].ctx.fillStyle = color;
	canvas[0].ctx.fill();
	canvas[0].ctx.closePath();*/
};

// Player 2's squadrons start on top of screen and face down
var squadronSprite2 = function(xCenter, yCenter, color){ // Drawn on canvas[0]
	//yCenter += 10;
	canvas[0].ctx.beginPath();
	canvas[0].ctx.moveTo(xCenter, yCenter);
	canvas[0].ctx.lineTo(xCenter + 2.5, yCenter + 5 * Math.sqrt(3)/2);
	canvas[0].ctx.lineTo(xCenter - 2.5, yCenter + 5 * Math.sqrt(3)/2);
	canvas[0].ctx.lineTo(xCenter + 2.5 + 8, yCenter - 20 - 5 * Math.sqrt(3)/2);
	canvas[0].ctx.lineTo(xCenter + 5 + 8, yCenter - 20);
	canvas[0].ctx.lineTo(xCenter - 5 - 8, yCenter - 20);
	canvas[0].ctx.lineTo(xCenter - 2.5 - 8, yCenter - 20 - 5 * Math.sqrt(3)/2);
	canvas[0].ctx.lineTo(xCenter, yCenter);
	canvas[0].ctx.fillStyle = color;
	canvas[0].ctx.fill();
	canvas[0].ctx.closePath();
};

// Scouts
var scoutSprite = function(xCenter, yCenter, size, color){ // Drawn on canvas[0]
	canvas[0].ctx.arc(xCenter, yCenter, size, 0, 2 * Math.PI);
	canvas[0].ctx.fillColor = color;
	canvas[0].ctx.fill();
}

// Projectiles
var drawMissile = function(source, xCenter, yCenter, theta){ // Drawn on canvas[1]
	transform = triangulate(theta);
	
	canvas[1].ctx = canvas[1].getContext('2d');
	
	/*
	ctx.beginPath();
	ctx.moveTo(source.xCenter(), source.yCenter() - 5);
	ctx.lineTo(source.xCenter() - 3,  source.yCenter() - 5 + 10);
	ctx.lineTo(source.xCenter() + 3,  source.yCenter() - 5 + 10);
	ctx.lineTo(source.xCenter(),  source.yCenter() - 5);
	ctx.fillStyle = source.player.missileColor;
	ctx.fill();
	ctx.closePath();
	*/
	
	canvas[1].ctx.beginPath();
	canvas[1].ctx.moveTo(xCenter + transform[0][0], yCenter + transform[0][1]);
	canvas[1].ctx.lineTo(xCenter + transform[1][0], yCenter + transform[1][1]);
	canvas[1].ctx.lineTo(xCenter + transform[2][0], yCenter + transform[2][1]);
	canvas[1].ctx.lineTo(xCenter + transform[0][0], yCenter + transform[0][1]);
	canvas[1].ctx.fillStyle = source.player.missileColor;
	canvas[1].ctx.fill();
	canvas[1].ctx.closePath();
}

// Movement vectors
var attackStream = function(source, target){ // Direction to point to to attack
	var incX = target.xCenter - source.xCenter;
	var incY = target.yCenter - source.yCenter;
	
	var theta = 0;
	
	if(incX != 0){
		theta = Math.atan(incY / incX);
	} else {
		theta = Math.PI / 2;
	}
	
	if(incY > 0){
		theta += Math.PI;
	}
}

var triangulate = function(theta){	// Generates a triangle based on given parameters
	// xDim is the TOTAL x-width
	// yDim is the TOTAL y-width
	
	//var points = [ [0, -5] , [-3, 5] , [3, 5] ];
	var points = [ [5, 0] , [-5, -3] , [-5, 3] ];
	
	// Even -> x; odd -> y     --       --
	// 0 & 1 are front         | 0  2  4 |
	// 2 & 3 are left side     | 1  3  5 |
	// 4 & 5 are right side    --       --
	//                         v_1 v_2 v_3
	
	//var transform = [ [ Math.cos(theta), Math.sin(theta) ], [ -Math.sin(theta), Math.cos(theta) ] ]; // Rotate clockwise
	var transform = [ [ Math.cos(theta), -Math.sin(theta) ], [ Math.sin(theta), Math.cos(theta) ] ]; // Transpose to rotate counterclockwise
	
	var out = [ [0, 0] , [0, 0] , [0, 0] ];
	
	for(var i = 0; i < 3; i++){
		for(var j = 0; j < 2; j++){
			out[i][j] = transform[0][j] * points[i][0] + transform[1][j] * points[i][1];
		}
	}
	
	/*
	transform[0][0]*points[0][0] + transform[1][0]*points[0][1]
	transform[0][1]*points[0][0] + transform[1][1]*points[0][1]

	transform[0][0]*points[1][0] + transform[1][0]*points[1][1]
	transform[0][1]*points[1][0] + transform[1][1]*points[1][1]

	transform[0][0]*points[2][0] + transform[1][0]*points[2][1]
	transform[0][1]*points[2][0] + transform[1][1]*points[2][1]

	[2  3][0  -3  3]
	[1  5][-5  5  5]

	[-15   9   21]
	[-25  22   28]
	*/
	
	return out;
}

// FoV
var FoV = function(xCenter, yCenter, sightRange){ // Drawn on canvas[0]
	canvas[0].ctx.arc(xCenter, yCenter, sightRange, 0, 2 * Math.PI);
}