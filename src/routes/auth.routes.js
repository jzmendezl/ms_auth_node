import {Router} from "express";
import {signin, signup} from "../controllers/user.controller.js";
import passport from "passport";



const router = Router();

router.post("/signup", signup);

router.post("/signin", signin);

// router.post("/signup", signup);

// router.post("/signin/federated/google", passport.authenticate('google'), signin);

export default router;