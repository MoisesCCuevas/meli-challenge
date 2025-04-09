import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Input from '@/components/Input';

describe('Input Component', () => {
  it('renderiza correctamente', () => {
    render(<Input placeholder="Test placeholder" />);
    expect(screen.getByPlaceholderText('Test placeholder')).toBeInTheDocument();
  });

  it('maneja cambios de valor correctamente', () => {
    const mockOnChange = jest.fn();
    render(<Input onChange={mockOnChange} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test value' } });
    
    expect(mockOnChange).toHaveBeenCalledWith('test value');
  });

  it('respeta la propiedad disabled', () => {
    render(<Input disabled={true} />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('aplica el tipo correcto', () => {
    render(<Input type="text" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text');
  });

  it('aplica el valor inicial correctamente', () => {
    render(<Input value="valor inicial" />);
    expect(screen.getByRole('textbox')).toHaveValue('valor inicial');
  });

  it('aplica las clases CSS correctamente', () => {
    render(<Input />);
    expect(screen.getByRole('textbox')).toHaveClass('border', 'rounded-md', 'p-2', 'focus:outline-none', 'shadow-md');
  });
}); 