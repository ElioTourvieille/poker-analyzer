# Poker Analyzer

A modern web application for analyzing poker hands and tracking your game performance.

## Features

- Track poker hands with detailed information
- Record actions, results, and notes for each hand
- Support for tournament and cash game tracking
- Modern UI with Next.js and Tailwind CSS
- Real-time data with Convex backend

## Tech Stack

- Next.js 15
- React 19
- TypeScript
- Convex (Backend & Database)
- Tailwind CSS
- ESLint

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/yourusername/poker-analyzer.git
cd poker-analyzer
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up your Convex project:

- Create a new project at [Convex](https://dashboard.convex.dev)
- Copy your deployment URL to `.env.local`

4. Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

```
poker-analyzer/
├── app/              # Next.js app directory
├── convex/           # Convex backend functions and schema
├── public/           # Static assets
└── ...
```

## Database Schema

The application uses Convex with the following schema:

- `hands`: Table for storing poker hand data
  - `id`: Unique identifier
  - `player`: Player name
  - `hand`: Starting hand
  - `flop`: Flop cards
  - `turn`: Turn card
  - `river`: River card
  - `actions`: Array of actions taken
  - `result`: Hand result
  - `date`: Hand date
  - `tournament`: Tournament name (optional)
  - `buyIn`: Buy-in amount (optional)
  - `notes`: Additional notes (optional)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
