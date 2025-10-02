import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { useState } from 'react';
import GuessBar from '@/app/GuessBar';

function TestWrapper({ answer = 'WORLD', initialGuess = '', initialGuesses = [] }: {
    answer?: string
    initialGuess?: string
    initialGuesses?: string[]
}) {
    const [guess, setGuess] = useState(initialGuess);
    const [guesses, setGuesses] = useState<string[]>(initialGuesses);

    return (
        <div>
            <GuessBar
                answer={answer}
                guess={guess}
                setGuess={setGuess}
                guesses={guesses}
                setGuesses={setGuesses}
            />
            <div data-testid="guesses-count">{guesses.length}</div>
        </div>
    );
}

describe('GuessBar', () => {
    it('should render the input field with correct label', () => {
        render(<TestWrapper />);

        expect(screen.getByLabelText('Enter guess:')).toBeInTheDocument();
        expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('should display popup when guess is not 5 characters', () => {
        render(<TestWrapper initialGuess="ABC" />);

        expect(screen.getByText('The guess has to be exactly 5 words long')).toBeInTheDocument();
    });

    it('should not display popup when guess is exactly 5 characters', () => {
        render(<TestWrapper initialGuess="WORLD" />);

        expect(screen.queryByText('The guess has to be exactly 5 words long')).not.toBeInTheDocument();
    });

    it('should update input value when typing', () => {
        render(<TestWrapper />);

        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 'hello' } });

        expect(input).toHaveValue('HELLO');
    });

    it('should convert input to uppercase and trim whitespace', () => {
        render(<TestWrapper />);

        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: ' world ' } });

        expect(input).toHaveValue('WORLD');
    });

    it('should render all keyboard letters', () => {
        render(<TestWrapper />);

        const keyboardContainers = document.querySelectorAll('.keyboard');
        expect(keyboardContainers).toHaveLength(3);

        for (let i = "A".charCodeAt(0); i <= "Z".charCodeAt(0); i++) {
            const letter = String.fromCharCode(i);
            const letterElement = screen.getByText(letter);
            expect(letterElement).toBeInTheDocument();
            expect(letterElement).toHaveClass('letter_key');
        }
    });

    it('should render the keyboard letters with best status correct > misplaced > incorrect', () => {
        render(<TestWrapper answer='FLICK' initialGuesses={[]} />);
        const form = document.querySelector('.guess-input-wrapper');
        const input = screen.getByRole('textbox');

        for (let i = "A".charCodeAt(0); i <= "Z".charCodeAt(0); i++) {
            const letter = String.fromCharCode(i);
            const letterElement = screen.getByText(letter);
            expect(letterElement).not.toHaveClass('correct');
            expect(letterElement).not.toHaveClass('misplaced');
            expect(letterElement).not.toHaveClass('incorrect');
        }

        fireEvent.change(input, { target: { value: 'FIRST' } });
        fireEvent.submit(form!);
        expect(screen.getByText("F")).toHaveClass('correct');
        expect(screen.getByText("I")).toHaveClass('misplaced');
        expect(screen.getByText("R")).toHaveClass('incorrect');
        expect(screen.getByText("S")).toHaveClass('incorrect');
        expect(screen.getByText("T")).toHaveClass('incorrect');

        fireEvent.change(input, { target: { value: 'BLITZ' } });
        fireEvent.submit(form!);
        expect(screen.getByText("B")).toHaveClass('incorrect');
        expect(screen.getByText("L")).toHaveClass('correct');
        expect(screen.getByText("I")).toHaveClass('correct');
        expect(screen.getByText("T")).toHaveClass('incorrect');
        expect(screen.getByText("Z")).toHaveClass('incorrect');
    });

    it('should add letter to guess when keyboard letter is clicked', () => {
        render(<TestWrapper />);

        const input = screen.getByRole('textbox');
        const letterW = screen.getByText('W');

        fireEvent.click(letterW);

        expect(input).toHaveValue('W');
    });

    it('should remove last character when delete button is clicked', () => {
        render(<TestWrapper initialGuess="WORLD" />);

        const input = screen.getByRole('textbox');
        const deleteButton = screen.getByText('⇦');

        fireEvent.click(deleteButton);

        expect(input).toHaveValue('WORL');
    });

    it('should submit guess when form is submitted with 5-character guess', () => {
        render(<TestWrapper answer="WORLD" initialGuess="AGENT" />);

        const form = document.querySelector('.guess-input-wrapper');
        const guessesCount = screen.getByTestId('guesses-count');

        expect(guessesCount).toHaveTextContent('0');

        fireEvent.submit(form!);

        expect(guessesCount).toHaveTextContent('1');
    });

    it('should not submit guess when form is submitted with less than 5 characters', () => {
        render(<TestWrapper answer="WORLD" initialGuess="ABC" />);

        const form = document.querySelector('.guess-input-wrapper');
        const guessesCount = screen.getByTestId('guesses-count');

        expect(guessesCount).toHaveTextContent('0');

        fireEvent.submit(form!);

        expect(guessesCount).toHaveTextContent('0');
    });

    it('should clear input after successful submission', () => {
        render(<TestWrapper answer="TESTS" initialGuess="WORLD" />);

        const form = document.querySelector('.guess-input-wrapper');
        const input = screen.getByRole('textbox');

        expect(input).toHaveValue('WORLD');

        fireEvent.submit(form!);

        expect(input).toHaveValue('');
    });

    it('should apply correct CSS classes to keyboard letters based on guess history', () => {
        render(<TestWrapper answer="WORLD" initialGuesses={['AGENT']} />);

        const letterA = screen.getByText('A');
        expect(letterA).toHaveClass('letter_key incorrect');

        const letterW = screen.getByText('W');
        expect(letterW).toHaveClass('letter_key');
        expect(letterW).not.toHaveClass('correct');
        expect(letterW).not.toHaveClass('incorrect');
        expect(letterW).not.toHaveClass('misplaced');
    });

    it('should focus input when any key is pressed', () => {
        render(<TestWrapper />);

        const input = screen.getByRole('textbox');

        fireEvent.keyDown(window, { key: 'a' });

        expect(input).toHaveFocus();
    });

    it('should have its keyboard letters working', () => {
        render(<TestWrapper />);

        const input = screen.getByRole('textbox');

        // 1st row
        const letterQ = screen.getByText('Q');
        fireEvent.click(letterQ);
        expect(input).toHaveValue('Q');

        // 2nd row
        const letterA = screen.getByText('A');
        fireEvent.click(letterA);
        expect(input).toHaveValue('QA');

        const return_button = screen.getByText('⇦');
        fireEvent.click(return_button);
        expect(input).toHaveValue('Q');

        // 3rd row 
        const letterZ = screen.getByText('Z');
        fireEvent.click(letterZ);
        expect(input).toHaveValue('QZ');
    });
});