import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import GuessesList from '@/app/GuessesList'


fdescribe('GuessesList', () => {
	it('should render 5 guess rows', () => {
		render(<GuessesList guess={""} guesses={[]} answer={"TESTS"} />)

		const guessRows = screen.getAllByRole('paragraph')
		expect(guessRows).toHaveLength(5)
	})

	it('should display previous guesses with letters', () => {
		render(<GuessesList guess={""} guesses={["WORLD", "TESTS", "HELLO"]} answer={"PIANO"} />)

		expect(screen.getByText('W')).toBeInTheDocument()
		expect(screen.getAllByText('O').length).toBe(2)
		expect(screen.getByText('R')).toBeInTheDocument()
		expect(screen.getAllByText('L').length).toBe(3)
		expect(screen.getByText('D')).toBeInTheDocument()

		
		expect(screen.getAllByText('T').length).toBe(2)
		expect(screen.getAllByText('E').length).toBe(2)
		expect(screen.getAllByText('S').length).toBe(2)
	})

	it('should show current guess being typed', () => {
		render(<GuessesList guess={"HEL"} guesses={[]} answer={"HELLO"} />)

		expect(screen.getByText('H')).toBeInTheDocument()
		expect(screen.getByText('E')).toBeInTheDocument()
		expect(screen.getByText('L')).toBeInTheDocument()
	})

	it('should show empty rows if no guesses, hence it renders no text', async () => {
		render(<GuessesList guess={""} guesses={[""]} answer={"HELLO"} />)
		
		for(let letter_num = "A".charCodeAt(0) ; letter_num <= "Z".charCodeAt(0) ; letter_num++) {
			const letter = String.fromCharCode(letter_num) ;
			expect(screen.queryByText(letter)).not.toBeInTheDocument();
		}
	})
})