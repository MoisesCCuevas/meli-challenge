import { render, screen, fireEvent } from '@testing-library/react';
import CostumeAlert, { CostumeAlertProps } from '@/components/CostumeAlert';

describe('CostumeAlert', () => {
  const defaultProps: CostumeAlertProps = {
    type: 'info',
    title: 'Título de prueba',
    children: 'Contenido de prueba'
  };

  it('debería renderizar correctamente con las props por defecto', () => {
    render(<CostumeAlert {...defaultProps} />);
    
    expect(screen.getByText('Título de prueba')).toBeInTheDocument();
    expect(screen.getByText('Contenido de prueba')).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('debería aplicar las clases correctas según el tipo', () => {
    const { rerender } = render(<CostumeAlert {...defaultProps} type="success" />);
    expect(screen.getByRole('alert')).toHaveClass('bg-green-100', 'text-green-800');

    rerender(<CostumeAlert {...defaultProps} type="error" />);
    expect(screen.getByRole('alert')).toHaveClass('bg-red-100', 'text-red-800');

    rerender(<CostumeAlert {...defaultProps} type="warning" />);
    expect(screen.getByRole('alert')).toHaveClass('bg-yellow-100', 'text-yellow-800');

    rerender(<CostumeAlert {...defaultProps} type="info" />);
    expect(screen.getByRole('alert')).toHaveClass('bg-blue-100', 'text-blue-800');
  });

  it('debería llamar a onClose cuando se hace clic en el ícono de cerrar', () => {
    const onClose = jest.fn();
    render(<CostumeAlert {...defaultProps} onClose={onClose} />);
    
    fireEvent.click(screen.getByRole('img'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('debería mantener la estructura correcta del componente', () => {
    render(<CostumeAlert {...defaultProps} />);
    
    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass('top-20', 'right-0', 'w-1/4', 'shadow-md', 'rounded-sm', 'p-4', 'fixed', 'z-50');
    expect(alert).toHaveClass('flex', 'flex-col', 'gap-2');
  });

  it('debería renderizar correctamente sin children', () => {
    const { title, type } = defaultProps;
    render(<CostumeAlert title={title} type={type} />);
    
    expect(screen.getByText('Título de prueba')).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('debería renderizar correctamente sin título', () => {
    const { children, type } = defaultProps;
    render(<CostumeAlert children={children} type={type} />);
    
    expect(screen.getByText('Contenido de prueba')).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
  });
}); 