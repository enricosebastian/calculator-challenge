This is a Next.js app integrated with MongoDB. This is based on the [template](https://github.com/enricosebastian/next-mongo) I did for the same tech stack.

This was originally a challenge that was given to me for a job application, and decided to show it off as part of my full stack knowledge (creating the frontend+making sure an actual live database is in use)

## How to run locally
1. Clone the repository
1. Go to the repo folder in your local computer and run `npm install` to get all the necessary node modules and libraries
1. Create a `.env.local` file that stores the values `MONGODB_URI`, `NODE_ENV`, and `API_URL`
```
// what these environment variables mean
MONGODB_URI --> the MongoDB connection string
NODE_ENV --> usually "developer", but if you're running it in prod, set value as "production"
API_URL --> when running locally, set it as https://localhost:3000/ or whatever port number you're running in right now
```
```
// sample .env.local
MONGODB_URI="mongodb+srv://<username>:<password>@<database-name.weird-code>.mongodb.net/?retryWrites=true&w=majority"
NODE_ENV="developer"
API_URL="http://localhost:3000"
```
4. Run the Next.js command `npm run dev` to have the site run locally
1. If you have set everything correctly, you will be able to access http://localhost:3000 with no issues

## How to run online