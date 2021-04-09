function World (w,h) {
	
	var canavs, ctx;
	
	var world = [];
	
	var updateDies = [];
	var updateLives = [];
	
	function getTile (x,y) {
		return world[y][x];
	}
	
	function setTile (x,y,state) {
		return world[y][x] = state;
	}
	
	function getTileAliveCount (j,i) {
		var countAlive = 0;
	
		if ( getTile(j, (i - 1 + h) % h) ) { countAlive++; } // north
		if ( getTile(j, (i + 1 + h) % h) ) { countAlive++; } // south
		if ( getTile((j - 1 + w) % w, i) ) { countAlive++; } // west
		if ( getTile((j + 1 + w) % w, i) ) { countAlive++; } // east
		if ( getTile((j - 1 + w) % w, (i - 1 + h) % h) ) { countAlive++; } // northwest
		if ( getTile((j + 1 + w) % w, (i - 1 + h) % h) ) { countAlive++; } // northeast
		if ( getTile((j - 1 + w) % w, (i + 1 + h) % h) ) { countAlive++; } // southwest
		if ( getTile((j + 1 + w) % w, (i + 1 + h) % h) ) { countAlive++; } // southeast
		
		return countAlive;
	}
	
	this.world = world;
	
	this.getTile = getTile;
	this.setTile = setTile;
	
	this.draw = function () {
		var img = new ImageData(w,h);
		
		for (var y = 0; y < world.length; y++) {
			for (var x = 0; x < world[y].length; x++) {
				if (getTile(x,y)) {
					img.data[(y * w + x) * 4 - 1] = 255;
				}
				else {
					img.data[(y * w + x) * 4 - 1] = 0;
				}
			}
		}
		
		ctx.putImageData(img,0,0);
	}
	
	this.update = function () {
		
		var countAlive = 0;
		
		// clean up the update list
		updateDies.splice(0);
		updateLives.splice(0);
		
		// check if tile needs to be updated
		for (var i = 0; i < h; i++) {
			for (var j = 0; j < w; j++) {
				
				countAlive = getTileAliveCount(j,i);
				
				if (countAlive < 2) { updateDies.push(j,i); }
				else if (countAlive > 3) { updateDies.push(j,i); }
				else if (countAlive === 3) { updateLives.push(j,i); }
			
			}
		}
		
		
		// commit updates
		for (var i = 0; i < updateDies.length; i+=2) {
			setTile(updateDies[i],updateDies[i + 1], false);
		}
		
		for (var i = 0; i < updateLives.length; i+=2) {
			setTile(updateLives[i],updateLives[i + 1], true);
		}
		
	}
	
	
	// build world
	for (var i = 0; i < h; i++) {
		world.push([]);
		
		for (var j = 0; j < w; j++) {
			world[i].push(false);
		}
	}
	
	// create drawing surface
	canvas = document.createElement("canvas");
	
	canvas.width = w;
	canvas.height = h;
	canvas.style = "image-rendering: crisp-edges;";
	
	ctx = canvas.getContext("2d");
	
	document.body.appendChild(canvas);
	
	
}
