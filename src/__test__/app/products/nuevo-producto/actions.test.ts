import { createProduct } from '@/app/products/nuevo-producto/actions';
import { setNewProduct } from '@/services/productsService';

// Mock del servicio
jest.mock('@/services/productsService', () => ({
  setNewProduct: jest.fn()
}));

describe('createProduct', () => {
  const mockSetNewProduct = setNewProduct as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debería crear un producto exitosamente', async () => {
    // Datos de prueba
    const formData = new FormData();
    formData.append('name', 'Test Product');
    formData.append('price', '100');
    formData.append('description', 'Test Description');
    formData.append('category', 'electronics');
    formData.append('image', 'http://test.com/image.jpg');

    // Mock de la respuesta del servicio
    const mockResponse = {
      id: 1,
      title: 'Test Product',
      price: 100,
      description: 'Test Description',
      category: 'electronics',
      image: 'http://test.com/image.jpg'
    };
    mockSetNewProduct.mockResolvedValueOnce(mockResponse);

    const result = await createProduct(null, formData);

    // Verificar resultados
    expect(result).toEqual({
      error: '',
      newProduct: mockResponse
    });
    expect(mockSetNewProduct).toHaveBeenCalledWith({
      title: 'Test Product',
      price: 100,
      description: 'Test Description',
      category: 'electronics',
      image: 'http://test.com/image.jpg'
    });
  });

  it('debería retornar error cuando el precio es negativo', async () => {
    const formData = new FormData();
    formData.append('name', 'Test Product');
    formData.append('price', '-100');
    formData.append('description', 'Test Description');
    formData.append('category', 'electronics');
    formData.append('image', 'http://test.com/image.jpg');
    const result = await createProduct(null, formData);

    // Verificar resultados
    expect(result).toEqual({
      error: 'El precio no puede ser negativo',
      newProduct: null
    });
    expect(mockSetNewProduct).not.toHaveBeenCalled();
  });

  it('debería retornar error cuando el precio no es un número', async () => {
    const formData = new FormData();
    formData.append('name', 'Test Product');
    formData.append('price', 'invalid');
    formData.append('description', 'Test Description');
    formData.append('category', 'electronics');
    formData.append('image', 'http://test.com/image.jpg');
    const result = await createProduct(null, formData);

    // Verificar resultados
    expect(result).toEqual({
      error: 'El precio no puede ser negativo',
      newProduct: null
    });
    expect(mockSetNewProduct).not.toHaveBeenCalled();
  });
}); 