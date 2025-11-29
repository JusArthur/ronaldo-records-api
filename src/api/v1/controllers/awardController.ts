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
 * Handles requests, response to retrieve an award record by ID
 * @param req - express Request
 * @param res - express Response
 * @param next - express middleware chaining function
 */
export const getAwardById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id }: { id?: string } = req.params;
        const award: Award | null = await awardService.getAwardById(id as string);

        if (!award) {
            res.status(HTTP_STATUS.NOT_FOUND).json(
                successResponse(null, "Award not found")
            );
            return;
        }

        res.status(HTTP_STATUS.OK).json(
            successResponse(award, "Award successfully retrieved")
        );
    } catch (error: unknown) {
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
        const awardData: Omit<Award, "id"> = req.body as Omit<Award, "id">;
        const newAward: Award = await awardService.createAward(awardData);
        res.status(HTTP_STATUS.CREATED).json(
            successResponse(newAward, "Award successfully created")
        );
    } catch (error: unknown) {
        next(error);
    }
}

/**
 * Handles requests and responses to update an existing award record
 * @param req - express Request
 * @param res - express Response
 * @param next - express middleware chaining function
 */
export const updateAward = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id }: { id?: string } = req.params;
        const awardData: Partial<Award> = req.body as Partial<Award>;

        const updatedAward: Award = await awardService.updateAward(id as string, awardData);

        res.status(HTTP_STATUS.OK).json(
            successResponse(updatedAward, "Award updated successfully")
        );
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Handles requests and responses to delete an award record
 * @param req - express Request
 * @param res - express Response
 * @param next - express middleware chaining function
 */
export const deleteAward = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id }: { id?: string } = req.params;
        await awardService.deleteAward(id as string);

        res.status(HTTP_STATUS.OK).json(
            successResponse(null, "Award successfully deleted")
        );
    } catch (error: unknown) {
        next(error);
    }
};