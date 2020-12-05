// https://adventofcode.com/2020/day/5

// Read and prepare inputs
const fs = require('fs');                                                       
const INPUTS = fs.readFileSync('day-5-input.csv')                   
  .toString()          
  .split('\n')
  .map(e => e.trim())
  .map(e => e.split(',').map(e => e.trim()))
  .map(e => e[0]);

const LOWER_ROW_END = 0;
const UPPER_ROW_END = 127;
const LEFT_ROW_END = 0;
const RIGHT_ROW_END = 7;

const getRow = (passNumber) => {
  const CHARS = passNumber.slice(0, 7).split('');
  let lowerBound = LOWER_ROW_END;
  let upperBound = UPPER_ROW_END;

  for (let i = 0; i < CHARS.length; i += 1) {
    let char = CHARS[i];
    let midpoint = Math.floor((upperBound + lowerBound) / 2);
    if (char === 'F') {
      upperBound = midpoint;
    } else {
      lowerBound = midpoint; 
    }
  }

  return upperBound;
};
console.log(getRow('FBFBBFFRLR') === 44);
console.log(getRow('BFFFBBFRRR') === 70);
console.log(getRow('FFFBBBFRRR') === 14);

const getCol = (passNumber) => {
  const CHARS = passNumber.slice(-3);
  let lowerBound = LEFT_ROW_END;
  let upperBound = RIGHT_ROW_END;

  for (let i = 0; i < CHARS.length; i += 1) {
    let char = CHARS[i];
    let midpoint = Math.floor((upperBound + lowerBound) / 2);
    if (char === 'L') {
      upperBound = midpoint;
    } else {
      lowerBound = midpoint; 
    }
  }

  return upperBound;
};
console.log(getCol('FBFBBFFRLR') === 5);
console.log(getCol('BFFFBBFRRR') === 7);
console.log(getCol('FFFBBBFRRR') === 7);

const getSeatNum = (passNumber) => {
  return getRow(passNumber) * 8 + getCol(passNumber);
};
console.log(getSeatNum('FBFBBFFRLR') === 357);
console.log(getSeatNum('BFFFBBFRRR') === 567);
console.log(getSeatNum('FFFBBBFRRR') === 119);

// Solution, Part 1
let maxSeatNum = 0;
INPUTS.forEach(boardingPass => {
  let currentSeatNum = getSeatNum(boardingPass);
  if (currentSeatNum > maxSeatNum) {
    maxSeatNum = currentSeatNum;
  }
});
console.log(maxSeatNum); // 896

// Solution, Part 2
let seatNumArray = INPUTS.map(getSeatNum).sort((a, b) => a - b);
let mySeat;
for (let i = 1; i < seatNumArray.length; i += 1) {
  let currentSeatNum = seatNumArray[i];
  let previousSeatNum = seatNumArray[i - 1]
  if (currentSeatNum === previousSeatNum + 2) {
    mySeat = (currentSeatNum + previousSeatNum) / 2;
  }
};
console.log(mySeat); // 659
console.log(seatNumArray.includes(659) === false);
