import { screen } from '@testing-library/react';
import Login from "@/pages/login/Login.tsx";
import { setupTestWrapper } from "@/tests/__utils__";

describe('SignIn form', () => {

  it('renders correctly', () => {
   setupTestWrapper(<Login />);

    screen.debug();

    // Check if key elements are present
    expect(screen.getByPlaceholderText('البريد الالكتروني')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('كلمة المرور')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /تسجيل الدخول/i })).toBeInTheDocument();
  });
})