import { readText } from '../utils/parse_input.js';
import { strict as assert } from 'node:assert';

var MAX_16BIT_SIGNED = 32767;

function getKey(x, y) {
  if (x > MAX_16BIT_SIGNED || y > MAX_16BIT_SIGNED)
    throw "Invalid X or Y value.";
  x += MAX_16BIT_SIGNED;
  y += MAX_16BIT_SIGNED;
  return (x << 16) | y;
}

function getX(key) {
  return (key >> 16) - MAX_16BIT_SIGNED;
}

function getY(key) {
  return (key & 0xFFFF) - MAX_16BIT_SIGNED;
}

// performs callback func on keys frm obj1 that
// are also present in obj2 usng the callback func
function objOnObj(obj1, obj2, callback) {
    let obj3 = {}
    Object.keys(obj1).forEach( elem => {
        if (elem in obj2) {
            obj3[elem] = callback(obj1[elem],obj2[elem]);
        }
    });
    return obj3
}

const head_dir_to_int = {
    'R' : { x : 1, y : 0 },
    'L' : { x : -1, y : 0 },
    'U' : { x : 0, y : 1 },
    'D' : { x : 0, y : -1 }
}

const follow_diff_mapping = {
    '-2' : {
        '1' : {x : -1, y : 1 },
        '0' : {x : -1, y : 0 },
        '-1' : {x : -1, y : -1},
        '-2' : {x : -1, y : -1},
        '2' : {x : -1, y : 1}
    },
    '-1' : {
        '2' : {x : -1, y : 1},
        '-2' : {x : -1, y : -1}
    },
    '0' : {
        '2' : {x : 0, y : 1},
        '-2' : {x : 0, y: -1}
    },
    '1' : {
        '2' : {x : 1, y : 1},
        '-2' : {x : 1, y : -1}
    },
    '2' : {
        '1' : {x : 1, y : 1 },
        '0' : {x : 1, y : 0},
        '-1' : {x : 1, y : -1},
        '2' : {x : 1, y : 1},
        '-2' : {x : 1, y : -1}
    }
};

function adjustLinks(lead, follow) {
    assert(lead !== undefined);
    assert(follow !== undefined);
    let follow_diff = objOnObj(lead, follow, (a, b) => a - b)
    let follow_move = follow_diff_mapping[follow_diff.x][follow_diff.y]
    let ret_val;
    if (follow_move === undefined) {
        follow_move = { x : 0, y : 0 }
        ret_val = false
    } else { ret_val = true }
    let int = objOnObj(follow, follow_move, (a,b) => a + b)
    follow.x = int.x; follow.y = int.y;
    return ret_val
}


function pullHead(directions, num_links) {
    let links = [];
    let tail_locations = []
    for (let i = 0; i < num_links; i++){ links.push({ x: 0, y: 0}); }
    directions.forEach(elem => {
        let [dir, count] = elem.split(' ');
        count = parseInt(count);
        let head_to_go = head_dir_to_int[dir];
        for ( let i = 0; i < count; i++) {
            links[0] = objOnObj(links[0], head_to_go, (a,b) => a + b)
            for (let j = 0; j < links.length-1; j++) {
                let thing = adjustLinks(links[j], links[j+1])
                console.log(links)
                console.log('thing: ' + thing)
                if(!thing) { break; }
            }
            if (!tail_locations.includes(getKey(links[links.length-1].x, links[links.length-1].y))) {
                tail_locations.push(getKey(links[links.length-1].x, links[links.length-1].y))
            }
        }
    });
    return tail_locations
}

export function test() {
    const input = readText('./day9/test2.txt');
    const out = pullHead(input, 10)
    return Object.keys(out).length
}

export function solve1() {
    const input = readText('./day9/input.txt');
    const out = pullHead(input, 2)
    return Object.keys(out).length
}

export function solve2() {
    const input = readText('./day9/input.txt');
    const out = pullHead(input, 10)
    return Object.keys(out).length
}
