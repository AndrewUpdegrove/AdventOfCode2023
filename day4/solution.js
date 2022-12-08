import { readText } from '../utils/parse_input.js';
import { strict as assert } from 'node:assert';

function findContaining(pairings) {
    let count = 0;
    pairings.forEach(pair => {
        const limits = pair.split(new RegExp('[,-]','i'));
        assert(limits.length === 4)
        const lower_comp = limits[0] - limits[2];
        const upper_comp = limits[1] - limits[3];
        if (lower_comp * upper_comp <= 0) { count++ }
    });
    return count
}

function findOverlap(pairings) {
    let count = 0
    pairings.forEach(pair => {
        const limits = pair.split(new RegExp('[,-]','i'));
        assert(limits.length === 4)
        const inside = limits[1] - limits[2];
        const outside = limits[0] - limits[3];
        if (inside * outside <= 0) { count ++ }
    });
    return count
}

export function test() {
    const input = readText('./day4/test.txt');
    return findOverlap(input)
}

export function solve1() {
    const input = readText('./day4/input.txt');
    return findContaining(input)
}

export function solve2() {
    const input = readText('./day4/input.txt');
    return findOverlap(input)
}
