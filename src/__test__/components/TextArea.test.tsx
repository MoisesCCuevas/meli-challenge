import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TextArea from '@/components/TextArea';

describe('TextArea Component', () => {
  const defaultProps = {
    value: '',
    onChange: jest.fn(),
    placeholder: 'Escribe aquí...',
  };

  it('renderiza correctamente', () => {
    render(<TextArea {...defaultProps} />);
    expect(screen.getByPlaceholderText('Escribe aquí...')).toBeInTheDocument();
  });

  it('maneja cambios de valor correctamente', () => {
    const onChange = jest.fn();
    render(<TextArea {...defaultProps} onChange={onChange} />);
    
    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'nuevo texto' } });
    
    expect(onChange).toHaveBeenCalledWith('nuevo texto');
  });

  it('muestra el valor inicial correctamente', () => {
    render(<TextArea {...defaultProps} value="texto inicial" />);
    expect(screen.getByRole('textbox')).toHaveValue('texto inicial');
  });

  it('respeta la propiedad disabled', () => {
    render(<TextArea {...defaultProps} disabled={true} />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('aplica las clases CSS correctamente', () => {
    render(<TextArea {...defaultProps} />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('border', 'rounded-md', 'p-2', 'focus:outline-none', 'shadow-md');
  });

  it('maneja la propiedad required correctamente', () => {
    render(<TextArea {...defaultProps} required={true} />);
    expect(screen.getByRole('textbox')).toBeRequired();
  });
}); 