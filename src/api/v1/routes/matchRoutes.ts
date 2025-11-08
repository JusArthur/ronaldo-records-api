import express, { Router } from "express";
import * as matchController from "../controllers/matchController.js";

const router: Router = express.Router();

// "/api/v1/matches" prefixes all below routes

/**
 * @openapi
 * /matches:
 *   get:
 *     summary: Retrieves a list of matches
 *     tags: [Matches]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of Matches
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Match'
 *
 */
router.get("/", matchController.getAllMatches);

// sequential order authenticate -> isAuthorized -> validateRequest -> createMatch

/**
 * @openapi
 * /matches:
 *   post:
 *     summary: Create a new match record
 *     tags: [Matches]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - opponent
 *               - date
 *               - goals
 *               - assists
 *             properties:
 *               opponent:
 *                 type: string
 *                 example: "Barcelona"
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2024-04-18"
 *               goals:
 *                 type: number
 *                 example: 2
 *               assists:
 *                 type: number
 *                 example: 1
 *               hatTrick:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       201:
 *         description: Match created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Match'
 *       400:
 *         description: Invalid input data
 */
router.post(
    "/",
    matchController.createMatch
);

