# Emotion Identifier Tool

An interactive learning tool that helps people expand the way they talk about emotions.

The experience starts with the everyday language many people use when asked how they are: "good" or "bad". From there, it guides the user toward more specific feeling words and connects those feelings to underlying human needs.

This project is inspired by Nonviolent Communication (NVC), especially the practice of identifying feelings and needs as a way to build self-awareness, empathy, and clearer communication.

## Why This Exists

Many people can sense that they feel "good", "bad", "off", or "fine", but do not always have the vocabulary to describe what is happening underneath. This tool is designed as a small, approachable learning experience:

- Start with familiar emotional language.
- Explore broader emotional categories.
- Choose more precise feeling words.
- Connect those feelings to needs that may be met or unmet.
- Create a shareable reflection summary.

The long-term direction is to combine design, comic art, AI-assisted iteration, and product development methods to make emotional learning more engaging and accessible.

## Current Features

- Guided seven-step emotion identification flow
- Separate pathways for "good" and "bad" starting points
- Emotion category and specific emotion selection
- Universal needs selection
- Reflection summary
- Social sharing and copy-to-clipboard support
- Downloadable image summary
- Responsive Vite + React frontend

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Lucide icons

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Deploying to GitHub Pages

This repo includes a GitHub Actions workflow at `.github/workflows/deploy-pages.yml`.

To publish:

1. Create a GitHub repository and push this project to the `main` branch.
2. In the GitHub repository, open **Settings -> Pages**.
3. Set **Build and deployment** to **GitHub Actions**.
4. Push to `main` again, or run the **Deploy to GitHub Pages** workflow manually.

The app is configured with relative asset paths so it can run from a GitHub Pages project URL or a custom domain.

## Project Structure

```text
src/
  app/
    components/      # App UI components
    data/            # Emotion and needs vocabulary
    App.tsx          # App shell
  styles/            # Tailwind and global styles
  main.tsx           # React entry point
```

## Planned Improvements

- Add original comic art to make the learning journey more expressive.
- Improve accessibility and keyboard navigation.
- Add a more polished mobile experience for long lists.
- Add reflection prompts and optional journaling.
- Create a stronger case-study narrative around design, AI, and product development.
- Prepare the app for publishing once the visual direction and story are ready.

## Notes

This is an educational reflection tool, not a diagnostic or clinical mental health product. It is intended to support emotional vocabulary, self-awareness, and communication.
