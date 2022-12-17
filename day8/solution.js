import { readText } from '../utils/parse_input.js';
import { strict as assert } from 'node:assert';

function rotate(matrix) { return matrix[0].map((val, index) => matrix.map(row => row[index]).reverse()) }
function convertToMatrix(lines) { return lines.map(str => [...str].map(x => parseInt(x))) } 
function sumMatrix(matrix) { return matrix.flat().reduce((sum,cur) => sum + cur, 0) }
function maxMatrix(matrix) { return Math.max(...matrix.flat()) }

function markVisibilityLeft(vals, bools) {
    assert(vals.length === bools.length)
    for (let j = 0; j < vals.length; j++) {
        let leftMax = -1;
        for (let i = 0; i < vals[j].length; i++) {
            if (vals[j][i] > leftMax) {
                bools[j][i] |= true;
                leftMax = vals[j][i];
            }
        }
    }
}

function multiplyVisibilityLeft(heights, scores) {
    assert(heights.length === scores.length)
    for (let j = 0; j < heights.length; j++) {
        for (let i = 0; i < heights[j].length; i++) {
            if (i === 0) { scores[j][i] *= 0; continue}
            let inc = 1;
            while (heights[j][i-inc] < heights[j][i] && i - (inc+1) >= 0 ) {inc++}
            scores[j][i] *= inc
        }
    }
}

function countVisibility(height_matrix) {
    let bool_matrix = Array(height_matrix.length).fill().map(() => Array(height_matrix[0].length).fill(0));
    markVisibilityLeft(height_matrix, bool_matrix)
    for (let i = 0; i < 3; i++) {
        height_matrix = rotate(height_matrix)
        bool_matrix = rotate(bool_matrix)
        markVisibilityLeft(height_matrix, bool_matrix)
    }
    return sumMatrix(bool_matrix)
}

function calcVisibilityScore(height_matrix) {
    let score_matrix = Array(height_matrix.length).fill().map(() => Array(height_matrix[0].length).fill(1));
    multiplyVisibilityLeft(height_matrix, score_matrix)
    for (let i = 0; i < 3; i++) {
        height_matrix = rotate(height_matrix)
        score_matrix = rotate(score_matrix)
        multiplyVisibilityLeft(height_matrix, score_matrix)
    }
    return maxMatrix(score_matrix)

}

export function test() {
    const input = readText('./day8/test2.txt');
    const matrix = convertToMatrix(input);
    return calcVisibilityScore(matrix)
}

export function solve1() {
    const input = readText('./day8/input.txt');
    const matrix = convertToMatrix(input);
    return countVisibility(matrix)
}

export function solve2() {
    const input = readText('./day8/input.txt');
    const matrix = convertToMatrix(input);
    return calcVisibilityScore(matrix)
}
