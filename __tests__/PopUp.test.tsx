import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import PopUp from '../src/app/PopUp'

describe('PopUp', () => {
  it('should renders message correctly', () => {
    const test_message = 'test message' ;
    render(<PopUp message={test_message} />) ;

    const message = screen.getByText(test_message) ;

    expect(message).toBeInTheDocument() ;
  })
})