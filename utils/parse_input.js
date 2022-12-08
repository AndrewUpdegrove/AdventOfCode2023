import { readFileSync } from 'fs';

export function readText(filename) {
    console.log('Reading input from ' + filename);
    const contents = readFileSync(filename, 'utf-8');
    const arr = contents. split(/\r?\n/);
    arr.pop();
    return arr;
}
