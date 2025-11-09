import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../constants/httpConstants";
import * as awardService from "../services/awardService";
import { Award } from "../models/awardModel";
import { successResponse } from "../models/responseModel";

/**
 * Handles requests and responses to retrieve all award records
 * @param req - express Request
 * @param res - express Response
 * @param next - express middleware chaining function
 */
export const getAllAwards = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const awards: Award[] = await awardService.getAllAwards();
        res.status(HTTP_STATUS.OK).json(
            successResponse(awards, "Awards successfully retrieved")
        );
    }
    catch (error: unknown) {
        next(error);
    }
}

/**
 * Handles requests, responses, and validation to create a new award record
 * @param req - express Request
 * @param res - express Response
 * @param next - express middleware chaining function
 */
export const createAward = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const awardData: Omit<Award, "id"> = req.body;
        const newAward: Award = await awardService.createAward(awardData);
        res.status(HTTP_STATUS.CREATED).json(
            successResponse(newAward, "Award successfully created")
        );
    } catch (error: unknown) {
        next(error);
    }
}