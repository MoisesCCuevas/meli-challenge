import { render, screen } from '@testing-library/react';
import { default as HomeLoading } from '@/app/home/loading';
import { default as NuevoProductoLoading } from '@/app/products/nuevo-producto/loading';
import { default as SlugLoading } from '@/app/products/[slug]/loading';

// Mock del componente Loader
jest.mock('@/components/Loader', () => {
  return function MockLoader() {
    return <div data-testid="loader">Loading...</div>;
  };
});

describe('Loading', () => {
  it('debería renderizar el componente Loader en /home', () => {
    render(<HomeLoading />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('debería renderizar el componente Loader en /products/nuevo-producto', () => {
    render(<NuevoProductoLoading />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('debería renderizar el componente Loader en /products/[slug]', () => {
    render(<SlugLoading />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
});
