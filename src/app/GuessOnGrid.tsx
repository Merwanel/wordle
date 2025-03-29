import { attributeStatus, range } from "./utils";

export default function GuessOnGrid({guess, answer}: {guess:string, answer?:string}) {
  if (guess.length > 0 && guess.length < 5) {
    guess += ' '.repeat(5 - guess.length)
  }
  else if (guess.length > 5) {
    guess = guess.slice(0, 5) ;
  }
  const checked_guess = attributeStatus(guess, answer) ;
  return (
      <p className="guess">
        {guess.length > 0  && checked_guess.map((check, j) => (
          <span key={j} className={`cell ${check.status}`} >{check.letter}</span> 
        ))}
        {guess.length === 0  && range(0,5).map((j) => (
          <span key={j} className="cell"></span>
        ))}
      </p>
  )
}