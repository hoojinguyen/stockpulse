# StockPulse

StockPulse is a web-based application designed to empower retail investors in Vietnam by providing aggregated financial news, stock market data, and educational content on long-term investment strategies.

## Project Structure

The project follows a clean architecture with separate frontend and backend components:

```
stockpulse/
├── frontend/               # Next.js frontend application
│   ├── src/
│   │   ├── app/            # Next.js app router pages
│   │   ├── components/     # Reusable UI components
│   │   └── lib/            # Utility functions and shared code
│   └── public/             # Static assets
├── backend/                # Node.js/Express backend application
│   └── src/
│       ├── api/            # API routes and controllers
│       ├── services/       # Business logic layer
│       ├── models/         # Database models and schemas
│       ├── utils/          # Helper functions
│       └── config/         # Configuration files
└── .github/
    └── workflows/          # CI/CD workflow configurations
```

## Getting Started

### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Backend (Coming Soon)

The backend will be implemented in Phase 1 of the project.

## Implementation Plan

The project is being implemented in phases as outlined in the Product Requirement Document:

### Phase 1: MVP (Current)
- Set up Next.js with Tailwind CSS
- Integrate NewsAPI and Yahoo Finance for news and stock data
- Build UI for news feed and stock info
- Deploy on Vercel

### Phase 2: Educational Content
- Add static pages for investment strategies
- Include financial term explanations
- Test UX with peers

### Phase 3: User Accounts
- Implement Clerk for authentication
- Enable watchlist and preference saving

### Phase 4: Advanced Features
- Add portfolio tracking
- Explore VADER for sentiment analysis
- Optimize performance and mobile design

## Technologies Used

- **Frontend**: Next.js, TypeScript, Tailwind CSS, shadcn/ui
- **Backend** (planned): Node.js, Express.js, PostgreSQL with Prisma ORM
- **APIs** (planned): NewsAPI, Yahoo Finance, Alpha Vantage
- **Deployment**: Vercel (frontend), Railway (backend)
- **Authentication** (planned): Clerk or Supabase Auth
- **Caching** (planned): Redis

## License

This project is for educational purposes only.