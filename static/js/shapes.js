/* Ship design

			   0---1
				\ /
				 .
				/ \
			   /   \
              /     \
			 /   c   \
			/   ccc   \
		   /           \
	  3---.-------------.---4
	   \ /               \ /
	    2        	      5

	Main triangle: 16px by 20 px
	Small triangles: Equilateral 5 px all sides
	
	To flip the model, subtract the y values instead of adding them
*/

// Vectors that determine the points on the model using vectors from center
var shipLayout = [
	[-2.5,     -10 - 5 * Math.sqrt(3)/2],       // Move here to begin; final line to here to end
	[2.5,      -10 - 5 * Math.sqrt(3)/2],       // First line to here
	[-8 - 2.5, 10 + 5 * Math.sqrt(3)/2],        // Second line to here
	[-8 - 5,   10],                             // Third line to here
	[8 + 5,    10],                             // Fourth line to here
	[8 + 5,    10 + 5 * Math.sqrt(3)/2]         // Fifth line to here
];

function triangulate(theta){
	// Generates a triangle rotated by an angle
	
	// Set up the offsets from the central point of the triangle
	// True form of the array is the transpose of the below
	var points = [
		[5, 0],
		[-5, -3],
		[-5, 3]
	];
	
	/* Shape of triangle:
			-|---5 units---|
			|
		3 units
			|
			-
	*/
	
	var out = [
		[0, 0],
		[0, 0],
		[0, 0]
	];
	
	/* Even -> x; odd -> y     --       --
	   0 & 1 are front         | 0  2  4 |
	   2 & 3 are left side     | 1  3  5 |
	   4 & 5 are right side    --       --
	                           v_1 v_2 v_3
	
	
	// Rotate clockwise
	var transform = [
		[ Math.cos(theta), Math.sin(theta) ],
		[ -Math.sin(theta), Math.cos(theta) ]
	];
	*/
	
	// Transpose to rotate counterclockwise
	var transform = [
		[ Math.cos(theta), -Math.sin(theta) ],
		[ Math.sin(theta), Math.cos(theta) ]
	];
	
	for(var i = 0; i < 3; i++){
		for(var j = 0; j < 2; j++){
			out[i][j] = transform[0][j] * points[i][0] + transform[1][j] * points[i][1];
		}
	}
	
	return out;
}

function distance(object1, object2){
	// Get the distance from object1 to object2
	
	xObject1 = object1.xStart + object1.xOffset;
	yObject1 = object1.yStart + object1.yOffset;
	
	xObject2 = object2.xStart + object2.xOffset;
	yObject2 = object2.yStart + object2.yOffset;
	
	return Math.sqrt(Math.pow((xObject1 - xObject2), 2) + Math.pow((yObject1 - yObject2), 2));
}

function theta(object1, object2){
	// Get the angle from object1 to object 2
	
	xObject1 = object1.xStart + object1.xOffset;
	yObject1 = object1.yStart + object1.yOffset;
	
	xObject2 = object2.xStart + object2.xOffset;
	yObject2 = object2.yStart + object2.yOffset;

	return Math.atan( -(yObject1 - yObject2) / (xObject1 - xObject2) );
};