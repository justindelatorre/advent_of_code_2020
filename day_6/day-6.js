// https://adventofcode.com/2020/day/6

// Read and prepare inputs
const fs = require('fs');                                                       
const INPUTS = fs.readFileSync('day-6-input.csv')                   
  .toString()          
  .split('\n')
  .map(e => e.trim())
  .map(e => e.split(',').map(e => e.trim()))
  .map(e => e[0]);

// Solution, Part 1
const createGroupStrings = (answerArray) => {
  let groupStrings = [];
  let currentStringArray = [];
  for (let i = 0; i < answerArray.length; i += 1) {
    let current = answerArray[i];
    let next = answerArray[i + 1];
    if (!next) {
      currentStringArray.push(current);
      groupStrings.push(currentStringArray.join(''));
      currentStringArray = [];
    } else {
      currentStringArray.push(current);
    }
  }
  return groupStrings;
};

const countUniqueLetters = (string) => {
  let uniques = [];
  string.split('').forEach(letter => {
    if (!uniques.includes(letter)) {
      uniques.push(letter);
    }
  });

  return uniques.length;
}

let groupStrings = createGroupStrings(INPUTS);
let sumUniques = groupStrings.map(countUniqueLetters)
  .reduce((total, current) => total + current);
console.log(sumUniques); // 6587

// Solution, Part 2
const createGroupArrays = (answerArray) => {
  let groupArrays = [];
  let currentStringArray = [];
  for (let i = 0; i < answerArray.length; i += 1) {
    let current = answerArray[i];
    let next = answerArray[i + 1];
    if (current === '') {
      groupArrays.push(currentStringArray);
      currentStringArray = [];
    } else if (next === undefined) {
      groupArrays.push(currentStringArray);
    } else {
      currentStringArray.push(current);
    } 
  }
  return groupArrays;
};

const countCommonLetters = (groupAnswers) => {
  let commons = [];
  groupAnswers[0].split('').forEach(letter => {
    if (groupAnswers.every(answer => answer.includes(letter))) {
      commons.push(letter);
    }
  });

  return commons.length;
}

let groupArrays = createGroupArrays(INPUTS);
let sumCommons = groupArrays.map(countCommonLetters)
  .reduce((total, current) => total + current);
console.log(sumCommons); // 3235
