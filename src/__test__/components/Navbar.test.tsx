import React from 'react';
import { render, screen } from '@testing-library/react';
import Navbar from '@/components/Navbar';

// Mock de next/link ya que es un componente externo
jest.mock('next/link', () => {
  const MockLink = ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
  MockLink.displayName = 'MockLink';
  return MockLink;
});

describe('Navbar Component', () => {
  it('renderiza correctamente el título', () => {
    render(<Navbar />);
    expect(screen.getByText('Meli Challenge')).toBeInTheDocument();
  });

  it('renderiza el enlace a Products', () => {
    render(<Navbar />);
    const productsLink = screen.getByText('Products');
    expect(productsLink).toBeInTheDocument();
    expect(productsLink.closest('a')).toHaveAttribute('href', '/');
  });

  it('renderiza el botón de agregar producto', () => {
    render(<Navbar />);
    const addButton = screen.getByText('Agregar Producto');
    expect(addButton).toBeInTheDocument();
    expect(addButton.closest('a')).toHaveAttribute('href', '/products/nuevo-producto');
  });

  it('aplica las clases correctas al nav', () => {
    render(<Navbar />);
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveClass('flex', 'items-center', 'justify-between', 'w-full', 'h-16', 'p-2', 'shadow-md', 'select-none');
  });

  it('aplica las clases correctas al título', () => {
    render(<Navbar />);
    const title = screen.getByText('Meli Challenge');
    expect(title).toHaveClass('font-extrabold', 'text-2xl');
  });

  it('aplica las clases correctas al enlace Products', () => {
    render(<Navbar />);
    const productsLinkContainer = screen.getByText('Products').parentElement;
    expect(productsLinkContainer).toHaveClass('hover:cursor-pointer', 'hover:text-cyan-50');
  });

  it('aplica las clases correctas al botón de agregar', () => {
    render(<Navbar />);
    const button = screen.getByText('Agregar Producto').closest('button');
    expect(button).toHaveClass('border', 'font-bold', 'py-2', 'px-4', 'rounded-md', 'hover:text-white', 'hover:border-white');
  });
}); 