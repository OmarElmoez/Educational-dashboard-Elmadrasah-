import { describe, test } from 'vitest';
import {render, screen} from "@testing-library/react";
import {Heading} from "@/components/UI";

describe('something truthy and falsy', () => {
  test('render Header component', () => {
    render(
      <Heading text="new heading" />
    )

    screen.debug();
  });

});