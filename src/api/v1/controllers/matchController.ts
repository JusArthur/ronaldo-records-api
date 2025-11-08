import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../constants/httpConstants";
import * as matchService from "../services/matchService";
import { Match } from "../models/matchModel";
import { successResponse } from "../models/responseModel";

/**
 * Handles requests and responses to retrieve all match records
 * @param req - The express Request
 * @param res - The express Response
 * @param next - The express middleware chaining function
 */
export const getAllMatches = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const matches: Match[] = await matchService.getAllMatches();
        res.status(HTTP_STATUS.OK).json(
            successResponse(matches, "Matches successfully retrieved")
        );
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Handles requests, responses, and validation to create a new match record
 * @param req - The express Request
 * @param res - The express Response
 * @param next - The express middleware chaining function
 */
export const createMatch = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { opponent, date, goals, assists, hatTrick } = req.body;

        const newMatch: Match = await matchService.createMatch({
            opponent,
            date,
            goals,
            assists,
        });

        res.status(HTTP_STATUS.CREATED).json(
            successResponse(newMatch, "Match created successfully")
        );
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Handles requests and responses to update an existing match record
 * @param req - The express Request
 * @param res - The express Response
 * @param next - The express middleware chaining function
 */
export const updateMatch = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        const { opponent, date, goals, assists, hatTrick } = req.body;

        const updatedMatch: Match = await matchService.updateMatch(id, {
            opponent,
            date,
            goals,
            assists,
        });

        res.status(HTTP_STATUS.OK).json(
            successResponse(updatedMatch, "Match updated successfully")
        );
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Handles requests and responses to delete a match record
 * @param req - The express Request
 * @param res - The express Response
 * @param next - The express middleware chaining function
 */
export const deleteMatch = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        await matchService.deleteMatch(id);

        res.status(HTTP_STATUS.OK).json(
            successResponse("Match successfully deleted")
        );
    } catch (error: unknown) {
        next(error);
    }
};
