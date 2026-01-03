<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/11D1qR-y6k8JUaY-1ucPs7UG0lUk00OCZ

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy (quick options)

You can choose one of these simple options to publish the built site.

1) GitHub Pages (simple, from this repo)

   - Install deploy helper (only needed once):
     `npm install --save-dev gh-pages`
   - Build and publish:
     `npm run deploy`

   This project is configured to build with a relative base so the static files will work on GitHub Pages. After running `npm run deploy` your `dist` will be published to the `gh-pages` branch.

2) Vercel (recommended for easiest continuous deploy)

   - Push your repo to GitHub, sign in to Vercel, and import the project.
   - Vercel will detect Vite. Use the build command `npm run build` and output directory `dist`.

3) Netlify

   - Push to GitHub and connect repository in Netlify.
   - Set build command `npm run build` and publish directory `dist`.

Notes:
 - Put your `GEMINI_API_KEY` into a `.env.local` file for local dev; for production set environment variables in the hosting provider's settings.
 - If you want, I can add a GitHub Actions workflow to auto-deploy on push to main. Tell me which provider you prefer and I can add automated steps.
