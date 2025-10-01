import App from '@/app/App';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';

jest.mock('../src/app/utils', () => ({
    ...jest.requireActual('../src/app/utils'),
    sample: jest.fn(() => "TESTS"),
}));

import { sample } from '../src/app/utils';
const mockedSample = sample as jest.MockedFunction<typeof sample>;

function writeAndSubmit(text: string) {
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: text } });
    fireEvent.submit(input.closest('form')!);
}

describe('App', () => {
    beforeEach(() => {
        mockedSample.mockClear();
    });

    it('should display the winning Banner when the right guess is entered', () => {
        render(<App />);
        writeAndSubmit("TESTS");

        expect(screen.getByText(/Congratulations/)).toBeInTheDocument();
    });

    it('should display the losing Banner when the 5 bad guesses have been made', () => {
        render(<App />);
        for (let i = 0; i < 5; i++) {
            writeAndSubmit("FAILS");
        }

        expect(screen.getByText(/Sorry/)).toBeInTheDocument();
    });

    it('should reset guesses when RESET button is hit', () => {
        render(<App />);

        writeAndSubmit("HELLO");

        mockedSample.mockClear();

        const reset_button = screen.getByText("RESET");

        fireEvent.click(reset_button);

        expect(mockedSample).toHaveBeenCalled();
    });
}) 