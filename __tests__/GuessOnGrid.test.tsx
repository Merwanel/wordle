import GuessOnGrid from '@/app/GuessOnGrid';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('GuessOnGrid', () => {
    it('should display the guess', () => {
        render(<GuessOnGrid guess='TESTS' answer='ANSWER' />) ;
        expect(screen.getAllByText('T').length).toBe(2) ;
        expect(screen.getAllByText('E').length).toBe(1) ;
        expect(screen.getAllByText('S').length).toBe(2) ;
    });
    it('should display the guess', () => {
        render(<GuessOnGrid guess='TEST' answer='ANSWER' />) ;
        expect(screen.getAllByText('T').length).toBe(2) ;
        expect(screen.getAllByText('E').length).toBe(1) ;
        expect(screen.getAllByText('S').length).toBe(1) ;
    });
    it('should truncate a guess of more than 5 letters', () => {
        render(<GuessOnGrid guess='AAAAABBBBBBBBBB' answer='ANSWER' />) ;
        expect(screen.getAllByText('A').length).toBe(5) ;
        expect(screen.queryByText('B')).not.toBeInTheDocument() ;
    });
    it('should render 5 empty cells when guess is empty', () => {
        render(<GuessOnGrid guess='' />);
        const cells = document.querySelectorAll('.cell');
        expect(cells).toHaveLength(5);
        cells.forEach(cell => {
            expect(cell).toHaveTextContent('');
        });
    });
});