import express, { Router } from "express";
import * as clubController from "../controllers/clubController";
import { validateRequest } from "../middleware/validate";
import { clubSchemas } from "../validations/clubValidation";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";
import { AuthorizationOptions } from "../models/authorizationOptions";

const router: Router = express.Router();

// "/api/v1/clubs" prefixes all below routes

/**
 * @openapi
 * /clubs:
 *      get:
 *          summary: Retrieves a list of clubs
 *      tags: [Clubs]
 *          security:
 *              - bearerAuth: []
 *              responses:
 *              200:
 *              description: A list of Clubs
 *              content:
 *              application/json:
 *              schema:
 *              type: array
 *              items:
 *              $ref: '#/components/schemas/Club'
 *
 */
router.get(
  "/",
  authenticate,
  isAuthorized({
    hasRole: ["admin"],
    allowSameUser: true,
  } as AuthorizationOptions),
  clubController.getAllClubs
);

/**
 * @openapi
 * /clubs:
 *      post:
 *          summary: Create a new club record
 *          tags: [Clubs]
 *          security:
 *              - bearerAuth: []
 *              requestBody:
 *              required: true
 *          content:
 *              application/json:
 *          schema:
 *              type: object
 *          required:
 *              - name
 *              - season
 *              - goals
 *              - assists
 *          properties:
 *              name:
 *                  type: string
 *                  example: "Manchester United"
 *              seasons:
 *                  type: string
 *                  example: "2003-2009"
 *              goals:
 *                  type: number
 *                  example: 145
 *              assists:
 *                  type: number
 *                  example: 37
 *              responses:
 *                  201:
 *                  description: Club created successfully
 *                  content:
 *                      application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Club'
 *                  400:
 *                      description: Invalid input data
 */
router.post(
  "/",
  authenticate,
  isAuthorized({ hasRole: ["user"] } as AuthorizationOptions),
  validateRequest(clubSchemas.create),
  clubController.createClub
);

/**
 * @openapi
 * /clubs/{id}:
 *      get:
 *          summary: Retrieves a club by ID
 *      tags: [Clubs]
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - in: path
 *          name: id
 *          required: true
 *          schema:
 *          type: string
 *          description: Club document ID
 *      responses:
 *          200:
 *              description: Club retrieved successfully
 *              content:
 *                  application/json:
 *              schema:
 *                  $ref: '#/components/schemas/Club'
 *          404:
 *              description: Club not found
 */
router.get(
  "/:id",
  authenticate,
  isAuthorized({
    hasRole: ["admin"],
    allowSameUser: true,
  } as AuthorizationOptions),
  clubController.getClubById
);

/**
 * @openapi
 * /clubs/{id}:
 *          put:
 *              summary: Update an existing club record
 *          tags: [Clubs]
 *          security:
 *              - bearerAuth: []
 *          parameters:
 *              - in: path
 *              name: id
 *                  required: true
 *              schema:
 *                  type: string
 *                  description: Club document ID
 *              requestBody:
 *                  required: true
 *              content:
 *                  application/json:
 *          schema:
 *              $ref: '#/components/schemas/Club'
 *          responses:
 *              200:
 *                  description: Club updated successfully
 *              404:
 *                  description: Club not found
 */
router.put(
  "/:id",
  authenticate,
  isAuthorized({
    hasRole: ["admin"],
    allowSameUser: true,
  } as AuthorizationOptions),
  validateRequest(clubSchemas.update),
  clubController.updateClub
);

/**
 * @openapi
 * /clubs/{id}:
 *      delete:
 *          summary: Delete a club record
 *      tags: [Clubs]
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - in: path
 *      name: id
 *          required: true
 *      schema:
 *          type: string
 *      description: Club document ID
 *      responses:
 *              200:
 *                  description: Club deleted successfully
 *              404:
 *                  description: Club not found
 */
router.delete(
  "/:id",
  authenticate,
  isAuthorized({ hasRole: ["admin"] } as AuthorizationOptions),
  clubController.deleteClub
);

export default router;
