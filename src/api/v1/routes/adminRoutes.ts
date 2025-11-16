import express, { Router } from "express";
import { setCustomClaims } from "../controllers/adminController";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";
import { AuthorizationOptions } from "../models/authorizationOptions";

const router: Router = express.Router();

router.post(
    "/setCustomClaims",
    authenticate,
    setCustomClaims,
    isAuthorized({ hasRole: ["admin"], allowSameUser: true } as AuthorizationOptions)
);

export default router;