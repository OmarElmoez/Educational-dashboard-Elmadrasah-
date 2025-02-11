import { vi } from "vitest";

vi.mock('@/store/auth/authSlice', () => ({
  default: (state = {}) => state,
}));

vi.mock('@/store/lessons/LessonsSlice', () => ({
  default: (state = {}) => state,
}));

vi.mock('@/store/profile/ProfileSlice', () => ({
  default: (state = {}) => state,
}));

vi.mock('@/store/review-questions/reviewSlice', () => ({
  default: (state = {}) => state,
}));

vi.mock('@/store/notifications/NotificationsSlice', () => ({
  default: (state = {}) => state,
}));

vi.mock('@/store/location/LocationSlice', () => ({
  default: (state = {}) => state,
}));

vi.mock('@/store/form-subjects/FormSubjectsSlice', () => ({
  default: (state = {}) => state,
}));

vi.mock('@/store/table/TableSlice', () => ({
  default: (state = {}) => state,
}));