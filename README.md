# REST API Template

This REST API template is configured to be used with TypeScript and ES6.

## Baked-in features

TypeScript support
ES6 support
MongoDB support
Built-in register / login system
Works with create-react-app frontend app (Under a "frontend" folder)

## Working routes

**User register**
Route: `POST - /api/user/register`

Body: `{name: String; email: String; password: String}`

**User login**
Route: `POST - /api/user/login`

Body: `{email: String; password: String}`

## Installing it

1.  Clone the repository
2.  `npm i`
3.  Create a `.env` file
4.  In the `.env` file, create the following entries:
    - `MONGO_URI=your_mongodb_uri_here`
    - `PORT=your_port_of_choice`
    - `TOKEN=your_jwt_token_secret`

## Running the app

You have two options available.

1.  Running the api individually with the command `npm run server`
2.  Running the app alongside a create-react-app application with Concurrently.

For this one is necesary to install the React application under a "frontend".

The `npm run dev` script will look for the frontend folder and execute the start script alongside the server script of the API.
