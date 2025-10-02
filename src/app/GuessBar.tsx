import { useEffect, useRef } from "react";
import PopUp from "./PopUp";
import { attributeStatus } from "./utils";

export default function GuessBar({answer, guess, setGuess, guesses, setGuesses}:{answer:string, guess:string, setGuess:React.Dispatch<React.SetStateAction<string>>, guesses:string[], setGuesses:React.Dispatch<React.SetStateAction<string[]>>}) {
  const GuessBarRef = useRef<HTMLInputElement|null>(null) ;
  const printPopup = guess.length != 5 ;
  
  useEffect(() => {
    function handleFocusIfKeyDown() {
      GuessBarRef.current?.focus()
    }
    window.addEventListener('keydown', handleFocusIfKeyDown);
    return () => window.removeEventListener('keydown', handleFocusIfKeyDown);
  }, [])

  function handleSubmit(event:React.FormEvent<HTMLFormElement>) : void {
    event.preventDefault() ; 
    if(guess.length == 5) {
      setGuesses([...guesses, guess])
      setGuess("") ;
    }
  }
  return (
    <>
      <form className="guess-input-wrapper" onSubmit={handleSubmit}>
        <div style={{display:"flex"}}>
          <label htmlFor="guess-input">Enter guess:</label>
          {printPopup && <PopUp message="The guess has to be exactly 5 words long" />}
        </div>
        <input ref={GuessBarRef} id="guess-input" type="text" value={guess} onChange={event => setGuess(event.target.value.trim().toUpperCase())}/>
      </form>
      <Keyboard answer={answer} setGuess={setGuess} guesses={guesses} handleSubmit={handleSubmit}/>
    </>
  );
}


function Keyboard({answer, setGuess, guesses, handleSubmit} : {answer:string, setGuess:React.Dispatch<React.SetStateAction<string>>, guesses:string[], handleSubmit:(event:React.FormEvent<HTMLFormElement>) => void}) {

  const keys_line1 = ['Q','W','E','R','T','Y','U','I','O','P'];
  const keys_line2 = ['A','S','D','F','G','H','J','K','L'];
  const keys_line3 = ['Z','X','C','V','B','N','M'];

  const letter_status : Map<string,string> = new Map()
  guesses.forEach((guess) => (
    attributeStatus(guess, answer).map(({letter, status}) => {
      const old_status = letter_status.has(letter) ? letter_status.get(letter) : "" ;
      if(old_status === "") {letter_status.set(letter, status) ;}
      else if(old_status === "misplaced" &&  status === "correct" ) {letter_status.set(letter, status) ;}
    })
  ))
  return (
  <form onSubmit={handleSubmit}>
    <div key={1} className="keyboard">
      {keys_line1.map((letter, i) => (
      <span key={i} 
        className={"letter_key " + (letter_status.has(letter) ? letter_status.get(letter) : "")} 
        onClick={() => setGuess(guess => guess + letter.toUpperCase())} >{letter}</span>
      ))}
    </div>
    <div key={2} className="keyboard">
      {keys_line2.map((letter, i) => (
      <span key={i} 
        className={"letter_key " + (letter_status.has(letter) ? letter_status.get(letter) : "")} 
        onClick={() => setGuess(guess => guess + letter.toUpperCase())} >{letter}</span>
      ))}
    </div>
    <div key={3} className="keyboard">
      {
        // ↵ enter button
        <button key={-1} 
        className={"letter_key "} 
         >{"\u21B5"}</button>
      }
      {keys_line3.map((letter, i) => (
      <span key={i} 
        className={"letter_key " + (letter_status.has(letter) ? letter_status.get(letter) : "")} 
        onClick={() => setGuess(guess => guess + letter.toUpperCase())} >{letter}</span>
      ))}
      {
        // ⇦ delete button
        <span key={keys_line3.length} 
        className={"letter_key "} 
        onClick={() => setGuess(guess => guess.slice(0, guess.length-1))} >{"\u21E6"}</span>
      }
    </div>
  </form>)
}