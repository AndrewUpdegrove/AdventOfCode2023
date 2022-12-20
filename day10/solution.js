import { readText } from '../utils/parse_input.js';
import { strict as assert } from 'node:assert';

// cycle is # of completed cycles
function intializeSystem() { return { register : 1, cycle : 1 } }
class System {
    constructor(){
        this.register = 1;
        this.cycle = 1;
        this.screen_width = 40;
    }

    get signalStrength() {
        return this.calcSignal();
    }

    calcSignal() {
        return this.register * this.cycle;
    }
    
    addX(x, counter) {
        if (counter === 2) {
            this.register += x
            return true
        } else if (counter === 1) {
            return false
        } else {
            throw new Error('The addX operation only supports a two cycle interval');
        }
    }

    noop(emptiness, counter) {
        if (counter !== 1) throw new Error('Somehow you messed up a noop. Congrats!');
        return true
    }

    evaluate(instruction, value, counter) {
        if(instruction === 'addx') return this.addX(value, counter)
        else if (instruction === 'noop') return this.noop(value,counter)
        else throw new Error(`Instruction ${instruction} is not supported for this system.`)
    }

    draw() {
        let modulo = (this.cycle-1) % this.screen_width
        if (modulo >= this.register-1 && modulo <= this.register+1){
            process.stdout.write('#')
        } else {
            process.stdout.write('.')
        }
        if(modulo === 39) {
            process.stdout.write('\n')
        }
    }
}

// signaCheck is a callback function that is evaluated to
// decide if a measurement should be output during the cycle
function interpretInstructions(input, sys, signalCheck) {
    let counter = 0;
    let instruction_register = null;
    let value_register = null;
    let evaluations = [];
    do {
        if(instruction_register === null){
            [instruction_register, value_register] = input.shift().split(' ')
            if(value_register !== undefined) value_register = parseInt(value_register)
        }
        if(signalCheck(sys.cycle)) {
            evaluations.push(sys.calcSignal())
        }
        sys.draw()
        sys.cycle++; counter++;
        if(sys.evaluate(instruction_register, value_register, counter)) {
            instruction_register = null; value_register = null;
            counter = 0;
        }
    } while(input.length > 0 || instruction_register !== null)
    return evaluations
}

export function test() {
    const input = readText('./day10/test.txt');
    let system = new System();
    return interpretInstructions(input, system, (a) => false)
}

export function solve1() {
    const input = readText('./day10/input.txt');
    let system = new System();
    return interpretInstructions(input, system, a => (a - 20) % 40 === 0 && a <= 220).reduce( (sum, cur) => sum + cur, 0)
}

export function solve2() {
    const input = readText('./day10/input.txt');
    let system = new System();
    return interpretInstructions(input, system, (a) => false)
}
