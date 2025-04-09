import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchInput from '@/components/SearchInput';

describe('SearchInput Component', () => {
  const defaultProps = {
    value: '',
    onChange: jest.fn(),
  };

  it('renderiza correctamente', () => {
    render(<SearchInput {...defaultProps} />);
    expect(screen.getByPlaceholderText('Buscar producto...')).toBeInTheDocument();
  });

  it('muestra el valor proporcionado', () => {
    render(<SearchInput {...defaultProps} value="test value" />);
    expect(screen.getByRole('textbox')).toHaveValue('test value');
  });

  it('llama a onChange cuando el valor cambia', () => {
    const onChange = jest.fn();
    render(<SearchInput {...defaultProps} onChange={onChange} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'nuevo valor' } });
    
    expect(onChange).toHaveBeenCalledWith('nuevo valor');
  });

  it('tiene el icono de búsqueda', () => {
    render(<SearchInput {...defaultProps} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    // Verificar que el contenedor tiene las clases correctas
    const container = screen.getByRole('textbox').parentElement;
    expect(container).toHaveClass('flex', 'items-center', 'justify-center', 'border', 'rounded-md');
  });

  it('tiene los estilos correctos en el input', () => {
    render(<SearchInput {...defaultProps} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('w-full', 'h-full', 'px-4', 'text-lg', 'focus:outline-none');
  });
}); 