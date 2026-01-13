# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React microfrontend dashboard built using Vite Module Federation. The project demonstrates a microfrontend architecture where independent applications (courses and profile) are dynamically loaded into a host shell application at runtime.

## Architecture

### Microfrontend Structure

The project follows a host-remote pattern:

- **Shell (Host)**: The container application running on port 5173 that orchestrates and loads remote microfrontends
- **Courses (Remote)**: A microfrontend running on port 5174 that exposes `./CoursesApp` component
- **Profile (Remote)**: A microfrontend running on port 5175 that exposes `./ProfileApp` component

### Module Federation Configuration

Each application uses `@originjs/vite-plugin-federation` for module federation:

- **Shell** (apps/shell/vite.config.ts:9-16): Configured as a consumer with remotes pointing to courses and profile
- **Remotes** (apps/courses/vite.config.ts:14-21, apps/profile/vite.config.ts:11-18): Each exposes specific components via `exposes` configuration
- **Shared Dependencies**: React and react-dom are shared across all microfrontends to avoid duplication

### Key Implementation Details

- The shell app uses React's `lazy()` and `Suspense` for dynamic imports (apps/shell/src/App.tsx:3-4, 11-17)
- Remote imports use the pattern `import('remoteName/exposedModule')` where remoteName matches the federation config
- All apps share the same React 19.2.x version to ensure compatibility
- Shell app uses `rolldown-vite` as a Vite alternative (apps/shell/package.json:29, 32-35)

## Workspace Structure

This is a pnpm monorepo with workspace configuration (pnpm-workspace.yaml:1-3):

```
apps/          - Microfrontend applications
  shell/       - Host application
  courses/     - Courses microfrontend
  profile/     - Profile microfrontend
packages/      - Shared packages (ui and utils - currently minimal setup)
```

## Development Commands

### Running the Project

```bash
# Install dependencies (required first)
pnpm install

# Build remote microfrontends first
cd apps/courses && pnpm build
cd apps/profile && pnpm build

# Run remotes in preview mode
cd apps/courses && pnpm preview  # Port 5174
cd apps/profile && pnpm preview  # Port 5175

# Run shell in dev mode (in a separate terminal)
cd apps/shell && pnpm dev        # Port 5173
```

**Important**: Remote microfrontends (courses and profile) must be built and run in preview mode, not dev mode. Only the shell should run in dev mode. This is required for module federation to work correctly with the remote entry points.

### Building

```bash
# Build all apps
pnpm build

# Build individual apps
cd apps/shell && pnpm build
cd apps/courses && pnpm build
cd apps/profile && pnpm build
```

Each app runs TypeScript compilation (`tsc -b`) followed by Vite build.

### Linting

```bash
# Lint all apps
pnpm lint

# Lint individual apps
cd apps/shell && pnpm lint
```

Uses ESLint 9 with TypeScript, React, and React Hooks plugins.

## Adding New Microfrontends

To add a new microfrontend:

1. Create a new app in `apps/` directory
2. Configure vite.config.ts with federation plugin, setting unique `name`, `filename: 'remoteEntry.js'`, and `exposes` for components
3. Set a unique port in server config
4. Add the remote to shell's vite.config.ts `remotes` object with format: `remoteName: 'http://localhost:PORT/assets/remoteEntry.js'`
5. Import and use in shell with `lazy(() => import('remoteName/ExposedComponent'))`

## TypeScript Configuration

Each app has three TypeScript configs:
- `tsconfig.json` - Base configuration
- `tsconfig.app.json` - App-specific compilation settings
- `tsconfig.node.json` - Node/Vite tooling configuration

## Package Manager

This project uses **pnpm** (version 10.28.0). Always use pnpm commands, not npm or yarn.
