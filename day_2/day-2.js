// https://adventofcode.com/2020/day/2

const fs = require('fs');                                                       
                                                                                
const INPUTS = fs.readFileSync('day-2-input.csv')                               
    .toString()                                                                 
    .split('\n')                                                                
    .map(e => e.trim())                                                         
    .map(e => e.split(',').map(e => e.trim()))
    .map(e => e[0]);  

// Solution, Part 1
const isValidPasswordOne = (policyPassword) => {
  const [MIN, MAX] = policyPassword.match(/[\d]+/g);
  const LETTER = policyPassword.match(/[a-z]/)[0];
  const [PASSWORD] = policyPassword.match(/[a-z]+$/g);
  
  let matches = PASSWORD.split('').filter(char => { 
    return char === LETTER
  }).length; 
  return matches >= MIN && matches <= MAX;
};

console.log(INPUTS.filter(isValidPasswordOne).length); // 515

// Solution, Part 2
const isValidPasswordTwo = (policyPassword) => {
  const [FIRST_IDX, SECOND_IDX] = policyPassword.match(/[\d]+/g);
  const LETTER = policyPassword.match(/[a-z]/)[0];
  const [PASSWORD] = policyPassword.match(/[a-z]+$/g);
  
  return [PASSWORD[FIRST_IDX - 1], PASSWORD[SECOND_IDX - 1]].filter(el => { 
    return el === LETTER 
  }).length === 1; 
};

console.log(INPUTS.filter(isValidPasswordTwo).length); // 711
