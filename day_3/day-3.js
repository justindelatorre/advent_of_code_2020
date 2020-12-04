// https://adventofcode.com/2020/day/3

// Read and prepare inputs
const fs = require('fs');                                                       

const TREE = '#';
let INPUTS = fs.readFileSync('day-3-input.csv')                               
    .toString()                                                                 
    .split('\n')                                                                
    .map(e => e.trim())                                                         
    .map(e => e.split(',').map(e => e.trim()))
    .map(e => e[0]);

const INPUTS_WIDTH = INPUTS[0].length;
const INPUTS_HEIGHT = INPUTS.length;
const STEPS_RIGHT = 3;
const STEPS_DOWN = 1;

// Create new map with extended terrain
const createTerrain = (inputHeight, inputWidth, stepsRight) => {
  const COPY_TIMES = Math.ceil(inputHeight * stepsRight / inputWidth);
  let terrain = [];
  for (let i = 0; i < inputHeight; i += 1) {
    let template = INPUTS[i];
    let row = '';
    for (let j = 0; j < COPY_TIMES; j += 1) {
      row += template;
    }

    terrain.push(row);
  }

  return terrain;
};

// Solution, Part 1
const countTrees = (terrain, stepsRight, stepsDown) => {
  let horizontalIdx = 0;
  let verticalIdx = 0;
  let treeCount = 0;
  let currentPos = terrain[verticalIdx][horizontalIdx];

  while (verticalIdx < terrain.length - 1)  {
    if (currentPos === TREE) {
      treeCount += 1;
    }

    horizontalIdx += stepsRight;
    verticalIdx += stepsDown;
    currentPos = terrain[verticalIdx][horizontalIdx];
  }

  return treeCount;
};

let terrain1 = createTerrain(INPUTS_HEIGHT, INPUTS_WIDTH, STEPS_RIGHT);
console.log(countTrees(terrain1, STEPS_RIGHT, STEPS_DOWN)); // 184

// Solution, Part 2
let terrain2 = createTerrain(INPUTS_HEIGHT, INPUTS_WIDTH, 1);
console.log(countTrees(terrain2, 1, 1)); // 62

let terrain3 = createTerrain(INPUTS_HEIGHT, INPUTS_WIDTH, 5);
console.log(countTrees(terrain3, 5, 1)); // 80

let terrain4 = createTerrain(INPUTS_HEIGHT, INPUTS_WIDTH, 7);
console.log(countTrees(terrain4, 7, 1)); // 74

let terrain5 = createTerrain(INPUTS_HEIGHT, INPUTS_WIDTH, 1);
console.log(countTrees(terrain5, 1, 2)); // 36
