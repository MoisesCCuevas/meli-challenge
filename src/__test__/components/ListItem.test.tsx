import React from 'react';
import { render, screen } from '@testing-library/react';
import ListItem from '@/components/ListItem';

describe('ListItem Component', () => {
  const defaultProps = {
    img: 'test-image.jpg',
    title: 'Test Product',
    price: '$99.99',
    category: 'Electronics'
  };

  it('renderiza correctamente todos los elementos', () => {
    render(<ListItem {...defaultProps} />);
    
    // Verificar imagen
    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'test-image.jpg');
    expect(image).toHaveAttribute('alt', 'Test Product');

    // Verificar título
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    
    // Verificar precio
    expect(screen.getByText('$99.99')).toBeInTheDocument();
    
    // Verificar categoría
    expect(screen.getByText('Electronics')).toBeInTheDocument();
  });

  it('aplica las clases correctas al contenedor principal', () => {
    render(<ListItem {...defaultProps} />);
    const container = screen.getByRole('figure').parentElement;
    expect(container).toHaveClass('flex', 'flex-col', 'md:flex-row', 'items-start', 'px-4', 'py-6', 'w-full');
  });

  it('aplica las clases correctas a la figura', () => {
    render(<ListItem {...defaultProps} />);
    const figure = screen.getByRole('img').parentElement;
    expect(figure).toHaveClass('w-full', 'h-48', 'md:w-1/3', 'overflow-hidden', 'rounded-md', 'shadow-lg', 'flex', 'justify-center', 'mb-4', 'select-none');
  });

  it('aplica las clases correctas al contenedor de información', () => {
    render(<ListItem {...defaultProps} />);
    const infoContainer = screen.getByText('Test Product').parentElement;
    expect(infoContainer).toHaveClass('flex', 'flex-col', 'ml-0', 'md:ml-6', 'gap-3', 'w-full', 'md:w-2/3');
  });

  it('aplica las clases correctas al título', () => {
    render(<ListItem {...defaultProps} />);
    const title = screen.getByText('Test Product');
    expect(title).toHaveClass('font-semibold', 'text-2xl', 'text-ellipsis', 'whitespace-nowrap', 'overflow-hidden');
  });

  it('aplica las clases correctas al precio y categoría', () => {
    render(<ListItem {...defaultProps} />);
    const price = screen.getByText('$99.99');
    const category = screen.getByText('Electronics');
    
    expect(price).toHaveClass('text-lg', 'font-bold');
    expect(category).toHaveClass('text-sm', 'text-gray-500', 'ml-2');
  });
}); 