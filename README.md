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

### Add the MySQL database and tables

1. Install MySQL if you don't have it on your machine.
2. Unzip the `medeorites.gz` folder.
3. Next import the database `medeorites` to a MySQL client such as TablePlus.

You should see something like this:
<img width="405" alt="image" src="https://github.com/suefeng/earth-meteorite-landings/assets/627540/bce91a2e-2f10-44eb-83d5-500a8478266d">
<img width="478" alt="image" src="https://github.com/suefeng/earth-meteorite-landings/assets/627540/7144a6a8-5c91-47d0-8908-f12c4ff6926d">

Note: I added some filler data since I ran out of time for creating the POST request portion of the app.

### Install the app

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

It was installed with `npx create-next-app@latest`

This app uses `Node.js 18.17.1`. Make sure you have that first. I added a `.nvmrc` and `.tool-versions` depending on if you are using NVM or asdf for the Node.js package manager.

Next, run this to install the modules:

```bash
npm install
```

Create a `.env` file and add these variables:
Edit the variable values to what you have set.

```
MYSQL_USER="root"
MYSQL_PASSWORD=""
SOCKET_PATH="/tmp/mysql.sock"
```

To run the development server:

```bash
npm run dev
```

Navigate to http://localhost:3000

If everything is working, you should see something like this:
<img width="1469" alt="image" src="https://github.com/suefeng/earth-meteorite-landings/assets/627540/1586efe6-657c-48dd-8431-93027e46be1d">


## Instructions for build steps and deployment packaging.

From the generated version of the Next.js install:

In the future, the easiest way to deploy Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out their [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Future:

- sortable by different fields
