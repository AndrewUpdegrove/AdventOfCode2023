import { readText } from '../utils/parse_input.js';

function buildSack(items) {
    var sack = {
        itemCounts: {},
        duplicates : {},
        itemSet: new Set([...items]),
        compartment1 : [...items.slice(0, items.length /2)],
        compartment2 : [...items.slice(items.length / 2)]
    };
    sack.compartment1.forEach(item => sack.itemCounts[item] = 1);
    sack.compartment2.forEach(item => {
        if (item in sack.itemCounts) {
            sack.itemCounts[item] += 1;
            if (item in sack.duplicates){
                sack.duplicates[item] += 1;
            } else {
                sack.duplicates[item] = 1;
            }
        }
    });
    return sack
}

function getDuplicateCount(sackSet) {
    return sackSet.reduce((bigSum, sack) => {
        return bigSum + Object.keys(sack.duplicates).reduce((lilsum, c) => {
            return lilsum + charValue(c)
        }, 0);
    }, 0);
}

function isUppercase(letter) { return letter.toUpperCase() === letter }

function intersection(...sets) {
    return [...sets].reduce((a,b) => new Set([...a].filter(x => b.has(x))));
}

function charValue(c) {
    return c.charCodeAt(0) - (isUppercase(c) ? 38 : 96)
}

function getBadgePriority(sackSet) {
    let sum = 0
    for (var i = 0; i < sackSet.length / 3; i++) {
        const group = i * 3
        let overlap = intersection(sackSet[group].itemSet, sackSet[group+1].itemSet, sackSet[group+2].itemSet);
        if (overlap.size > 1) {
            throw new ReferenceError('Elf party had more than one item in common');
        }
        overlap = overlap.values().next().value;
        sum += charValue(overlap)
    }
    return sum
}

export function test() {
    const input = readText('./day3/test.txt');
    input.pop()
    const allSacks = input.map(line => buildSack(line));
    return getBadgePriority(allSacks)

}

export function solve1() {
    const input = readText('./day3/input.txt');
    input.pop()
    const allSacks = input.map(line => buildSack(line));
    return getDuplicateCount(allSacks)
}

export function solve2() {
    const input = readText('./day3/input.txt');
    input.pop()
    const allSacks = input.map(line => buildSack(line));
    return getBadgePriority(allSacks)
}
