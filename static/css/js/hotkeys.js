window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

// Select a squadron to act on
document.addEventListener('keydown', function(event){
	switch(event.keyCode){ // Access all 20 squadrons
		// No modifier: First 5
		// SHIFT: 6-10
		// CTRL: 11-15
		// ALT: 16-20
			
		case 49: // 1				
			break;
		case 50: // 2
			break;
		case 51: // 3
			break;
		case 52: // 4
			break;
		case 53: // 5
			break;
	}
});

document.addEventListener('keydown', function(event){
	switch(event.keyCode){
		/* Movement keys*/
		
		case 37: // Move left
			allSquadrons[0][players[0].selectedIndex].dx = -flySpeed;
			
			while(event.keycode == 37){
				var handle = setInterval(
					function(){
						allSquadrons[0][players[0].selectedIndex].xCenter += allSquadrons[0][players[0].selectedIndex].dx;
			
						console.log(allSquadrons[0][players[0].selectedIndex].xCenter);						
					},
					500
				);
			};
			
			allSquadrons[0][players[0].selectedIndex].dx = 0;
			
			clearInterval(handle);
			handle = 0;
			
			console.log('left arrow key pressed!');
			
			break;
		case 38: // Move up
			allSquadrons[0][players[0].selectedIndex].dy = -flySpeed;
			
			while(event.keycode == 38){
				allSquadrons[0][players[0].selectedIndex].yCenter += allSquadrons[0][players[0].selectedIndex].dy;
				
				console.log(allSquadrons[0][players[0].selectedIndex].yCenter);
			};
			
			allSquadrons[0][players[0].selectedIndex].dy = 0;
			
			console.log('up arrow key pressed!');
			
			break;
		case 39: // Move right
			allSquadrons[0][players[0].selectedIndex].dx = flySpeed;
			
			while(event.keycode == 37){
				allSquadrons[0][players[0].selectedIndex].xCenter += allSquadrons[0][players[0].selectedIndex].dx;
				
				console.log(allSquadrons[0][players[0].selectedIndex].xCenter);
			};
			
			allSquadrons[0][players[0].selectedIndex].dx = 0;
			
			console.log('right arrow key pressed!');
			
			break;
		case 40: // Move down
			allSquadrons[0][players[0].selectedIndex].dy = flySpeed;
			
			while(event.keycode == 38){
				allSquadrons[0][players[0].selectedIndex].yCenter += allSquadrons[0][players[0].selectedIndex].dy;
				
				console.log(allSquadrons[0][players[0].selectedIndex].yCenter);
			};
			
			allSquadrons[0][players[0].selectedIndex].dy = 0;
			
			console.log('down arrow key pressed!');
			
			break;
		
		
		/* Command Keys */
		
		case 68: // Find a target ship
			var distance = allSquadrons[0][players[0].selectedIndex].atkRange;
			
			for(var i = 0; i < allSquadrons[1].length; i++){
				var tDistance = allSquadrons[0][players[0].selectedIndex].distanceTo(allSquadrons[1][i]);
				
				if(tDistance < distance){
					players[0].targetIndex = i;
					distance = tDistance;
				}
			};
			
			break;
		
		case 65: // Attack target ship
			if(players[0].targetIndex > -1){
				allSquadrons[0][players[0].selectedIndex].projectileTest(allSquadrons[0][players[0].targetIndex]);
			};
			
			break;
	};
});

document.addEventListener('keydown', function(event){
	
});

var getCommandByCoords = function(){
	var x = 0;
	var y = 0;
	var canvas = new Array();
	canvas.push(document.getElementById('screen_base'));
	canvas.push(document.getElementById('screen_layer1'));
	
	if(event.x != undefined && event.y != undefined){
		x = event.x;
		y = event.y;
	} else {
		x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
		y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
	}
	
	x -= canvas[0].offsetLeft;
	y -= canvas[0].offsetTop;
	
	if(x >= 800 && x <= 1200 && y >= 0 && y <= 640){ // Match clicks in the window to the correct button
		console.log("x: " + x);
		console.log("y: " + y);
	}
};