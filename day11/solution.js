import { readText } from '../utils/parse_input.js';
import { strict as assert } from 'node:assert';

class MonkeyInTheMiddle {
    constructor() {
        this.monkeys = []
        this.round = 0 // rounds complete
        this.lcm;
    }

    static intializeGame(game, input){
        while(input.length > 0) {
            const new_monkey_set = input.splice(0, 7)
            game.monkeys.push(new Monkey(
                [...new_monkey_set[1].matchAll(/(\d+)/g)].map(a => parseInt(a[0])),
                new_monkey_set[2].split(' ').slice(6),
                parseInt(new_monkey_set[3].replace(/[^\d.]/g, '')),
                parseInt(new_monkey_set[4].replace(/[^\d.]/g, '')),
                parseInt(new_monkey_set[5].replace(/[^\d.]/g, ''))
            ));
        }

        this.lcm = game.monkeys.reduce((acc, x) => acc * x.ditch_divisor, 1)
    }

    static takeTurn(game, monkey) {
        while (monkey.items.length > 0) {
            let action = monkey.inspectItem();
            game.monkeys[action.recipient].catchItem(action.item % this.lcm)
        }
    }

    playinRounds(n) {
        for(let i = 0; i < n; i++){
            this.monkeys.forEach( monkey => {
                MonkeyInTheMiddle.takeTurn(this, monkey)
            })
            this.round++;
        }
        if(this.round !== n) throw new Error('Something happened and the correct number of rounds was not played')
    }

    get monkeyBusiness() {
        let sort_monk_list = this.monkeys.map( (monk, i) => {
            return { monkey_num : i, items_inspected : monk.items_inspected }
        }).sort((a, b) => b.items_inspected - a.items_inspected)
        return { 
            business_val : sort_monk_list[0].items_inspected * sort_monk_list[1].items_inspected,
            monkeys : [sort_monk_list[0].monkey_num, sort_monk_list[1].monkey_num]
        }
    }
}

class Monkey {
    constructor(initialItems, worry_func, ditch, recip1, recip2) {
        this.items = initialItems;
        this.worry_manip = worry_func;
        this.ditch_divisor = ditch;
        this.items_inspected = 0;
        this.true_recipient = recip1;
        this.false_recipient = recip2
    }

    static relief(x) {
        return x 
        //return Math.floor(x / 3)
    }

    inspectItem() {
        this.manipulateWorry()
        this.items_inspected++
        return { 
            recipient: this.evaluateHumanWorryLevel(),
            item: this.throwItem()
        }
    }

    evaluateHumanWorryLevel() {
        if(this.items.length === 0) {
            throw new Error('Human cannot be upset for I, a simple innocent monkey, have no items')
        }
        return this.items[0] % this.ditch_divisor === 0 ? this.true_recipient : this.false_recipient
    }

    manipulateWorry() {
        if (this.worry_manip[0] === '*') {
            if(this.worry_manip[1] === 'old') this.items[0] = Math.pow(this.items[0], 2)
            else this.items[0] *= parseInt(this.worry_manip[1])
        } else if (this.worry_manip[0] === '+') {
            this.items[0] += parseInt(this.worry_manip[1])
        } else throw new Error(`Operation ${this.worry_manip[0]} is not supported`)

        this.items[0] = Monkey.relief(this.items[0])
    }

    throwItem() {
        return this.items.shift()
    }

    catchItem(item_val) {
        this.items.push(item_val)
    }
}

export function test() {
    const input = readText('./day11/test.txt');
    let game = new MonkeyInTheMiddle()
    MonkeyInTheMiddle.intializeGame(game, input);
    game.playinRounds(10000)
    return game.monkeys
}

export function solve1() {
    const input = readText('./day11/input.txt');
    let game = new MonkeyInTheMiddle()
    MonkeyInTheMiddle.intializeGame(game, input);
    game.playinRounds(20)
    return game.monkeyBusiness
}

export function solve2() {
    const input = readText('./day11/input.txt');
    let game = new MonkeyInTheMiddle()
    MonkeyInTheMiddle.intializeGame(game, input);
    game.playinRounds(10000)
    return game.monkeyBusiness
}
