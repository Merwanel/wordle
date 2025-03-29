import { JSX } from "react";
import GuessOnGrid from "./GuessOnGrid";
import { range } from "./utils";

/** put the guesses on the grid */
export default function GuessesList({guess, guesses, answer}: {guess:string, guesses:string[], answer:string}) : JSX.Element{
  const nb_empty = 5 - 1 - guesses.length;
  return (
    <div className="guess-results">
      {guesses.map((guess, i) => (
        <GuessOnGrid key={i} guess={guess} answer={answer}/>
      ))}
      { guesses.length < 5 && <GuessOnGrid key={guesses.length} guess={guess}/>}
      {range(0, nb_empty).map(i => (
        <GuessOnGrid key={i + 1 + guesses.length} guess={""}/>
      ))}
    </div>
  )
}