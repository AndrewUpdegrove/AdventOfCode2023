import { readText } from '../utils/parse_input.js';
import { strict as assert } from 'node:assert';
function getDirSizes(cmds) {
    let all_dirs = [];
    let dir_stack = [];
    cmds.forEach(line => {
        const things = line.split(' ');
        const size = parseInt(things[0])
        if (!isNaN(size)) {
            dir_stack.forEach((x, i) => dir_stack[i] += size);
        } else if (things[1] == 'cd' && things[2] == '..') {
            all_dirs.push(dir_stack.pop())
        } else if (things[1] == 'cd') {
            dir_stack.push(0)
        }
    });
    return all_dirs.concat(dir_stack)
}

export function test() {
    const input = readText('./day7/test.txt');
    const dirs = getDirSizes(input);
    const to_delete = Math.max(...dirs)  - 40000000;
    assert(to_delete > 0)
    return dirs.reduce( (min, curr) => {
        if (curr >= to_delete && curr <= min) {
            return curr
        } else {
            return min
        }
    }, Infinity)
}

export function solve1() {
    const input = readText('./day7/input.txt');
    const dirs = getDirSizes(input);
    return dirs.reduce( (acc, curr) => {
        if (curr <= 100000) return acc + curr
        else return acc
    })
}

export function solve2() {
    const input = readText('./day7/input.txt');
    const dirs = getDirSizes(input);
    const to_delete = Math.max(...dirs)  - 40000000;
    assert(to_delete > 0)
    return dirs.reduce( (min, curr) => {
        if (curr >= to_delete && curr <= min) {
            return curr
        } else {
            return min
        }
    }, Infinity)
}
