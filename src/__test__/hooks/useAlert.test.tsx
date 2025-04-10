import { renderHook, act } from '@testing-library/react';
import { AlertContext } from '@/components/CostumeAlertProvider';
import useAlert from '@/hooks/useAlert';
import { CostumeAlertProps } from '@/components/CostumeAlert';
import React from 'react';

describe('useAlert', () => {
  const mockSetAlert = jest.fn();
  const mockContextValue = {
    setAlert: mockSetAlert
  };

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <AlertContext.Provider value={mockContextValue}>
      {children}
    </AlertContext.Provider>
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debería retornar el contexto cuando se usa dentro del AlertProvider', () => {
    const { result } = renderHook(() => useAlert(), { wrapper });

    expect(result.current).toEqual(mockContextValue);
  });

  it('debería lanzar un error cuando se usa fuera del AlertProvider', () => {
    // Renderizar sin el wrapper para simular uso fuera del provider
    expect(() => {
      renderHook(() => useAlert());
    }).toThrow('useAlert deberia estar dentro de un CostumeAlertProvider');
  });

  it('debería permitir establecer una alerta', () => {
    const { result } = renderHook(() => useAlert(), { wrapper });

    const alertProps: CostumeAlertProps = {
      type: 'success',
      title: 'Éxito',
      children: 'Operación completada correctamente'
    };

    act(() => {
      result.current.setAlert(alertProps);
    });

    expect(mockSetAlert).toHaveBeenCalledWith(alertProps);
  });

  it('debería mantener la misma referencia del contexto entre renders', () => {
    const { result, rerender } = renderHook(() => useAlert(), { wrapper });

    const firstContext = result.current;

    rerender();

    expect(result.current).toBe(firstContext);
  });
}); 