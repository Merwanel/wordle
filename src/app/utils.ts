/** similar to python's range */
export const range = (start:number, end:number, step = 1) : number[] => {
  const output:number[] = [];
  if (typeof end === "undefined") {
    end = start;
    start = 0;
  }
  for (let i = start; i < end; i += step) {
    output.push(i);
  }
  return output;
};

/** attribute a status ['correct'|'misplaced'|'incorrect'] to each letter in a guess */
export function checkGuess(guess:string, answer:string="") : {letter:string,status:string}[] {
  const res = [] ; 
  const answer_set = new Set(answer) ;

  for (let i = 0; i < guess.length; i++) {
    let status = 'incorrect';
    if(guess[i] === answer[i]) {status='correct';}
    else if (answer_set.has(guess[i])) {status='misplaced';}
    res.push({
      letter: guess[i],
      status,
    })
  }
  return res;
}

export const sample = (arr:string[]) : string => {
  return arr[Math.floor(Math.random() * arr.length)];
};
export const WORDS = [
  'AGENT',
  'WORLD',
  'ABOUT',
  'HEART',
  'WATER',
  'SIXTY',
  'BOARD',
  'MONTH',
  'MUSIC',
  'PARTY',
  'PIANO',
  'MOUTH',
  'WOMAN',
  'SUGAR',
  'AMBER',
  'DREAM',
  'LAUGH',
  'TIGER',
  'EARTH',
  'MONEY',
  'WORDS',
  'SMILE',
  'LEMON',
  'SOUTH',
  'AFTER',
  'STONE',
  'THING',
  'LIGHT',
  'STORY',
  'POWER',
  'TODAY',
  'RANGE',
  'PEARL',
  'VENOM',
  'PROXY',
  'ROUND',
  'HOVER',
  'CANDY',
  'ABOVE',
  'PHONE',
  'OTHER',
  'SMART',
  'BLACK',
  'MAGIC',
  'FRUIT',
  'RADIO',
  'ROYAL',
  'HONEY',
  'FLAKE',
  'SOUND',
];
