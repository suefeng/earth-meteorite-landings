# Readme

## Prompt for Earth Meteorite Landing with planning notes

Our client has asked us to build a web application that easily allows them to visualize, filter, and understand trends from the Earth Meteorite Landing dataset from NASA:

- Overview of dataset: [Meteorite Landings | NASA Open Data Portal](https://data.nasa.gov/Space-Science/Meteorite-Landings/gh4g-9sfh)
- Direct link to JSON file: https://data.nasa.gov/resource/y77d-th95.json

Some key features that the client requested:

1. The ability to view the dataset in an organized, sensible way.

   Viewing options:

   - table view with each field in its own column
   - card view with each Meteorite on its own card

2. The ability to search for individual meteorites by Name and/or ID.

   - filter and display results as you type

3. The ability to save a list of their favorite meteorites that persists across browser sessions and tabs.

   - store in a db table such as `favorites` so it can persist across browsers and sessions
     - Store `id` of the meteorite, `id` of the user
   - may have a `users` table too to assign favorites to each user
     - Store `username` as unique identifier

## Other requirements

- Use a modern JS framework (e.g. React or Vue)
- Consistent look and feel
- Responsive
- Uses Material UI

## How to run the testing framework locally

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

It was installed with `npx create-next-app@latest`

This app uses `Node.js 18.17.1`. Make sure you have that first.

Next, run this to install the modules:

```bash
npm install
```

To run the development server:

```bash
npm run dev
```

## Instructions for build steps and deployment packaging.

From the generated version of the Next.js install:

In the future, the easiest way to deploy Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out their [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Future:

- sortable by different fields
