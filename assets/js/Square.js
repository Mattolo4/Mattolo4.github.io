function Square(x, y, row, col) {
  //square's color
  this.colVal = color(255);

  //position coordinates
  this.pos = createVector(x, y);
  //index positions in grid
  this.row = row;
  this.col = col;

  this.obstacle = false;

  // For node n, gScore[n] is the cost of the cheapest path from start to n currently known.
  this.g = Infinity;

  // For node n, fScore[n] := gScore[n] + h(n). fScore[n] represents our current best guess as to
  // how cheap a path could be from start to finish if it goes through n.
  this.f = Infinity;

  // h is the heuristic function. h(n) estimates the cost to reach goal from node n.
  this.h = Infinity;
  
  this.previous = undefined;

  //neighbors of current square
  this.neighbors = [];

  //compute the neighbors of current square
  //(8-way alg)
  this.findNeighbors = function() {

    //finds row and col-wise
    if (this.row < rows-1) {
      next = grid[this.row+1][this.col];
      if (!next.obstacle) {        //add just if it's not an obstacle
        this.neighbors.push(next);
      }
    }
    if (this.col < cols-1) {
      next = grid[this.row][this.col+1];
      if (!next.obstacle) {        //add just if it's not an obstacle
        this.neighbors.push(next);
      }
    }
    if (this.row > 0) {
      next = grid[this.row-1][this.col];
      if (!next.obstacle) {        //add just if it's not an obstacle
        this.neighbors.push(next);
      }
    }
    if (this.col > 0) {
      next = grid[this.row][this.col-1];
      if (!next.obstacle) {        //add just if it's not an obstacle
        this.neighbors.push(next);
      }
    }

    //diagonal neighbors
    if (this.row < rows-1 && this.col < cols-1) {
      next = grid[this.row+1][this.col+1];
      if (!next.obstacle) {        //add just if it's not an obstacle
        this.neighbors.push(next);
      }
    }
    if (this.row > 0 && this.col< cols-1) {
      next = grid[this.row-1][this.col+1];
      if (!next.obstacle) {        //add just if it's not an obstacle
        this.neighbors.push(next);
      }
    }
    if (this.row > 0 && this.col > 0) {
      next = grid[this.row-1][this.col-1];
      if (!next.obstacle) {        //add just if it's not an obstacle
        this.neighbors.push(next);
      }
    }
    if (this.row > rows-1  && this.col > 0) {
      next = grid[this.row+1][this.col-1];
      if (!next.obstacle) {        //add just if it's not an obstacle
        this.neighbors.push(next);
      }
    }
    return this.neighbors;
  }



  //display current square with colVal color
  this.display = function() {
    fill(this.colVal);
    stroke(0);
    square(this.pos.x, this.pos.y, dim);
  }
}
