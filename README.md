# Cloudflare Workers React Template

[![Deploy to Cloudflare Workers]([![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/baybars03/kocflow))]([![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/baybars03/kocflow))

A production-ready full-stack template for Cloudflare Workers with a modern React frontend using shadcn/ui, Tailwind CSS, TypeScript, and Durable Objects for stateful backend entities. Perfect for building scalable, edge-deployed applications with real-time capabilities.

## Features

- **Full-Stack Ready**: React 18 frontend with Vite + Cloudflare Workers backend using Hono.
- **Modern UI**: shadcn/ui components, Tailwind CSS with custom design system, dark mode support.
- **State Management**: Durable Objects for entities (users, chats) with indexing for lists/pagination.
- **API-First**: Type-safe API routes with CORS, error handling, and seeding.
- **Developer Experience**: Hot reload, TypeScript, ESLint, Bun support, TanStack Query.
- **Production Optimized**: Automatic SPA handling, observability, migrations.
- **Mobile-Responsive**: Sidebar layout, theme toggle, animations.
- **Extensible**: Easy to add routes (`worker/user-routes.ts`), pages, entities (`worker/entities.ts`).

## Tech Stack

- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, shadcn/ui, Lucide icons, React Router, TanStack Query, Sonner (toasts), Framer Motion.
- **Backend**: Cloudflare Workers, Hono, Durable Objects (SQLite-backed).
- **Tools**: Bun, Wrangler, ESLint, PostCSS.
- **Libraries**: Immer, Zod, React Hook Form, Recharts, and more.

## Quick Start

### Prerequisites

- [Bun](https://bun.sh/) (recommended package manager)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install/)
- Cloudflare account (free tier works)

### Installation

1. Clone the repository or use the deploy button above.
2. Install dependencies:

   ```bash
   bun install
   ```

3. (Optional) Generate Worker types:

   ```bash
   bun run cf-typegen
   ```

### Development

- Start the dev server (frontend + worker proxy):

  ```bash
  bun dev
  ```

  Open [http://localhost:3000](http://localhost:3000).

- Lint codebase:

  ```bash
  bun lint
  ```

## Usage

### Frontend Development

- Add pages in `src/pages/`.
- Use `AppLayout` for sidebar (`src/components/layout/AppLayout.tsx`).
- API calls via `src/lib/api-client.ts` (auto-typed).
- Components in `src/components/ui/` (shadcn), hooks in `src/hooks/`.

### Backend Development

- **API Routes**: Add to `worker/user-routes.ts` (auto-loaded).
- **Entities**: Extend `IndexedEntity` in `worker/entities.ts` (handles CRUD, lists, indexes).
  - Example: `UserEntity`, `ChatBoardEntity` (chats with messages).
- **Seed Data**: Auto-seeds on first list call via `ensureSeed`.
- Test API: `curl http://localhost:3000/api/health`.

**Example API Calls**:

```bash
# List users
curl http://localhost:3000/api/users

# Create chat
curl -X POST http://localhost:3000/api/chats -H "Content-Type: application/json" -d '{"title":"My Chat"}'

# Send message
curl -X POST http://localhost:3000/api/chats/<chatId>/messages -H "Content-Type: application/json" -d '{"userId":"u1","text":"Hello"}'
```

### Building for Production

```bash
bun build
```

Preview:

```bash
bun preview
```

## Deployment

Deploy to Cloudflare Workers with one command:

```bash
bun run deploy
```

Or use Wrangler directly:

```bash
npx wrangler deploy
```

**Custom Domain**: Set `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN` in Wrangler secrets, then:

```bash
wrangler deploy --name my-app
```

[![Deploy to Cloudflare Workers]([![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/baybars03/kocflow))]([![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/baybars03/kocflow))

### Migrations

Durable Objects use automatic SQLite migrations via `wrangler.jsonc`. New classes added to `migrations` array as needed.

## Project Structure

```
├── src/                 # React frontend
│   ├── components/      # UI components (shadcn/ui + custom)
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utilities, API client
│   └── pages/           # Router pages
├── worker/              # Cloudflare Worker backend
│   ├── entities.ts      # Durable Object entities
│   ├── user-routes.ts   # Custom API routes
│   └── index.ts         # Hono app (DO NOT EDIT)
├── shared/              # Shared types
├── tailwind.config.js   # Design system
└── wrangler.jsonc       # Worker config
```

## Customization

- **Theme**: Edit `src/index.css` variables.
- **Sidebar**: Customize `src/components/app-sidebar.tsx`.
- **Home Page**: Replace `src/pages/HomePage.tsx`.
- **Entities**: Add new classes in `worker/entities.ts`, expose in `user-routes.ts`.
- **Remove Sidebar**: Don't wrap pages in `AppLayout`.

## Troubleshooting

- **Worker Routes Fail**: Check `worker/user-routes.ts` exports `userRoutes(app)`.
- **Types Missing**: Run `bun run cf-typegen`.
- **CORS Issues**: API routes auto-handle `/api/*`.
- **Dev Proxy**: Vite proxies `/api/*` to Worker.

## Contributing

1. Fork & clone.
2. Install: `bun install`.
3. Develop: `bun dev`.
4. PR to `main`.

## License

MIT. See [LICENSE](LICENSE) for details.