import React from "react";
import { render, screen } from "@testing-library/react";
import Loader from "@/components/Loader";

describe('Loader Component', () => {
  it('renderiza correctamente', () => {
    render(<Loader />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('tiene las clases CSS correctas', () => {
    render(<Loader />);
    const loader = screen.getByRole('status');
    expect(loader).toHaveClass(
      'fixed',
      'top-0',
      'left-0',
      'w-screen',
      'h-screen',
      'backdrop-blur-md',
      'z-50',
    );
  });
});
