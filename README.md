# Supabase Pinger

Simple TypeScript + Bun project that pings Supabase tables hourly to prevent Supabase project sleep.

## Setup

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Copy environment file:

   ```bash
   cp .env.example .env
   ```

3. Update `.env` with your Supabase keys

4. Update `config.json` with your database URLs and table names

## Usage

```bash
# Development
pnpm run dev

# Build
pnpm run build

# Production
pnpm run start
```

The script runs immediately on startup, then every hour thereafter.
