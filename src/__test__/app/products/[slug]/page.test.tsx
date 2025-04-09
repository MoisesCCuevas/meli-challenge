import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductPage from '@/app/products/[slug]/page';
import useProducts from '@/hooks/useProducts';
import { Product } from '@/types/Product';

// Mock de next/navigation
jest.mock('next/navigation', () => ({
  useParams: () => ({ slug: '1' }),
  redirect: jest.fn()
}));

// Mock de useProducts
jest.mock('@/hooks/useProducts');

describe('ProductPage', () => {
  const mockProduct: Product = {
    id: 1,
    title: 'Test Product',
    price: 100,
    description: 'Test Description',
    category: 'electronics',
    image: 'http://test.com/image.jpg'
  };

  const setupMockUseProducts = (product: Product | null) => {
    const mockFindOneProduct = jest.fn().mockReturnValue(product);
    (useProducts as jest.Mock).mockReturnValue({
      findOneProduct: mockFindOneProduct,
      loading: false,
      error: null
    });
    return mockFindOneProduct;
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debería renderizar el detalle del producto correctamente', () => {
    setupMockUseProducts(mockProduct);
    render(<ProductPage />);

    // Verificar que se muestren todos los detalles del producto
    expect(screen.getByRole('heading', { name: mockProduct.title })).toBeInTheDocument();
    expect(screen.getByText(`Precio: $${mockProduct.price}`)).toBeInTheDocument();
    expect(screen.getByText(`Categoría: ${mockProduct.category}`)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument();

    // Verificar la imagen usando alt text específico
    const productImage = screen.getByRole('img', { name: mockProduct.title });
    expect(productImage).toHaveAttribute('src', mockProduct.image);
    expect(productImage).toHaveAttribute('alt', mockProduct.title);
  });

  it('debería mostrar mensaje cuando no se encuentra el producto', () => {
    setupMockUseProducts(null);
    render(<ProductPage />);

    // Verificar que no se muestren los elementos del producto
    expect(screen.queryByText(mockProduct.title)).not.toBeInTheDocument();
    expect(screen.queryByText(`Precio: $${mockProduct.price}`)).not.toBeInTheDocument();
    expect(screen.queryByText(mockProduct.description)).not.toBeInTheDocument();

    // Verificar que se muestre el mensaje de error
    const errorMessage = screen.getByText('No se encontró el producto');
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveClass('text-lg', 'w-full', 'p-10');
  });

  it('debería renderizar el enlace de volver', () => {
    setupMockUseProducts(mockProduct);
    render(<ProductPage />);

    const backLink = screen.getByRole('link', { name: /volver/i });
    expect(backLink).toBeInTheDocument();
    expect(backLink).toHaveAttribute('href', '/');
  });

  it('debería llamar a findOneProduct con el ID correcto', () => {
    const mockFindOneProduct = setupMockUseProducts(mockProduct);
    render(<ProductPage />);

    expect(mockFindOneProduct).toHaveBeenCalledWith(1);
    expect(mockFindOneProduct).toHaveBeenCalledTimes(1);
  });

  it('debería aplicar las clases correctas al contenedor principal', () => {
    setupMockUseProducts(mockProduct);
    render(<ProductPage />);

    const mainContainer = screen.getByTestId('product-detail-container');
    expect(mainContainer).toHaveClass(
      'flex',
      'flex-col',
      'items-center',
      'justify-center',
      'w-full',
      'h-full'
    );
  });

  it('debería aplicar las clases correctas a las secciones del producto', () => {
    setupMockUseProducts(mockProduct);
    render(<ProductPage />);

    // Verificar sección de imagen y detalles básicos
    const imageSection = screen.getByTestId('product-image-section');
    expect(imageSection).toHaveClass(
      'flex',
      'flex-col',
      'items-center',
      'justify-center',
      'gap-4',
      'w-full',
      'p-4',
      'md:w-1/2',
      'mt-6',
      'md:mt-0'
    );

    // Verificar sección de descripción
    const descriptionSection = screen.getByTestId('product-description-section');
    expect(descriptionSection).toHaveClass(
      'flex',
      'flex-col',
      'items-center',
      'justify-center',
      'gap-4',
      'p-4',
      'w-full',
      'md:w-1/2'
    );
  });

  it('debería aplicar las clases correctas al enlace de volver', () => {
    setupMockUseProducts(mockProduct);
    render(<ProductPage />);

    const backLink = screen.getByRole('link', { name: /volver/i });
    expect(backLink).toHaveClass(
      'absolute',
      'top-20',
      'left-4',
      'p-2',
      'select-none'
    );
  });
}); 