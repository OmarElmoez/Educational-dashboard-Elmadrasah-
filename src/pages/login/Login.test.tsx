import { describe, expect, test } from "vitest";
import {Login} from "@/pages/login";
import {render, screen} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";

describe('Login component', () => {
  test('Rendering', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    screen.debug();

    expect(screen.getByText('تسجيل الدخول')).toBeInTheDocument();
    // expect(screen.getByText('البريد الالكتروني')).toBeInTheDocument();
    // expect(screen.getByText('كلمة المرور')).toBeInTheDocument();
    // expect(screen.getByRole('button', { name: /تسجيل الدخول/i })).toBeInTheDocument();
  });
});