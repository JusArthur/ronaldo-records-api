import express, { Router } from "express";
import * as awardController from "../controllers/awardController";
import { validateRequest } from "../middleware/validate";
import { awardSchemas } from "../validations/awardValidation";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";
import { AuthorizationOptions } from "../models/authorizationOptions";

const router: Router = express.Router();

// "/api/v1/awards" prefixes all below routes

/**
 * @openapi
 * /awards:
 *   get:
 *     summary: Retrieves a list of awards
 *     tags: [Awards]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of Awards
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Award'
 *
 */
router.get("/", 
    authenticate,
    isAuthorized({ hasRole: ["admin"], allowSameUser: true } as AuthorizationOptions),
    awardController.getAllAwards);

/**
 * @openapi
 * /awards:
 *   post:
 *     summary: Create a new award
 *     tags: [Awards]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - year
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Ballon d'Or"
 *               year:
 *                 type: number
 *                 example: "2018"
 *     responses:
 *       201:
 *         description: Award created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Award'
 *       400:
 *         description: Invalid input data
 */
router.post(
    "/",
    authenticate,
    isAuthorized({ hasRole: ["user"] } as AuthorizationOptions),
    validateRequest(awardSchemas.create),
    awardController.createAward
);

export default router;