// Adjacency matrix
class GraphMatrix {
  constructor(numVertices) {
    this.numVertices = numVertices;
    this.adjMatrix = [];
    // Initialize adjacency matrix with all zeros
    for (let i = 0; i < numVertices; i++) {
      this.adjMatrix.push(new Array(numVertices).fill(0));
    }
  }

  // Add edge between vertices u and v
  addEdge([i, j]) {
    // Check if vertices are within bounds
    if (i >= 0 && i < this.numVertices && j >= 0 && j < this.numVertices) {
      // For an undirected graph, set both u->v and v->u to 1
      this.adjMatrix[i][j] = 1;
    } else {
      console.log("Invalid vertices");
    }
  }

  // Print the adjacency matrix
  printAdjMatrix() {
    for (let i = 0; i < this.numVertices; i++) {
      console.log(this.adjMatrix[i].join(" "));
    }
  }
}

const graph = new GraphMatrix(8);
// graph.addEdge([3, 3]);

const knightTraversal = function (start, finish) {
  const [startA, startB] = start;
  const [finishA, finishB] = finish;
  graph.addEdge([startA, startB]);
  graph.printAdjMatrix();

  const possibleMoves = [
    [-1, -2],
    [-2, -1],
    [-2, 1],
    [-1, 2],
    [1, 2],
    [2, 1],
    [2, -1],
    [1, -2],
  ];
  let visited = new Set();
  const queue = [[startA, startB]];
  let parent = {};

  visited.add(`${startA},${startB}`);

  console.log(queue);
  while (queue.length) {
    const [a, b] = queue.shift();
    if (a === finishA && b === finishB) break;

    for (const [xA, xB] of possibleMoves) {
      const newA = a + xA;
      const newB = b + xB;
      // console.log(newA, newB);
      if (
        newA >= 0 &&
        newA < graph.numVertices &&
        newB >= 0 &&
        newB < graph.numVertices
      ) {
        const key = `${newA},${newB}`;
        if (!visited.has(key)) {
          visited.add(key);
          queue.push([newA, newB]);
          parent[key] = [a, b];
        }
      }
    }
  }

  // Reconstruct the path
  const path = [];
  let current = [finishA, finishB];
  while (current) {
    path.unshift(current);
    current = parent[`${current[0]},${current[1]}`];
  }
  console.log(parent);
  console.log("Shortest path found:");
  console.log(path);
};
knightTraversal([3, 3], [4, 3]);
