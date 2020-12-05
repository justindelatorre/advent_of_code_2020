// https://adventofcode.com/2020/day/4

// Read and prepare inputs
const fs = require('fs');                                                       
let INPUTS = fs.readFileSync('day-4-input.csv')                    
    .toString()          
    .split('\n')
    .map(e => e.trim())
    .map(e => e.split(',').map(e => e.trim()))
    .map(e => e[0]);

// ALGORITHM
// - Initialize an empty array to hold ID values
// - Loop through strings in input
//   - Initialize an empty string
//   - DO SOMETHING TO CONCAT STRING VALUES
//   - If string is '', push current string to array and skip to next loop

const ID_KEY_VALUES = [];
let currentIdValues = [];

for (let i = 0; i < INPUTS.length; i += 1) {
  let currentStr = INPUTS[i];
  if (currentStr !== '') {
    currentIdValues.push(currentStr)
  } else {
    ID_KEY_VALUES.push(currentIdValues.join(' '));
    currentIdValues = [];
    continue;
  }

  if (i === INPUTS.length - 1) {
    ID_KEY_VALUES.push(currentIdValues.join(' '));
  }
}

// ALGORITHM
// - For each string of id values, split by ' '
// - For each key-value, add to an object, then push to an array
const idObjectsArray = [];
ID_KEY_VALUES.forEach(idKeyValue => {
  let keyValues = idKeyValue.split(' ');
  let idObject = {};
  keyValues.forEach(keyValue => {
    let [key, value] = keyValue.split(':');
    idObject[key] = value;
  });
  idObjectsArray.push(idObject);
});

// ALGORITHM
// - For each idObject, check the keys included
//   - The idObject is valid if:
//     - The length of keys is 8
//     - The length of keys is 7 and only cid is missing

const isValidId = (idObj) => {
  const keys = Object.keys(idObj);
  return (keys.length === 8) || (keys.length === 7 && !keys.includes('cid'));
};

console.log(idObjectsArray.filter(isValidId).length); // 230

// Solution, Part 2
const isValidByr = (byr) => {
  if (byr) {
    return byr.length === 4 && Number(byr) >= 1920 && Number(byr) <= 2002;
  } else {
    return false;
  }
};
console.log(isValidByr('1921'));

const isValidIyr = (iyr) => {
  if (iyr) {
    return iyr.length === 4 && Number(iyr) >= 2010 && Number(iyr) <= 2020;
  } else {
    return false;
  }
};
console.log(isValidIyr('2011'));

const isValidEyr = (eyr) => {
  if (eyr) {
    return eyr.length === 4 && Number(eyr) >= 2020 && Number(eyr) <= 2030;
  } else {
    return false;
  }
};
console.log(isValidEyr('2021'));

const isValidHgt = (hgt) => {
  let suffix = hgt ? hgt.slice(-2) : undefined;
  let numValue; 
  
  if (hgt.match(/[0-9]/g)) {
    numValue = Number(hgt.match(/[0-9]/g).join(''));
  }

  if (suffix === 'cm') {
    return numValue >= 150 && numValue <= 193;
  } else if (suffix === 'in') {
    return numValue >= 59 && numValue <= 76;
  } else {
    return false;
  }
};
console.log(isValidHgt('151cm'));
console.log(isValidHgt('60in'));
console.log(isValidHgt('183cm'));

const isValidHcl = (hcl) => {
  let hasLeadingHash = false;
  let hasHexChars;
  
  if (hcl) {
    hasLeadingHash = hcl[0] === '#';
    if (hcl.slice(1).match(/[a-z0-9]/g)) {
      hasHexChars = hcl.slice(1).match(/[a-z0-9]/g).length === 6;
    }
  }

  return hasLeadingHash && hasHexChars;
};
console.log(isValidHcl('#456fff'));

const isValidEcl = (ecl) => {
  const validEcl = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
  return ecl ? validEcl.includes(ecl) : false;
};
console.log(isValidEcl('gry'));

const isValidPid = (pid) => {
  const VALID_PID_LENGTH = 9;
  if (pid.match(/[\d]/g)) {
    return pid.match(/[\d]/g).length === VALID_PID_LENGTH;
  }
  return false;
};
console.log(isValidPid('123456789'));

const isValidCid = (cid) => {
  return !!cid;
};

const hasValidValues = (idObj) => {
  console.log(idObjectsArray.indexOf(idObj));

  const hasValidByr = isValidByr(idObj.byr);
  const hasValidIyr = isValidIyr(idObj.iyr);
  const hasValidEyr = isValidEyr(idObj.eyr);
  const hasValidHgt = isValidHgt(idObj.hgt);
  const hasValidHcl = isValidHcl(idObj.hcl);
  const hasValidEcl = isValidEcl(idObj.ecl);
  const hasValidPid = isValidPid(idObj.pid);
  const hasValidCid = isValidCid(idObj.cid);

  return hasValidByr && hasValidIyr && hasValidEyr && hasValidHgt &&
    hasValidHcl && hasValidEcl && hasValidPid && isValidId(idObj);
};

let countValidObjs = 0;
idObjectsArray.forEach(obj => {
  if (hasValidValues(obj)) {
    countValidObjs += 1
  }
});

console.log(countValidObjs);
