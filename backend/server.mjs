import cors from "cors";
import "./loadEnvironment.mjs";
import posts from "./routes/posts.mjs";
import users from "./routes/users.mjs";
import User from './models/userSchema.mjs';
import express from "express";
import mongoose from "mongoose";

// User Authentication
import MongoStore from 'connect-mongo';
import passport from "passport";
import session from "express-session";
import LocalStrategy from "passport-local";


const PORT = process.env.PORT || 5050;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set `strictQuery: false` to globally opt into filtering by properties that aren't in the schema
mongoose.set("strictQuery", false);

// Define the database URL to connect to.
const mongoDB = process.env.ATLAS_URI;

// Wait for database to connect, logging an error if there is a problem
main()
  .catch((err) => console.error(err));
  async function main() {
    await mongoose.connect(mongoDB);
  }

// Session Configuration using MongoStore to store sessions in MongoDB
const db = mongoose.connection;

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ mongoUrl: db.client.s.url })
}));

app.use(cors());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));

// Use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/post", posts);
app.use("/u", users);


app.listen(PORT, () => {
  // start the Express server
  console.log(`Server is running on port: ${PORT}`);
  
});