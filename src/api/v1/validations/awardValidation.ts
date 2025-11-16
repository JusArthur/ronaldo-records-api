

import Joi from "joi";
import { RequestSchema } from "../middleware/validate";

/**
 * @openapi
 * components:
 *   schemas:
 *     Award:
 *       type: object
 *       required:
 *         - name
 *         - year
 *       properties:
 *         id:
 *           type: string
 *           description: Firestore auto-generated document ID
 *           example: "qZxE9HkR2Ljs8Df23GmP"
 *         name:
 *           type: string
 *           description: Name of the award
 *           example: "Ballon d'Or"
 *         year:
 *           type: number
 *           description: Year the award was received
 *           example: 2017
 */

/**
 * Award schema organized by request type
 */
export const awardSchemas: Record<string, RequestSchema> = {
    // POST /api/v1/awards - Create new award
    create: {
        body: Joi.object({
            name: Joi.string().required().messages({
                "any.required": "Award name is required",
                "string.empty": "Award name cannot be empty",
            }),
            year: Joi.number().integer().min(1800).max(new Date().getFullYear()).required().messages({
                "any.required": "Year is required",
                "number.base": "Year must be a number",
                "number.min": "Year must be after 1800",
                "number.max": "Year cannot be in the future",
            }),
        }),
    },
};
