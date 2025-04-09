/* eslint-disable @typescript-eslint/no-explicit-any */
import { getProducts, setNewProduct } from '@/services/productsService';
import { Product } from '@/types/Product';

const mockGet = jest.fn();
const mockPost = jest.fn();

// Mock de axios
jest.mock('axios', () => ({
  create: () => ({
    get: (...args: any[]) => mockGet(...args),
    post: (...args: any[]) => mockPost(...args)
  })
}));

describe('Products Service', () => {
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

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getProducts', () => {
    it('debería obtener la lista de productos correctamente', async () => {
      mockGet.mockResolvedValueOnce({ data: mockProducts });

      const result = await getProducts();

      expect(mockGet).toHaveBeenCalledWith('https://fakestoreapi.com/products');
      expect(result).toEqual(mockProducts);
      expect(mockGet).toHaveBeenCalledTimes(1);
    });

    it('debería manejar errores al obtener productos', async () => {
      const error = new Error('Error de red');
      mockGet.mockRejectedValueOnce(error);

      await expect(getProducts()).rejects.toThrow('Error de red');
      expect(mockGet).toHaveBeenCalledWith('https://fakestoreapi.com/products');
      expect(mockGet).toHaveBeenCalledTimes(1);
    });
  });

  describe('setNewProduct', () => {
    const newProduct: Partial<Product> = {
      title: 'New Product',
      price: 300,
      description: 'New Description',
      category: 'electronics',
      image: 'http://test.com/new-image.jpg'
    };

    it('debería crear un nuevo producto correctamente', async () => {
      const mockResponse = { id: 3, ...newProduct };
      mockPost.mockResolvedValueOnce({ data: mockResponse });

      const result = await setNewProduct(newProduct);

      expect(mockPost).toHaveBeenCalledWith(
        'https://fakestoreapi.com/products',
        newProduct
      );
      expect(result).toEqual(mockResponse);
      expect(mockPost).toHaveBeenCalledTimes(1);
    });

    it('debería manejar errores al crear un producto', async () => {
      const error = new Error('Error al crear producto');
      mockPost.mockRejectedValueOnce(error);

      await expect(setNewProduct(newProduct)).rejects.toThrow('Error al crear producto');
      expect(mockPost).toHaveBeenCalledWith(
        'https://fakestoreapi.com/products',
        newProduct
      );
      expect(mockPost).toHaveBeenCalledTimes(1);
    });

    it('debería validar los datos del producto antes de enviarlo', async () => {
      const mockResponse = { id: 3, ...newProduct };
      mockPost.mockResolvedValueOnce({ data: mockResponse });

      const invalidProduct: Partial<Product> = {
        title: '',
        price: -100
      };

      await expect(setNewProduct(invalidProduct)).resolves.toBeDefined();
      expect(mockPost).toHaveBeenCalledWith(
        'https://fakestoreapi.com/products',
        invalidProduct
      );
    });
  });
});
