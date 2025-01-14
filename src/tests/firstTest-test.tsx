import { describe, test, expect } from 'vitest';
import { render, screen, waitFor} from "@testing-library/react";
import {Heading} from "@/components/UI";
import {TestWrapper} from "@/tests/__mocks__/setUpMocks.tsx";
import {LoginLayout} from "@/layouts";
import '@testing-library/jest-dom';
import {Roles} from "@/pages/shared";
import {Login} from "@/pages/login";
describe('something truthy and falsy', () => {
  test('render Header component', async () => {
    await waitFor(async () => {
      render(

          <Login  />

      );
    });
    screen.debug();

  });

});