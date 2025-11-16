import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../constants/httpConstants";
import * as clubService from "../services/clubService";
import { Club } from "../models/clubModel";
import { successResponse } from "../models/responseModel";

/**
 * Handles requests and responses to retrieve all club records
 * @param req - express Request
 * @param res - express Response
 * @param next - express middleware chaining function
 */
export const getAllClubs = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const clubs: Club[] = await clubService.getAllClubs();
        res.status(HTTP_STATUS.OK).json(
            successResponse(clubs, "Clubs successfully retrieved")
        );
    }
    catch (error: unknown) {
        next(error);
    }
}

/**
 * Handles requests, responses, and validation to create a new club record
 * @param req - express Request
 * @param res - express Response
 * @param next - express middleware chaining function
 */
export const createClub = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const clubData: Omit<Club, "id"> = req.body;
        const newClub: Club = await clubService.createClub(clubData);
        res.status(HTTP_STATUS.CREATED).json(
            successResponse(newClub, "Club successfully created")
        );
    } catch (error: unknown) {
        next(error);
    }
}