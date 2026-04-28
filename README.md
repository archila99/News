# Media News Viewer (React + Vercel Serverless API)

A full-stack news app that displays the latest **US media/entertainment headlines** in a clean, responsive UI.

- Frontend: **React** (Bootstrap UI)
- Backend: **Vercel Serverless Function** (`/api/news`)
- Data source: **Mediastack** (Live news → US entertainment)

## Tech Stack

- React
- JavaScript
- Vercel Serverless Functions
- Mediastack
- Bootstrap

## Features

- Live media news feed
- Serverless backend (no Express server)
- Fast API responses
- Clean responsive UI (Bootstrap cards)
- Environment variable security (API key never exposed to the frontend)

## Project Structure

```
/api
  news.js
/src
  components
  App.js
  index.js
/public
package.json
.env.example
README.md
```

## Setup Instructions

### 1) Clone repo

```bash
git clone <repo-url>
cd <project-folder>
```

### 2) Install dependencies

```bash
npm install
```

### 3) Add environment variable

Create a `.env` file in the project root:

```bash
MEDIASTACK_ACCESS_KEY=your_access_key_here
```

You can copy from `.env.example`.

### 4) Run locally

```bash
npm run dev
```

This runs the React frontend and the serverless API together (recommended for local development).

## API Endpoint

- `GET /api/news`
  - Returns the raw NewsAPI JSON response (including `articles`) for US media/entertainment headlines.

## Deployment (Vercel)

1. Push the repository to GitHub
2. Import the repo into Vercel
3. Add the environment variable in Vercel:
   - `NEWS_API_KEY`
4. Deploy (Vercel will build and deploy automatically)

## Notes

- No backend server is required (fully serverless).
- Keep your Mediastack access key private. It must only be configured as an environment variable.
