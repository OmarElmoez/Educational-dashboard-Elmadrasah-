import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { LoginLayout } from "@/layouts";

vi.mock('react-router-dom', () => ({
  Outlet: vi.fn(() => <div data-testid="outlet" />),
}));

vi.mock('@/assets/login-img.svg?react', () => ({
  default: () => <div data-testid="svg-mock">SVG Mock</div>
}));

describe('Login Layout', () => {
  test('renders the correct layout structure', () => {
    render(<LoginLayout />)

    const mainContainer = screen.getByRole('main');
    // you can use this only for GLOBAL classes.
    expect(mainContainer).toHaveClass('container');

    const leftBox = screen.getByTestId('left-box');
    const imgBox = screen.getByTestId('login-img');
    const svgImg = screen.getByTestId('svg-mock');
    expect(leftBox).toContainElement(imgBox);
    expect(imgBox).toContainElement(svgImg);

    const rightBox = screen.getByTestId('right-box');
    expect(rightBox).toContainElement(screen.getByTestId('outlet'));
  })
})