// https://adventofcode.com/2020/day/6

// Read and prepare inputs
const fs = require('fs');                                                       
const INPUTS = fs.readFileSync('day-7-input.csv')                   
  .toString()
  .split('\n');

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
const getBags = (rules, bagArray) => {
  let allBags = [];
  while (bagArray.length > 0) {
    let bags = [];
    bagArray.forEach(bag => {
      let bagsToAdd = Object.keys(rules).filter(key => {
        return rules[key].includes(bag);
      });
      if (bagsToAdd.length > 0) {
        bags.push(bagsToAdd);
      }
    });
    bags = bags.flat();
    allBags = allBags.concat(bags);
    bagArray = bags;
  }

  return [...new Set(allBags)].length;
};

console.log(getBags(bagRules, ['shiny gold'])); // 226

// Solution, Part 2
// TODO
