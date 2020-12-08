// https://adventofcode.com/2020/day/6

// Read and prepare inputs
const fs = require('fs');                                                       
const INPUTS = fs.readFileSync('day-7-input.csv')                   
  .toString()
  .split('\n');

// Goal: Create objects that contain string-array key-value pairs describing the mapping
// of rules
// Algorithm:
// - Initialize a target object
// - Loop through each rule in the input array
//   - For each rule:
//     - Extract the "key" bag
//     - Extract the "value" string describing the "key" bag contents
//     - Use the "value" string to create an array containing the individual bags mapped
//       to the original "key" bag
//     - Add the key-value pair to the target object

let bagRules = {};
INPUTS.forEach(rule => {
  let ruleWords = rule.replace(/\./g, '')
    .split(' ');
  let innerBag = ruleWords.slice(0, 2).join(' ');
  const CONTAIN_IDX = ruleWords.indexOf('contain');
  let outerBagsWords = ruleWords.slice(CONTAIN_IDX + 1);
  let outerBagsArray = [];
  for (let i = 0; i < outerBagsWords.length; i += 1) {
    let word = outerBagsWords[i];
    if (String(Number(word)) === word) {
      let times = Number(word);
      let bag = [outerBagsWords[i + 1], outerBagsWords[i + 2]].join(' ');
      for (let j = 0; j < times; j += 1) {
        outerBagsArray.push(bag);
      }
    }
  }

  bagRules[innerBag] = outerBagsArray;
});

// Solution, Part 1
// TODO: Need to refactor to perform recursively.
// Goal: Find out which bags can hold at least one 'shiny gold' bag
const SHINY_GOLD = 'shiny gold';
let holdsShinyGold = Object.keys(bagRules).filter(key => {
  return bagRules[key].includes(SHINY_GOLD);
});

// Goal: Find out which bags can hold the bags that can hold shiny gold bags
let holdsShinyGoldHolders = [];
holdsShinyGold.forEach(bag => {
  let bags = Object.keys(bagRules).filter(key => {
    return bagRules[key].includes(bag);
  });
  if (bags.length > 0) {
    holdsShinyGoldHolders.push(bags);
  }
});
let allShinyGoldHolders = holdsShinyGoldHolders.flat();

// Goal: Find bags that hold those
let thirdLevelBags = [];
allShinyGoldHolders.forEach(bag => {
  let bags = Object.keys(bagRules).filter(key => {
    return bagRules[key].includes(bag);
  });
  if (bags.length > 0) {
    thirdLevelBags.push(bags);
  }
});
thirdLevelBags = thirdLevelBags.flat();

let fourthLevelBags = [];
thirdLevelBags.forEach(bag => {
  let bags = Object.keys(bagRules).filter(key => {
    return bagRules[key].includes(bag);
  });
  if (bags.length > 0) {
    fourthLevelBags.push(bags);
  }
});
fourthLevelBags = fourthLevelBags.flat();

let fifthLevelBags = [];
fourthLevelBags.forEach(bag => {
  let bags = Object.keys(bagRules).filter(key => {
    return bagRules[key].includes(bag);
  });
  if (bags.length > 0) {
    fifthLevelBags.push(bags);
  }
});
fifthLevelBags = fifthLevelBags.flat();

let sixthLevelBags = [];
fifthLevelBags.forEach(bag => {
  let bags = Object.keys(bagRules).filter(key => {
    return bagRules[key].includes(bag);
  });
  if (bags.length > 0) {
    sixthLevelBags.push(bags);
  }
});
sixthLevelBags = sixthLevelBags.flat();

let seventhLevelBags = [];
sixthLevelBags.forEach(bag => {
  let bags = Object.keys(bagRules).filter(key => {
    return bagRules[key].includes(bag);
  });
  if (bags.length > 0) {
    seventhLevelBags.push(bags);
  }
});
seventhLevelBags = seventhLevelBags.flat();

let eighthLevelBags = [];
seventhLevelBags.forEach(bag => {
  let bags = Object.keys(bagRules).filter(key => {
    return bagRules[key].includes(bag);
  });
  if (bags.length > 0) {
    eighthLevelBags.push(bags);
  }
});
eighthLevelBags = eighthLevelBags.flat();

let ninthLevelBags = [];
eighthLevelBags.forEach(bag => {
  let bags = Object.keys(bagRules).filter(key => {
    return bagRules[key].includes(bag);
  });
  if (bags.length > 0) {
    ninthLevelBags.push(bags);
  }
});
ninthLevelBags = ninthLevelBags.flat();

let tenthLevelBags = [];
ninthLevelBags.forEach(bag => {
  let bags = Object.keys(bagRules).filter(key => {
    return bagRules[key].includes(bag);
  });
  if (bags.length > 0) {
    tenthLevelBags.push(bags);
  }
});
tenthLevelBags = tenthLevelBags.flat();

let eleventhLevelBags = [];
tenthLevelBags.forEach(bag => {
  let bags = Object.keys(bagRules).filter(key => {
    return bagRules[key].includes(bag);
  });
  if (bags.length > 0) {
    eleventhLevelBags.push(bags);
  }
});
eleventhLevelBags = eleventhLevelBags.flat();

let twelfthLevelBags = [];
eleventhLevelBags.forEach(bag => {
  let bags = Object.keys(bagRules).filter(key => {
    return bagRules[key].includes(bag);
  });
  if (bags.length > 0) {
    twelfthLevelBags.push(bags);
  }
});
twelfthLevelBags = twelfthLevelBags.flat();

let thirteenthLevelBags = [];
twelfthLevelBags.forEach(bag => {
  let bags = Object.keys(bagRules).filter(key => {
    return bagRules[key].includes(bag);
  });
  if (bags.length > 0) {
    thirteenthLevelBags.push(bags);
  }
});
thirteenthLevelBags = thirteenthLevelBags.flat();

let allBags = holdsShinyGold.concat(
  allShinyGoldHolders, thirdLevelBags, fourthLevelBags,
  fifthLevelBags, sixthLevelBags, seventhLevelBags, eighthLevelBags, 
  ninthLevelBags, tenthLevelBags, eleventhLevelBags, twelfthLevelBags,
  thirteenthLevelBags
);
console.log([...new Set(allBags)].length); // 226
