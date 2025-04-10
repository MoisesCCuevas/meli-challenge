import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react';
import AlertProvider, { AlertContext } from '@/components/CostumeAlertProvider';
import { CostumeAlertProps } from '@/components/CostumeAlert';

describe('AlertProvider', () => {
  const mockAlert: CostumeAlertProps = {
    type: 'success',
    title: 'Éxito',
    children: 'Operación completada correctamente'
  };

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <AlertProvider>{children}</AlertProvider>
  );

  it('debería proporcionar el contexto correctamente', () => {
    const { result } = renderHook(() => {
      const context = React.useContext(AlertContext);
      if (!context) throw new Error('Contexto no encontrado');
      return context;
    }, { wrapper });

    expect(result.current).toHaveProperty('setAlert');
    expect(typeof result.current.setAlert).toBe('function');
  });

  it('debería mostrar la alerta cuando se llama a setAlert', () => {
    const { result } = renderHook(() => {
      const context = React.useContext(AlertContext);
      if (!context) throw new Error('Contexto no encontrado');
      return context;
    }, { wrapper });

    act(() => {
      result.current.setAlert(mockAlert);
    });

    expect(screen.getByText('Éxito')).toBeInTheDocument();
    expect(screen.getByText('Operación completada correctamente')).toBeInTheDocument();
  });

  it('debería cerrar la alerta cuando se hace clic en el ícono de cerrar', () => {
    const { result } = renderHook(() => {
      const context = React.useContext(AlertContext);
      if (!context) throw new Error('Contexto no encontrado');
      return context;
    }, { wrapper });

    act(() => {
      result.current.setAlert(mockAlert);
    });

    expect(screen.getByText('Éxito')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('img'));

    expect(screen.queryByText('Éxito')).not.toBeInTheDocument();
  });

  it('debería actualizar la alerta cuando se llama a setAlert con una nueva alerta', () => {
    const { result } = renderHook(() => {
      const context = React.useContext(AlertContext);
      if (!context) throw new Error('Contexto no encontrado');
      return context;
    }, { wrapper });

    act(() => {
      result.current.setAlert(mockAlert);
    });

    const newAlert: CostumeAlertProps = {
      type: 'error',
      title: 'Error',
      children: 'Ha ocurrido un error'
    };

    act(() => {
      result.current.setAlert(newAlert);
    });

    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(screen.getByText('Ha ocurrido un error')).toBeInTheDocument();
    expect(screen.queryByText('Éxito')).not.toBeInTheDocument();
  });

  it('debería mantener la referencia estable del contexto entre renders', () => {
    const { result, rerender } = renderHook(() => {
      const context = React.useContext(AlertContext);
      if (!context) throw new Error('Contexto no encontrado');
      return context;
    }, { wrapper });

    const firstContext = result.current;

    rerender();

    expect(result.current).toBe(firstContext);
  });

  it('debería renderizar los children correctamente', () => {
    const TestComponent = () => <div data-testid="test-child">Test Child</div>;

    render(
      <AlertProvider>
        <TestComponent />
      </AlertProvider>
    );

    expect(screen.getByTestId('test-child')).toBeInTheDocument();
  });
}); 