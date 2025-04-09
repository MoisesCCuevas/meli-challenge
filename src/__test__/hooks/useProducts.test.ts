/* eslint-disable @typescript-eslint/no-explicit-any */
import { renderHook, act } from '@testing-library/react';
import useProducts from '@/hooks/useProducts';
import { Product } from '@/types/Product';
import { filterProducts } from '@/store/slices/productsSlice';

// Mock de useDispatch y useSelector
const mockDispatch = jest.fn();
const mockUseSelector = jest.fn();

// Mock del módulo react-redux
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
  useSelector: (selector: any) => mockUseSelector(selector)
}));

// Mock de las acciones
jest.mock('@/store/slices/productsSlice', () => ({
  ...jest.requireActual('@/store/slices/productsSlice'),
  filterProducts: jest.fn((payload) => payload)
}));

describe('useProducts Hook', () => {
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

  const mockState = {
    products: {
      productsFiltered: mockProducts,
      categories: ['electronics', 'clothing'],
      selectedCategory: '',
      productsList: mockProducts
    },
    ui: {
      loading: false,
      searchValue: ''
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseSelector.mockImplementation((selector) => selector(mockState));
  });

  it('debería retornar los valores iniciales correctamente', () => {
    const { result } = renderHook(() => useProducts());

    expect(result.current.productsFiltered).toEqual(mockProducts);
    expect(result.current.categories).toEqual(['electronics', 'clothing']);
    expect(result.current.selectedCategory).toBe('');
    expect(result.current.loading).toBe(false);
    expect(result.current.searchValue).toBe('');
  });

  it('debería filtrar productos por categoría y nombre de producto', () => {
    const { result } = renderHook(() => useProducts());
    
    act(() => {
      result.current.filterProductsList('Test', 'electronics');
    });

    expect(filterProducts).toHaveBeenCalledWith({
      searchValue: 'Test',
      category: 'electronics'
    });
    expect(mockDispatch).toHaveBeenCalled();
  });

  it('debería encontrar un producto por ID', () => {
    const { result } = renderHook(() => useProducts());
    
    const product = result.current.findOneProduct(1);
    expect(product).toEqual(mockProducts[0]);
  });

  it('debería retornar undefined cuando no encuentra un producto', () => {
    const { result } = renderHook(() => useProducts());
    
    const product = result.current.findOneProduct(999);
    expect(product).toBeUndefined();
  });

  it('debería agregar un nuevo producto', () => {
    const { result } = renderHook(() => useProducts());
    
    const newProduct: Product = {
      id: 3,
      title: 'New Product',
      price: 300,
      description: 'New Description',
      category: 'electronics',
      image: 'http://test.com/new-image.jpg'
    };

    act(() => {
      result.current.addProduct(newProduct);
    });

    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        payload: newProduct
      })
    );
  });

  it('debería manejar el estado de carga', () => {
    const loadingState = {
      ...mockState,
      ui: {
        ...mockState.ui,
        loading: true
      }
    };

    mockUseSelector.mockImplementation((selector) => selector(loadingState));
    
    const { result } = renderHook(() => useProducts());
    expect(result.current.loading).toBe(true);
  });

  it('debería manejar el valor de búsqueda', () => {
    const searchState = {
      ...mockState,
      ui: {
        ...mockState.ui,
        searchValue: 'test search'
      }
    };

    mockUseSelector.mockImplementation((selector) => selector(searchState));
    
    const { result } = renderHook(() => useProducts());
    expect(result.current.searchValue).toBe('test search');
  });
}); 