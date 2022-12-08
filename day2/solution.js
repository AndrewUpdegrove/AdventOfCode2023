import { readText } from '../utils/parse_input.js';

const move_mapping = {
    'A': 1,
    'B': 2,
    'C': 3,
    'X': 1,
    'Y': 2,
    'Z': 3
};

const outcome_mapping = {
    '0' : 3,
    '-1' : 6,
    '2' : 6,
    '1' : 0,
    '-2' : 0
};

const move_outcome_mapping = {
    'X' : 0,
    'Y' : 3,
    'Z' : 6
};

const some_mapping = {
    '0' : -1,
    '3' : 0,
    '6' : 1,
};

function getGameStats(games) {
    var results = [] // each obj will have opp_move, my_move, outcome, score
    games.forEach(element => {
        const moves = element.split(' ');
        var game = {
            'opp_move' : move_mapping[moves[0]],
            'my_move' : move_mapping[moves[1]],
        }
        game.outcome = outcome_mapping[ game.opp_move - game.my_move ];
        game.score = game.my_move + game.outcome;
        results.push(game);
    });
    return results
}

function getResultStats(games) {
    var results = [];
    games.forEach(element => {
        const moves = element.split(' ');
        var game = {
            'opp_move' : move_mapping[moves[0]],
            'outcome' : move_outcome_mapping[moves[1]],
        }

        game.my_move = game.opp_move + some_mapping[game.outcome]

        if (game.my_move > 3) {
            game.my_move = 1;
        } else if (game.my_move < 1) {
            game.my_move = 3;
        }
        game.score = game.my_move + game.outcome;
        results.push(game);
    });
    return results
}

export function test() {
    var input = readText('./day2/test.txt');
    const results = getGameStats(input);
    return results.reduce( (accumulator, a) => accumulator + a.score, 0);
}

export function solve1() {
    var input = readText('./day2/input.txt');
    const results = getGameStats(input);
    return results.reduce( (accumulator, a) => accumulator + a.score, 0);
}

export function solve2() {
    var input = readText('./day2/input.txt');
    const results = getResultStats(input);
    return results.reduce( (accumulator, a) => accumulator + a.score, 0);
}
