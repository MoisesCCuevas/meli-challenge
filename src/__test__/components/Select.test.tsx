import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Select from '@/components/Select';

describe('Select Component', () => {
  const defaultProps = {
    values: ['Opción 1', 'Opción 2', 'Opción 3'],
    defaultValue: 'Selecciona una opción',
    onChange: jest.fn(),
  };

  it('renderiza correctamente con valores por defecto', () => {
    render(<Select {...defaultProps} />);
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(4);
    expect(options[0]).toHaveTextContent('Selecciona una opción');
  });

  it('llama a onChange cuando se selecciona un valor', () => {
    render(<Select {...defaultProps} />);
    const select = screen.getByRole('combobox');
    
    fireEvent.change(select, { target: { value: 'Opción 1' } });
    expect(defaultProps.onChange).toHaveBeenCalledWith('Opción 1');
  });

  it('renderiza correctamente cuando está deshabilitado', () => {
    render(<Select {...defaultProps} disabled={true} />);
    expect(screen.getByRole('combobox')).toBeDisabled();
  });

  it('muestra el icono de filtro cuando filter es true', () => {
    render(<Select {...defaultProps} filter={true} />);
    const select = screen.getByRole('combobox');
    expect(select).toHaveClass('appearance-none');
  });

  it('aplica las clases correctas al contenedor', () => {
    render(<Select {...defaultProps} />);
    const container = screen.getByRole('combobox').parentElement;
    expect(container).toHaveClass('flex', 'items-center', 'justify-between', 'flex-1', 'p-2', 'border', 'rounded-md', 'shadow-md');
  });

  it('renderiza todas las opciones proporcionadas', () => {
    const values = ['Test 1', 'Test 2', 'Test 3'];
    render(<Select {...defaultProps} values={values} />);
    
    values.forEach(value => {
      expect(screen.getByText(value)).toBeInTheDocument();
    });
  });
}); 