import { render, screen } from '@testing-library/react'
import ErrorMessage from '@/components/ui/ErrorMessage'

describe('ErrorMessage', () => {
  it('should render error message', () => {
    render(<ErrorMessage message="Test error message" />)
    
    expect(screen.getByText('Test error message')).toBeInTheDocument()
  })

  it('should render with custom className', () => {
    render(<ErrorMessage message="Test error" className="custom-class" />)
    
    const errorElement = screen.getByText('Test error')
    expect(errorElement).toHaveClass('custom-class')
  })

  it('should render with default styling', () => {
    render(<ErrorMessage message="Test error" />)
    
    const errorElement = screen.getByText('Test error')
    expect(errorElement).toHaveClass('text-red-600')
  })

  it('should not render when message is empty', () => {
    render(<ErrorMessage message="" />)
    
    expect(screen.queryByText('')).not.toBeInTheDocument()
  })

  it('should handle null by not rendering', () => {
    const { container } = render(<ErrorMessage message="" />)
    
    expect(container.firstChild).toBeNull()
  })
})
