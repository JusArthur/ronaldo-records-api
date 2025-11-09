import { Request, Response, NextFunction } from "express";
import * as matchController from "../src/api/v1/controllers/matchController";
import * as matchService from "../src/api/v1/services/matchService";
import { HTTP_STATUS } from "../src/api/constants/httpConstants";
import { Match } from "../src/api/v1/models/matchModel";

// Mock the matchService module
jest.mock("../src/api/v1/services/matchService");

// Unit tests for matchController
describe("Match Controller", () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    jest.clearAllMocks();
    mockReq = { params: {}, body: {} };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
  });

  // Tests for getAllMatches controller method
  describe("getAllMatches", () => {
    it("should return all matches successfully", async () => {
      const mockMatches: Match[] = [
        { id: "1", opponent: "Barcelona", date: "2021-05-01", goals: 2, assists: 1 },
      ];
      (matchService.getAllMatches as jest.Mock).mockResolvedValue(mockMatches);

      await matchController.getAllMatches(mockReq as Request, mockRes as Response, mockNext);

      expect(matchService.getAllMatches).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: "success",
        message: "Matches successfully retrieved",
        data: mockMatches,
      });
    });

    // Error handling test
    it("should call next with error if service fails", async () => {
      const error = new Error("Service error");
      (matchService.getAllMatches as jest.Mock).mockRejectedValue(error);

      await matchController.getAllMatches(mockReq as Request, mockRes as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });

  // Tests for createMatch controller method
  describe("createMatch", () => {
    it("should create a match successfully", async () => {
      const mockBody = { opponent: "Real Madrid", date: "2022-01-01", goals: 1, assists: 0 };
      const mockMatch: Match = { id: "1", ...mockBody };

      mockReq.body = mockBody;
      (matchService.createMatch as jest.Mock).mockResolvedValue(mockMatch);

      await matchController.createMatch(mockReq as Request, mockRes as Response, mockNext);

      expect(matchService.createMatch).toHaveBeenCalledWith(mockBody);
      expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.CREATED);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: "success",
        message: "Match created successfully",
        data: mockMatch,
      });
    });

    it("should call next with error if service fails", async () => {
      const error = new Error("Service error");
      (matchService.createMatch as jest.Mock).mockRejectedValue(error);

      await matchController.createMatch(mockReq as Request, mockRes as Response, mockNext);
      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });

  // Tests for updateMatch controller method
  describe("updateMatch", () => {
    it("should update a match successfully", async () => {
      const mockBody = { opponent: "Juventus", date: "2023-01-01", goals: 3, assists: 2 };
      const mockMatch: Match = { id: "1", ...mockBody };

      mockReq.body = mockBody;
      mockReq.params = { id: "1" };
      (matchService.updateMatch as jest.Mock).mockResolvedValue(mockMatch);

      await matchController.updateMatch(mockReq as Request, mockRes as Response, mockNext);

      expect(matchService.updateMatch).toHaveBeenCalledWith("1", mockBody);
      expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: "success",
        message: "Match updated successfully",
        data: mockMatch,
      });
    });

    it("should call next with error if service fails", async () => {
      const error = new Error("Service error");
      mockReq.params = { id: "1" };
      (matchService.updateMatch as jest.Mock).mockRejectedValue(error);

      await matchController.updateMatch(mockReq as Request, mockRes as Response, mockNext);
      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });

  // Tests for deleteMatch controller method
  describe("deleteMatch", () => {
    it("should delete a match successfully", async () => {
      mockReq.params = { id: "1" };
      (matchService.deleteMatch as jest.Mock).mockResolvedValue(undefined);

      await matchController.deleteMatch(mockReq as Request, mockRes as Response, mockNext);

      expect(matchService.deleteMatch).toHaveBeenCalledWith("1");
      expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: "success",
        message: undefined,
        data: "Match successfully deleted",
      });
      
    });

    it("should call next with error if service fails", async () => {
      const error = new Error("Service error");
      mockReq.params = { id: "1" };
      (matchService.deleteMatch as jest.Mock).mockRejectedValue(error);

      await matchController.deleteMatch(mockReq as Request, mockRes as Response, mockNext);
      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });
});
