import { vi } from "vitest";

vi.mock('@/hooks', () => ({
  useFirebaseMessaging: () => ({fcmToken: null})
}));

