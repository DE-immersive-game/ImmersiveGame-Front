This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Datas envoyées au front

## Types

```bash
team: TeamType
export type TeamType = 'team_a' | 'team_b';
```

```bash
status: teamStatus
export type teamStatus = 'success' | 'error';
```

## Démarrage du jeu

```bash
{
  "event": "startGame",
  "data": { startTimestamp }
}
```

```bash
    startTimestamp = timestamp
```

## Fin du jeu

```bash
{
  "event": "teamScore",
  "data": score_data,
}
```

```bash
const score_data = {
      team_a: this.gameStates['team_a'].score,
      team_b: this.gameStates['team_b'].score,
      result:
        this.gameStates['team_a'].score > this.gameStates['team_b'].score
          ? 'team_a'
          : this.gameStates['team_a'].score < this.gameStates['team_b'].score
            ? 'team_b'
            : 'draw',
    };
```

## Score Actuel

```bash
{
  "event": "currentScore",
  "data": data,
}
```

```bash
    const data = {
      team: team,
      score: current_score,
    };
```

## Reset le jeu

```bash
{
  "event": "resetGame",
  "data": '',
}
```

## Envoi de la Séquence

```bash
{
  "event": "sendSequence",
  "data": data,
}
```

```bash
    const data = {
      team: team,
      sequence: this.gameStates[team].teamSequence,
    };
```

## Verification de la séquence à chaque appui

```bash
{
  "event": "teamStatus",
  "data": [team, status],
}
```
