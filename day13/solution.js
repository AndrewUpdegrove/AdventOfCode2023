import { readText } from '../utils/parse_input.js';
import { strict as assert } from 'node:assert';

function inOrder(og1, og2) {
    let p1 = og1.slice()
    let p2 = og2.slice()
    let ordered;
    while(p1.length > 0 && p2.length > 0){
        let comp1 = p1.shift()
        let comp2 = p2.shift()
        parseInt(comp1,10) && (comp1 = parseInt(comp1,10))
        parseInt(comp2,10) && (comp2 = parseInt(comp2,10))
        if (comp1 === comp2) { 
            continue;
        } else if (comp1 === ']') {
            ordered = true;
            break;
        } else if (comp2 === ']') {
            ordered = false;
            break;
        } else if (comp2 === '[') {
            p1.unshift(comp1, ']')
        } else if (comp1 === '[') {
            p2.unshift(comp2, ']')
        } else if (comp1 < comp2) {
            ordered = true;
            break;
        } else if (comp2 < comp1) {
            ordered = false;
            break;
        }
    }
    if (ordered === undefined) throw new Error('Uh oh, the packets are the same?')
    return ordered
}


function parsePackets(input) {
    let right_order_pairs = []
    for (let i = 0; i < input.length; i += 3) {
        let p1 = preparePacket(input[i])
        let p2 = preparePacket(input[i+1])
        if (inOrder(p1,p2)) {
            right_order_pairs.push(Math.floor(i/3)+1)
        }
    }

    return right_order_pairs.reduce((acc,cur) => acc+cur,0)
}

function preparePacket(p) {
    return [...p.matchAll(/[\[\]]|\d+/g)].map(e => e[0])
}

function arrayEquals(a, b) {
    return Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index]);
}

export function test() {
    let input = readText('./day13/test.txt');
    input.push('[[2]]','[[6]]')
    let useable = [];
    input.forEach(l => {
        if (l != '') {
            useable.push(preparePacket(l))
        }
    });
    useable.sort((p1,p2) => {
        if (inOrder(p1,p2)) return -1
        else return 1
    });
    return (useable.findIndex(i => arrayEquals(i, ['[','[','2',']',']'])) + 1 ) * (useable.findIndex(i => arrayEquals(i, ['[','[','6',']',']'])) + 1 )
}

export function solve1() {
    const input = readText('./day13/input.txt');
    return parsePackets(input)
}

export function solve2() {
    let input = readText('./day13/input.txt');
    input.push('[[2]]','[[6]]')
    let useable = [];
    input.forEach(l => {
        if (l != '') {
            useable.push(preparePacket(l))
        }
    });
    useable.sort((p1,p2) => {
        if (inOrder(p1,p2)) return -1
        else return 1
    });
    return (useable.findIndex(i => arrayEquals(i, ['[','[','2',']',']'])) + 1 ) * (useable.findIndex(i => arrayEquals(i, ['[','[','6',']',']'])) + 1 )
}
