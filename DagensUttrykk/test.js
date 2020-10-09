const TextFileWorker = require('./TextFileWorker');
const worker = new TextFileWorker('liste.json');
let wordList = worker.listOfEntries();
let dateObj = new Date();
dateObj.setHours(0,0,0,0);
let seed = dateObj.getTime();

console.log(dateObj);
console.log(wordList[seededRandom(0, 595)]);


function seededRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    seed = (seed * 9301 + 49297) % 233280;
    let rnd = seed / 233280; 

    return Math.floor(min + rnd * (max - min)); //The maximum is inclusive and the minimum is inclusive 
}