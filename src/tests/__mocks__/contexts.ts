import { vi } from "vitest";

vi.mock('@/store/context', () => ({
  useFeedback: () => ({openFeedbackModal: vi.fn()})
}));