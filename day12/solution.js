import { readText } from '../utils/parse_input.js';
import { strict as assert } from 'node:assert';
import cytoscape from 'cytoscape';


function isTraversable(dest, source) {
    if (source == 'E') {
        return true
    } else if (source == 'S') {
        return ['a','b'].includes(dest)
    }

    if (dest == 'E') {
        return ['y', 'z'].includes(source)
    } else if (source == 'S') {
        return true
    }

    return dest.charCodeAt(0) - 1 <= source.charCodeAt(0)
}

function loadUpGraph(garbo) { 
    let input = garbo.map(arr => arr.slice());
    let start; 
    let end;
    let cy = cytoscape();
    let counter = 0;
    for (let y = 0; y < input.length; y++) {
        for (let x = 0; x < input[y].length; x++) {
            if (input[y][x] == 'S') {
                start = { x : x, y : y}
            } else if (input[y][x] == 'E') {
                end = { x : x, y : y}
            }
            cy.add({group: 'nodes', data: { id : `${x},${y}`, height : input[y][x] }, position: { x: x, y: y } })
        }
    }

    for (let y = 0; y < input.length; y++) {
        for (let x = 0; x < input[y].length; x++) {
            if (input[y][x] == 'S') {
                start = { x : x, y : y}
            } else if (input[y][x] == 'E') {
                end = { x : x, y : y}
            }
            let up = y - 1 >= 0 ? y - 1 : null;
            let down = y + 1 < input.length ? y + 1 : null;
            let left = x - 1 >= 0 ? x - 1 : null;
            let right = x + 1 < input[y].length ? x + 1 : null;
            let to_add = []
            if (up != null && isTraversable(input[up][x], input[y][x]) ) {
                to_add.push({group: 'edges', data: { id: `e${counter}`, source : `${x},${y}`, target: `${x},${up}`} });
                counter ++
            }
            if (down != null && isTraversable(input[down][x], input[y][x])) {
                to_add.push({group: 'edges', data: { id: `e${counter}`, source: `${x},${y}`, target: `${x},${down}`} });
                counter ++
            }
            if (right != null && isTraversable(input[y][right], input[y][x])) {
                to_add.push({group: 'edges', data: { id: `e${counter}`, source: `${x},${y}`, target: `${right},${y}`} });
                counter ++
            }
            if (left != null && isTraversable(input[y][left], input[y][x])) {
                to_add.push({group: 'edges', data: { id: `e${counter}`, source: `${x},${y}`, target: `${left},${y}`} });
                counter ++
            }
            cy.add(to_add)
        }
    }
    return { graph : cy, start : start, end : end } 
}

function reverseGraph(graph) {
    let edges = graph.edges()
    let counter = 0;
    edges.forEach( edge => {
        graph.add({group: 'edges', data: { id: `r${counter}`, source: edge.target().id(), target: edge.source().id()} });
        counter++;
    });
    graph.remove(edges);
}

export function test() {
    const input = readText('./day12/test.txt');
    let some_garbo = loadUpGraph(input)
    let graph = some_garbo.graph
    reverseGraph(graph)
    let dijkstra = graph.elements().dijkstra(graph.$id(`${some_garbo.end.x},${some_garbo.end.y}`), a => 1, true)
    let shortest = Infinity
    let low_points = graph.nodes('[height = "a"]')
    low_points.forEach(p => {
        let dist = dijkstra.distanceTo(p)
        if (dist < shortest) shortest = dist
    });
    return shortest
}

export function solve1() {
    const input = readText('./day12/input.txt');
    let some_garbo = loadUpGraph(input)
    let graph = some_garbo.graph
    let dijkstra = graph.elements().dijkstra(graph.$id(`${some_garbo.start.x},${some_garbo.start.y}`), a => 1, true)
    return dijkstra.distanceTo(graph.$id(`${some_garbo.end.x},${some_garbo.end.y}`))
}

export function solve2() {
    const input = readText('./day12/input.txt');
    let some_garbo = loadUpGraph(input)
    let graph = some_garbo.graph
    reverseGraph(graph)
    let dijkstra = graph.elements().dijkstra(graph.$id(`${some_garbo.end.x},${some_garbo.end.y}`), a => 1, true)
    let shortest = Infinity
    let low_points = graph.nodes('[height = "a"]')
    low_points.forEach(p => {
        let dist = dijkstra.distanceTo(p)
        if (dist < shortest) shortest = dist
    });
    return shortest
}
