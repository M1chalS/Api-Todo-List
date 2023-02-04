import express from "express";
import {json} from 'body-parser';
import mongoose from "mongoose";
import {todoRouter} from "./routes/todo";
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(json());
app.use(cors());

app.use(todoRouter);

mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.pfspadv.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => console.log("Connected to MongoDB"))
    .catch(e => console.log(e.message));

app.listen(3000, () => {
    console.log("Listening on port 3000");
});
