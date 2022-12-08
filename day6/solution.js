import { readText } from '../utils/parse_input.js';
import { strict as assert } from 'node:assert';


function findFirstMarker(packet) {
    const regex = /(([a-z0-9])(?!\2)([a-z0-9])(?!\2)(?!\3)([a-z0-9])(?!\2)(?!\3)(?!\4)([a-z0-9]))/;
    return packet.match(regex).index + 4
}

function findFirstMessage(packet) {
    let regex = '(';
    for (let i = 0; i < 13; i++) {
        regex += '([a-z0-9])';
        for (let j = 0; j <= i; j++) {
            regex += `(?!\\${j+2})`;
        }
    }
    regex += '([a-z0-9]))';
    return packet.match(new RegExp(regex)).index + 14
}

export function test() {
    const input = readText('./day6/test.txt');
    input.forEach( element => console.log(findFirstMessage(element)));
}

export function solve1() {
    const input = readText('./day6/input.txt');
    return findFirstMarker(input[0]);
}

export function solve2() {
    const input = readText('./day6/input.txt');
    return findFirstMessage(input[0]);
}
