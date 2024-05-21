# Readme

## Prompt for Earth Meteorite Landing with planning notes

Our client has asked us to build a web application that easily allows them to visualize, filter, and understand trends from the Earth Meteorite Landing dataset from NASA:

- Overview of dataset: [Meteorite Landings | NASA Open Data Portal](https://data.nasa.gov/Space-Science/Meteorite-Landings/gh4g-9sfh)
- Direct link to JSON file: https://data.nasa.gov/resource/y77d-th95.json

Some key features that the client requested:

1. The ability to view the dataset in an organized, sensible way.

   - table view with each field in its own column
   - data sortable by column
   - a way to filter the data
   - added caching for the main page so data doesn't need to be refetched from the API as often.

2. The ability to search for individual meteorites by Name and/or ID.

   - searchable and display results as you type

3. The ability to save a list of their favorite meteorites that persists across browser sessions and tabs.

   - Ran out of time for this section to finish, but there's a favorites list through `/api/v1/favorites/earthling` that gets the dumy data from the database
   - Has `users` table with one user
   - Has `meteorite_favorites` with favorites of that user
   - Creating and deleting favorites
   - Would like a more user friendly way to display favorites in the future like a star or heart and filled in if it's favorited
   - Updated table naming to correct spelling of "meteorite" wherever "meteorite" was used

## Other requirements

- Use a modern JS framework (e.g. React or Vue): Uses Next.js with React
- Consistent look and feel: Uses Tailwind CSS
- Responsive: could be better with more time, to display the table in more mobile friendly way
- Uses Material UI: Uses MUI `DataGrid` with `GridToolbar`

## How to run the testing framework locally

### Add the MySQL database and tables

1. Install MySQL if you don't have it on your machine ie via `brew install mysql`.
2. Unzip the `meteorites.gz` folder.
3. Setup and connect to a MySQL client such as TablePlus.

   <img width="653" alt="image" src="https://github.com/suefeng/earth-meteorite-landings/assets/627540/9a91d10c-9be7-4110-ab83-06d1b3aba232">
   <img width="524" alt="image" src="https://github.com/suefeng/earth-meteorite-landings/assets/627540/ed7dbab6-219e-4930-9a5a-f9ab5d347f12">

4. Create the database by adding a new one to the connection called `meteorites`

   <img width="448" alt="image" src="https://github.com/suefeng/earth-meteorite-landings/assets/627540/2b070d9c-e230-4a85-a805-69ce9e42e5a1">

5. Connect to the database.

   <img width="415" alt="image" src="https://github.com/suefeng/earth-meteorite-landings/assets/627540/71ae73a2-ccef-44e2-b700-741171553751">

6. Import the gzipped database contents

   <img width="404" alt="image" src="https://github.com/suefeng/earth-meteorite-landings/assets/627540/515fc271-d1aa-45f6-828a-33d805919611">

You should see something like this:

<img width="769" alt="image" src="https://github.com/suefeng/earth-meteorite-landings/assets/627540/b81fbfec-ead2-4f2a-9b07-4030d32e5356">

<img width="694" alt="image" src="https://github.com/suefeng/earth-meteorite-landings/assets/627540/f41656ca-98fb-4560-8397-0e2830eea47b">

Note: I added some filler data since I ran out of time for creating the POST request portion of the app.

### Install the app

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

It was installed with `npx create-next-app@latest`

This app uses `Node.js 18.17.1`. Make sure you have that first. I added a `.nvmrc` and `.tool-versions` depending on if you are using NVM or asdf for the Node.js package manager, so it should work automatically if all goes well.

`node --version` should return something like `v18.17.1`.

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

Navigate to http://localhost:3002

If everything is working, you should see something like this:

<img width="1341" alt="image" src="https://github.com/suefeng/earth-meteorite-landings/assets/627540/00160816-0aa7-4060-bd1a-db957d224505">


Navigate to the Favorites page and you should see something like this if it's working:

<img width="1316" alt="image" src="https://github.com/suefeng/earth-meteorite-landings/assets/627540/4d9c4c55-2a2f-4fa9-8f2b-b4f12d7105e8">

In both views you should be able to filter, search, and sort the data.

<img width="553" alt="image" src="https://github.com/suefeng/earth-meteorite-landings/assets/627540/33af8e44-c998-4f01-a730-6a59d76d6ce6">

<img width="345" alt="image" src="https://github.com/suefeng/earth-meteorite-landings/assets/627540/c551be9c-db1d-4c38-bd0a-223383d35e6b">

Geocoordinates on a map

<img width="1313" alt="image" src="https://github.com/suefeng/earth-meteorite-landings/assets/627540/73d8848f-31e6-4722-a051-2b38b664a616">

Meteorites by year

<img width="1280" alt="image" src="https://github.com/suefeng/earth-meteorite-landings/assets/627540/5c187bbd-e136-47e9-b8ff-c9cf21b9d390">

## Instructions for build steps and deployment packaging.

From the generated version of the Next.js install:

The easiest way to deploy Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out their [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Future implementations:

- [ ] Add automated tests
- [x] Finish adding a way to submit and remove favorites
- [ ] Create a user signup system
- [ ] Create user login and session
- [ ] Provide another way to view data other than just in a table
- [x] Improve table display, especially the Geolocation column
- [ ] More mobile-friendly display
- [ ] Display as cards
- [x] Display geocoordinates on a map with tooltips
- [x] Display a graph for representing the number of meteorites per year
- [ ] A better way to handle when the api is down such as refetching, and displaying a message to the user that the data is temporarily unavailable
- [x] Darkmode enabled
