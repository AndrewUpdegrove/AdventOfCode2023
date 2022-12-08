import { readText } from '../utils/parse_input.js';
import { strict as assert } from 'node:assert';

function sensifyInput(lines) {
    // split input into the crate starting config and the crane operations
    let start_stack = [...lines]
    let operations_raw = start_stack.splice(lines.findIndex(element => element === ''));
    operations_raw.shift();
    start_stack.reverse();

    // Create n number of LIFO stacks for later use
    const columns= start_stack.shift().trim();
    const stack_count = parseInt(columns.charAt(columns.length-1))
    let stacks = Array.from(Array(stack_count), () => new Array);
    start_stack.forEach( line => {
        for (let i = 0; i < stack_count; i++) {
            if (line[(i * 4) + 1] !== ' ') {
                stacks[i].push(line[(i * 4) + 1])
            }
        }
    });

    // process directions into an array where each element is an array of 3 digits
    const regexp = /\d+/g;
    let operations = operations_raw.map( element => Array.from(element.matchAll(regexp, 'i'), x => parseInt(x[0])));
    return { stacks : stacks, operations : operations }
}

function playCraneGame(input) {
    while ( input.operations.length > 0 ) {
        let cur = input.operations.shift();
        for (let i = 0; i < cur[0]; i++) {
            input.stacks[ cur[2]-1 ].push( input.stacks[ cur[1]-1 ].pop() );
        }
    }
}

function powerLevelOver9000(input) {
    while ( input.operations.length > 0 ) {
        let cur = input.operations.shift();
        input.stacks[ cur[2]-1 ].push( ...input.stacks[ cur[1]-1 ].splice(-1 * cur[0]) ) 
    }
}

export function test() {
    const input = readText('./day5/test.txt');
    let not_bs = sensifyInput(input);
    powerLevelOver9000(not_bs);
    return not_bs.stacks.reduce( 
        (tops, stack) => tops + stack.slice(-1),
        ''
    )
}

export function solve1() {
    const input = readText('./day5/input.txt');
    let not_bs = sensifyInput(input);
    playCraneGame(not_bs);
    return not_bs.stacks.reduce( 
        (tops, stack) => tops + stack.slice(-1),
        ''
    )
}

export function solve2() {
    const input = readText('./day5/input.txt');
    let not_bs = sensifyInput(input);
    powerLevelOver9000(not_bs);
    return not_bs.stacks.reduce( 
        (tops, stack) => tops + stack.slice(-1),
        ''
    )
}
