import request from "supertest";
import express, { Request, Response, NextFunction } from "express";

/**
 * Properly mock all middlewares before importing routes
 */
jest.mock("../src/api/v1/middleware/authenticate", () =>
  jest.fn((req: Request, res: Response, next: NextFunction) => next())
);

jest.mock("../src/api/v1/middleware/authorize", () => ({
  __esModule: true,
  default: jest.fn(() => (req: Request, res: Response, next: NextFunction) => next()),
}));

jest.mock("../src/api/v1/middleware/validate", () => ({
  __esModule: true,
  validateRequest: jest.fn(() => (req: Request, res: Response, next: NextFunction) => next()),
}));

jest.mock("../src/api/v1/controllers/matchController", () => ({
  __esModule: true,
  getAllMatches: jest.fn(),
  createMatch: jest.fn(),
  getMatchById: jest.fn(),
  updateMatch: jest.fn(),
  deleteMatch: jest.fn(),
}));

// Import routes only after all mocks are defined
import matchRoutes from "../src/api/v1/routes/matchRoutes";
import * as matchController from "../src/api/v1/controllers/matchController";

const app = express();
app.use(express.json());
app.use("/api/v1/matches", matchRoutes);

describe("Match Routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("GET /api/v1/matches should call getAllMatches", async () => {
    (matchController.getAllMatches as jest.Mock).mockImplementation(
      (req: Request, res: Response) =>
        res.status(200).json([{ id: "1", opponent: "Barcelona" }])
    );

    const res = await request(app).get("/api/v1/matches");
    expect(res.status).toBe(200);
    expect(matchController.getAllMatches).toHaveBeenCalled();
  });

  it("POST /api/v1/matches should call createMatch", async () => {
    (matchController.createMatch as jest.Mock).mockImplementation(
      (req: Request, res: Response) =>
        res.status(201).json({ id: "1", opponent: "Barcelona" })
    );

    const res = await request(app)
      .post("/api/v1/matches")
      .send({ opponent: "Barcelona", date: "2024-04-18", goals: 2, assists: 1 });

    expect(res.status).toBe(201);
    expect(matchController.createMatch).toHaveBeenCalled();
  });

  it("GET /api/v1/matches/:id should call getMatchById", async () => {
    (matchController.getMatchById as jest.Mock).mockImplementation(
      (req: Request, res: Response) => res.status(200).json({ id: req.params.id })
    );

    const res = await request(app).get("/api/v1/matches/123");
    expect(res.status).toBe(200);
    expect(matchController.getMatchById).toHaveBeenCalled();
  });

  it("PUT /api/v1/matches/:id should call updateMatch", async () => {
    (matchController.updateMatch as jest.Mock).mockImplementation(
      (req: Request, res: Response) =>
        res.status(200).json({ id: req.params.id, updated: true })
    );

    const res = await request(app)
      .put("/api/v1/matches/123")
      .send({ goals: 3 });

    expect(res.status).toBe(200);
    expect(matchController.updateMatch).toHaveBeenCalled();
  });

  it("DELETE /api/v1/matches/:id should call deleteMatch", async () => {
    (matchController.deleteMatch as jest.Mock).mockImplementation(
      (req: Request, res: Response) => res.status(200).json({ deleted: true })
    );

    const res = await request(app).delete("/api/v1/matches/123");
    expect(res.status).toBe(200);
    expect(matchController.deleteMatch).toHaveBeenCalled();
  });
});
