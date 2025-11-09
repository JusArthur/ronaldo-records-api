// import the express application and type definition
import express, { Express } from "express";
import matchRoutes from "./api/v1/routes/matchRoutes";
import adminRoutes from "./api/v1/routes/adminRoutes";
import clubRoutes from "./api/v1/routes/clubRoutes";

// create an instance of the express application
const app: Express = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello, World!");
});

// Mount API routes
app.use("/api/v1/matches", matchRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/clubs", clubRoutes);

export default app;