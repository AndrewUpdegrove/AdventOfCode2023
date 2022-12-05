import { readText } from '../utils/parse_input.js';

// Inputs:
//      meal_set - array containing all meals for the elf adventuring party
//                 an empty string element denotes the space between two elves
function getElfStats(meal_set) {
    var mutable_meals = [...meal_set];
    var elves = []
    var cur_elf= { 'meals' : [] }
    while (mutable_meals.length > 0) {
        const meal = mutable_meals.shift()
        if (meal === '') {
            elves.push(cur_elf)
            cur_elf= { 'meals' : [] }
        } else {
            cur_elf.meals.push(parseInt(meal))
        }
    }

    // Calculate the total calories for each elf and add it to their object
    elves.forEach(element => {
        const max_calories = element.meals.reduce((accumulator, currentValue) =>
            accumulator + currentValue,
            0
        );
        element.max_calories = max_calories
    });
    return elves
}

// Inputs:
//      elf_stats - an array of objects where each object represents an elf's meal stats
//                  the max_calories is expected to be already calculated
function bestSuppliedElf(elf_stats) {
    return Math.max(...elf_stats.map(o => o.max_calories))
}


export function test() {
    const input = readText('./day1/test.txt');
    const elves = getElfStats(input)
    elves.sort( (a,b) => b.max_calories - a.max_calories );
    console.log(elves)
    return(elves[0].max_calories + elves[1].max_calories + elves[2].max_calories)
}


export function solve() {
    const input = readText('./day1/input1.txt');
    const elves = getElfStats(input)
    elves.sort( (a,b) => b.max_calories - a.max_calories );
    return(elves[0].max_calories + elves[1].max_calories + elves[2].max_calories)
}

