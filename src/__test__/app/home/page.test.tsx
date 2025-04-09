import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import Home from '@/app/home/page';
import useProducts from '@/hooks/useProducts';
import { Product } from '@/types/Product';

// Mock de useProducts
jest.mock('@/hooks/useProducts', () => ({
  __esModule: true,
  default: jest.fn()
}));

describe('Home Page', () => {
  const mockProducts: Product[] = [
    {
      id: 1,
      title: 'Test Product 1',
      price: 100,
      description: 'Test Description 1',
      category: 'electronics',
      image: 'http://test.com/image1.jpg'
    },
    {
      id: 2,
      title: 'Test Product 2',
      price: 200,
      description: 'Test Description 2',
      category: 'clothing',
      image: 'http://test.com/image2.jpg'
    }
  ];

  const mockFilterProductsList = jest.fn();

  const setupMockUseProducts = (overrides = {}) => {
    const defaultValues = {
      loading: false,
      productsFiltered: mockProducts,
      categories: ['electronics', 'clothing'],
      selectedCategory: '',
      searchValue: '',
      filterProductsList: mockFilterProductsList
    };

    (useProducts as jest.Mock).mockReturnValue({
      ...defaultValues,
      ...overrides
    });
  };

  beforeEach(() => {
    jest.clearAllMocks();
    setupMockUseProducts();
  });

  it('debería mostrar el mensaje de carga cuando loading es true', () => {
    setupMockUseProducts({ loading: true });
    render(<Home />);
    
    expect(screen.getByText('Cargando Productos...')).toBeInTheDocument();
  });

  it('debería renderizar la lista de productos correctamente', () => {
    render(<Home />);

    // Verificar cada producto por su nombre
    mockProducts.forEach(product => {
      const productElement = screen.getByRole('link', { name: new RegExp(product.title) });
      
      // Verificar que el enlace contiene los detalles del producto
      within(productElement).getByText(product.title);
      within(productElement).getByText(`$${product.price}`);
      within(productElement).getByText(product.category);
      
      // Verificar la URL del enlace
      expect(productElement).toHaveAttribute('href', `/products/${product.id}`);
    });
  });

  it('debería mostrar mensaje cuando no hay productos', () => {
    setupMockUseProducts({ productsFiltered: [] });
    render(<Home />);

    expect(screen.getByText('No hay productos que mostrar')).toBeInTheDocument();
  });

  it('debería renderizar los componentes de filtrado', () => {
    render(<Home />);

    // Verificar el input de búsqueda
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    
    // Verificar el select de categorías
    const categorySelect = screen.getByRole('combobox');
    expect(categorySelect).toBeInTheDocument();
    expect(categorySelect).toHaveTextContent('Filtrar');
  });

  it('debería llamar a filterProductsList cuando se cambia el texto de búsqueda', () => {
    render(<Home />);
    
    const searchInput = screen.getByRole('textbox');
    fireEvent.change(searchInput, { target: { value: 'test' } });

    expect(mockFilterProductsList).toHaveBeenCalledWith('test', '');
  });

  it('debería llamar a filterProductsList cuando se cambia la categoría', () => {
    render(<Home />);
    
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'electronics' } });

    expect(mockFilterProductsList).toHaveBeenCalledWith('', 'electronics');
  });

  it('debería mantener el estado de filtrado al cambiar categoría y búsqueda', () => {
    setupMockUseProducts({ selectedCategory: 'electronics', searchValue: 'test' });
    render(<Home />);

    const searchInput = screen.getByRole('textbox');
    const select = screen.getByRole('combobox');

    fireEvent.change(searchInput, { target: { value: 'new test' } });
    expect(mockFilterProductsList).toHaveBeenCalledWith('new test', 'electronics');

    fireEvent.change(select, { target: { value: 'clothing' } });
    expect(mockFilterProductsList).toHaveBeenCalledWith('test', 'clothing');
  });
}); 