// import the express application and type definition
import express, { Express } from "express";

// create an instance of the express application
const app: Express = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello, World!");
});

export default app;