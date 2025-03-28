'use client'

import { JSX, useState } from "react";
import GuessBar from "./GuessBar";
import GuessesList from "./GuessesList";
import { WORDS, checkGuess, sample } from "./utils";

/** Reset the whole game with a new word */
function Reset({setAnswer, setGuesses}:{setAnswer:CallableFunction, setGuesses:CallableFunction}) : JSX.Element {
  return (
  <button 
    className="reset"
    onClick={() => {setAnswer(sample(WORDS)) ; setGuesses([])}}
  > RESET </button>
  )
}

/** Banner to display the game result */
function Banner({has_win, num_guesses, answer}:{has_win:boolean, num_guesses:number, answer:string}) : JSX.Element{
  if (has_win) {return (
  <div className="happy banner">
    <p>
      <strong>Congratulations!</strong> Got it in {' '}
      <strong>{num_guesses}{' '} guesses</strong>.
    </p>
  </div>
  )}
  return (
    <div className="sad banner">
      <p>Sorry, the correct answer was <strong>{answer}</strong>.</p>
    </div>
    )
}

const initGuesses:string[] = [] ;
function App() {
  const [guesses, setGuesses] = useState(initGuesses) ;
  const [guess, setGuess] = useState("") ;
  const [answer, setAnswer] = useState(sample(WORDS)) ;
  

  const last_guess = guesses.length > 0 ? checkGuess(guesses[guesses.length - 1] , answer) : [{status:''}] ;
  const has_win = last_guess.every(({status}) => status === 'correct') ;
  const game_has_ended = has_win || guesses.length === 5  ;
  return (
    <>
      <Reset setAnswer={setAnswer} setGuesses={setGuesses}/>
      {game_has_ended && <Banner has_win={has_win} num_guesses={guesses.length} answer={answer} />} { /* winning banner */}
      <GuessesList answer={answer} guess={guess} guesses={guesses} />
      {!game_has_ended && <GuessBar answer={answer} guess={guess} setGuess={setGuess} guesses={guesses} setGuesses={setGuesses} />}
    </>
  );
}

export default App;
