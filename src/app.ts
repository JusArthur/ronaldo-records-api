// import the express application and type definition
import express, { Express } from "express";
import matchRoutes from "./api/v1/routes/matchRoutes";
import adminRoutes from "./api/v1/routes/adminRoutes";
import clubRoutes from "./api/v1/routes/clubRoutes";
import awardRoutes from "./api/v1/routes/awardRoutes";
import { geoMiddleware } from "./api/v1/middleware/geoMiddleware";
import setupSwagger from "../config/swagger";

// create an instance of the express application
const app: Express = express();

app.use(express.json());

// Apply Geo Middleware globally
app.use(geoMiddleware);

app.get("/", (req, res) => {
    res.send("Hello, World!");
});

// Mount API routes
app.use("/api/v1/matches", matchRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/clubs", clubRoutes);
app.use("/api/v1/awards", awardRoutes);

setupSwagger(app);

export default app;