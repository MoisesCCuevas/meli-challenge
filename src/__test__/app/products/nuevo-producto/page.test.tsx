/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, within } from '@testing-library/react';
import NuevoProductoPage from '@/app/products/nuevo-producto/page';
import useProducts from '@/hooks/useProducts';

// Mock de módulos
jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
  useParams: () => ({ slug: '1' })
}));

jest.mock('@/hooks/useProducts', () => ({
  __esModule: true,
  default: jest.fn()
}));

// Mock de useFormStatus
const mockUseFormStatus = jest.fn();
jest.mock('react-dom', () => {
  const actualReactDom = jest.requireActual('react-dom');
  return {
    ...actualReactDom,
    useFormStatus: () => mockUseFormStatus()
  };
});

// Mock de useActionState
const mockUseActionState = jest.fn();
jest.spyOn(React, 'useActionState').mockImplementation(mockUseActionState);

describe('NuevoProductoPage', () => {
  const mockCategories = ['electronics', 'clothing'];
  const mockAddProduct = jest.fn();
  const mockAction = jest.fn();
  const mockState = { error: '', newProduct: null };

  beforeEach(() => {
    jest.clearAllMocks();
    (useProducts as jest.Mock).mockReturnValue({
      categories: mockCategories,
      addProduct: mockAddProduct
    });
    mockUseActionState.mockReturnValue([mockState, mockAction, false]);
    mockUseFormStatus.mockReturnValue({ pending: false });
  });

  it('debería renderizar el formulario correctamente', () => {
    render(<NuevoProductoPage />);

    // Verificar título
    expect(screen.getByText('Crear Nuevo Producto')).toBeInTheDocument();

    // Verificar campos del formulario
    expect(screen.getByLabelText(/nombre del producto:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/descripción:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/precio:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/categoría:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/imagen:/i)).toBeInTheDocument();

    // Verificar botón de submit
    expect(screen.getByRole('button', { name: /crear producto/i })).toBeInTheDocument();
  });

  it('debería mostrar las categorías en el select', () => {
    render(<NuevoProductoPage />);
    
    const select = screen.getByLabelText(/categoría:/i);
    const options = within(select).getAllByRole('option');
    
    // Verificar que existe la opción por defecto
    expect(options[0]).toHaveTextContent('Seleccionar Categoría');
    
    // Verificar las categorías
    mockCategories.forEach((category, index) => {
      expect(options[index + 1]).toHaveTextContent(category);
    });
  });

  it('debería aplicar las clases correctas al contenedor principal', () => {
    render(<NuevoProductoPage />);

    const container = screen.getByTestId('nuevo-producto-container');
    expect(container).toHaveClass(
      'flex',
      'flex-col',
      'items-center',
      'justify-center',
      'w-full',
      'h-full',
      'p-4'
    );
  });

  it('debería aplicar las clases correctas al formulario', () => {
    render(<NuevoProductoPage />);

    const form = screen.getByTestId('nuevo-producto-form');
    expect(form).toHaveClass(
      'w-full',
      'md:w-1/4',
      'flex',
      'flex-col',
      'gap-4'
    );
  });

  it('debería validar los campos requeridos', () => {
    render(<NuevoProductoPage />);

    // Verificar campos requeridos
    expect(screen.getByLabelText(/nombre del producto:/i)).toHaveAttribute('required');
    expect(screen.getByLabelText(/descripción:/i)).toHaveAttribute('required');
    expect(screen.getByLabelText(/precio:/i)).toHaveAttribute('required');
    expect(screen.getByLabelText(/categoría:/i)).toHaveAttribute('required');
  });
}); 