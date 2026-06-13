# Elmadrasah LMS Dashboard

Elmadrasah Dashboard is a React + TypeScript web app for managing an education workflow. It is a role-based portal with separate experiences for admins, teachers, students, and families.

The app is built for an Arabic-first, right-to-left interface and also ships with English translations.

## Core Areas

- Admins manage the operational side of the platform: dashboard, calendar, classes, unscheduled lessons, students, families, employees, invoices, roles, reports, and inbox workflows.
- Teachers can view their classes, student lists, notifications, and account settings.
- Students can open their class schedule, join live classes, and manage their profile and security settings.
- Families can view classes, read notes, join live classes, and manage their account settings.

## Authentication Flow

The login area includes:

- Sign in
- Set phone number
- Set password
- Confirm email
- OTP verification

Protected routes redirect users by role and keep each area isolated.

## Tech Stack

- React 18
- TypeScript
- Vite
- React Router
- Redux Toolkit
- Redux Persist
- TanStack Query
- Material UI
- Tailwind CSS v4
- Firebase Cloud Messaging
- Google OAuth
- i18next
- Vitest

## Project Structure

- `src/pages/` contains role-based pages and screens.
- `src/components/` contains reusable UI components.
- `src/layouts/` contains the login and main application layouts.
- `src/routes/` contains route definitions and route guards.
- `src/store/` contains Redux slices, async actions, and shared context providers.
- `src/services/` contains API service modules.
- `src/utils/` contains helpers, formatters, and localization setup.
- `src/constants/` contains sidebar data, options, and shared configuration.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Set the backend base URL in `.env`:
   ```bash
   VITE_URL_SERVER=https://your-api-url.example
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Firebase

The app initializes Firebase Messaging from the root `firebase-config.ts` file. If you move the app to a different Firebase project, update that file with the new project settings.

## Scripts

- `npm run dev` starts the Vite development server.
- `npm run build` runs TypeScript type-checking and creates a production build.
- `npm run lint` runs ESLint.
- `npm run preview` serves the production build locally.
- `npm run test` runs the Vitest suite.
- `npm run test:ui` opens the Vitest UI.

## Deployment

The repository includes a multi-stage `Dockerfile` for development and production builds. The production image serves the Vite output through Nginx.

## Notes

- The UI uses RTL by default.
- Notifications are handled through Firebase Cloud Messaging.
- Some integrations are wired directly in the app, so review environment-specific values before deploying elsewhere.
