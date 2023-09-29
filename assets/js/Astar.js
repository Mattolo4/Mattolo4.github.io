//A* algorithm implemented
// A* finds a path from start to goal.

//editable
const height = 800;  //window dim
const dim = 20;     //square dim
const obstacleProb = 0.35;
const fr = 15;

//global setup
const width = height;
const cols = Math.floor(width/dim);
const rows = Math.floor(height/dim);
const grid = new Array(rows);
//A* setup
let openSet = [];    // The set of discovered nodes
// For node n, cameFrom[n] is the node immediately preceding it on the cheapest path from start
// to n currently known.
let comeFrom = [];
//visited squres
let closedSet = [];
let path = [];

function setup() {
  let myCanvas = createCanvas(width, height);
  myCanvas.parent('canvasContainer');
  background(220);
  frameRate(fr);

  for (let i=0; i<cols; i++) {
    grid[i] = new Array(cols);
  }

  //initialize squares
  let i=0;
  j=0;
  for (let row=0; row<height; row+=dim) {
    for (let col=0; col<width; col+=dim) {
      grid[j][i] = new Square(row, col, j, i);

      //build type of the square (obstacle/path)
      let obs = random(0, 1);
      if (obs <= obstacleProb) {
        grid[j][i].colVal = color('black');
        grid[j][i].obstacle = true;
      }
      j++;
    }
    i++;
    j=0;
  }
  start = grid[0][0];
  start.colVal = color('rgb(255,255,0)');
  end = grid[rows-1][cols-1];
  end.colVal = color('magenta');
  end.obstacle = false;

  // The set of discovered nodes
  // Initially, only the start node is known.
  openSet.push(start);

  // For node n, gScore[n] is the cost of the cheapest path from start to n currently known.
  start.g = 0;
  start.f = h(start);
}


function draw() {
  background(220);
  show();

  //A*
  if (openSet.length !=0) {

    current = lowestFScore(openSet);

    openSet.forEach(paintDiscoveredSquares);
    closedSet.forEach(paintGoneSquares);

    if (current === end) {
      //find the path
      let temp = current;
      path = [temp];     
      
      while(temp.previous){
        path.push(temp.previous);
        temp = temp.previous;
      }
      path.forEach(paintPath);
      
      end.colVal = color('rgb(0, 255, 0)');
      show();
      
      console.log("DONE");
      noLoop();
      return;
    }
    removeFromSet(openSet, current);
    closedSet.push(current);
    current.findNeighbors().forEach(compute, this.current);
  } else {
    console.log("No path available to reach END");
    noLoop();
    return;
  }
}


// h is the heuristic function. h(n) estimates the cost to reach goal from node n.
function h(n) {
  //return n.pos.dist(end.pos);
  return abs(n.pos.dist(end.pos));
}


function lowestFScore(openSet) {
  let idx = 0;

  for (let i=0; i<openSet.length; i++) {
    if (openSet[i].f < openSet[idx].f) {
      idx = i;
    }
  }
  return openSet[idx];
}


// d(current,neighbor) is the weight of the edge from current to neighbor
// tentative_gScore is the distance from start to the neighbor through current
function compute(neighbor) {

  if (!closedSet.includes(neighbor)) {
    let tentativeGScore = current.g + 1;  //g = distance from start to current

    if (openSet.includes(neighbor)) {
      if (tentativeGScore < neighbor.g) {
        // This path to neighbor is better than any previous one. Record it!
        neighbor.g = tentativeGScore;
      }
    } else {
      neighbor.g = tentativeGScore;
      openSet.push(neighbor);
    }
    comeFrom.push(current);
    neighbor.h = h(neighbor);
    neighbor.f = neighbor.g + neighbor.h;
    
    neighbor.previous = current;
  }
}

function removeFromSet(openSet, obj) {
  for (let i=openSet.length-1; i>=0; i--) {
    if (openSet[i] == obj) {
      openSet.splice(i, 1);
    }
  }
}

function show() {
  for (let row=0; row<rows; row++) {
    for (let col=0; col<cols; col++) {
      grid[row][col].display();
    }
  }
}

function paintPath(square) {
  square.colVal = (color('rgb(0, 255, 0)'));
}
function paintGoneSquares(square) {
  square.colVal = (color('red'));
}
function paintDiscoveredSquares(square) {
  square.colVal = color('rgb(0, 0, 255)');
}
