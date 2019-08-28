function World (w,h) {
	var world = [];
	
	var TILE_ON = "█";
	var TILE_OFF = "░";
	
	
		
	var updateDies = [];
	var updateLives = [];
	
	/*
	Any live cell with fewer than two live neighbours dies, as if by underpopulation.
    Any live cell with two or three live neighbours lives on to the next generation.
    Any live cell with more than three live neighbours dies, as if by overpopulation.
    Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
	*/
	
	
	for (var i = 0; i < w; i++) {
		world.push([]);
		
		for (var j = 0; j < h; j++) {
			world[i].push(TILE_OFF);
		}
	}
	
	this.world = world;
	
	this.print = function () {
		return world.map((item) => item.join("")).join("\n")
	}
	
	this.update = function () {
		updateDies.splice(0);
		updateLives.splice(0);
		
		// check if tile needs to be updated
		for (var i = 0; i < h; i++) {
			for (var j = 0; j < w; j++) {
				
				var north = [(i - 1 + h) % h, j];
				var south = [(i + 1 + h) % h, j];
				var west  = [i, (j - 1 + w) % w];
				var east  = [i, (j + 1 + w) % w];
				
				var northWest = [(i - 1 + h) % h, (j - 1 + w) % w];
				var northEast = [(i - 1 + h) % h, (j + 1 + w) % w];
				var southWest = [(i + 1 + h) % h, (j - 1 + w) % w];
				var southEast = [(i + 1 + h) % h, (j + 1 + w) % w];
			
				
				var x,y;
				
				var countAliveNeighbors = 0;
				
				[y,x] = north;if (world[x][y] === TILE_ON) { countAliveNeighbors++ }
				[y,x] = south;if (world[x][y] === TILE_ON) { countAliveNeighbors++ }
				[y,x] = west;if (world[x][y] === TILE_ON) { countAliveNeighbors++ }
				[y,x] = east;if (world[x][y] === TILE_ON) { countAliveNeighbors++ }
				
				[y,x] = northWest;if (world[x][y] === TILE_ON) { countAliveNeighbors++ }
				[y,x] = northEast;if (world[x][y] === TILE_ON) { countAliveNeighbors++ }
				[y,x] = southWest;if (world[x][y] === TILE_ON) { countAliveNeighbors++ }
				[y,x] = southEast;if (world[x][y] === TILE_ON) { countAliveNeighbors++ }
				
				
				if (countAliveNeighbors < 2) { updateDies.push([i,j]); }
				else if (countAliveNeighbors > 3) { updateDies.push([i,j]); }
				else if (countAliveNeighbors === 3) { updateLives.push([i,j]); }
			}
		}
		
		updateDies.forEach((item) => {
			var [y,x] = item;
			
			world[x][y] = TILE_OFF;
		})
		
		updateLives.forEach((item) => {
			var [y,x] = item;
			
			world[x][y] = TILE_ON;
		})
		
	}
}

//░▒▓█
