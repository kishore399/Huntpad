import express from 'express';

import { login,logout,signup,updateProfile } from "../controllers/auth.controller.js";
import { validateUser} from "../middlewares/auth.middleware.js";
 
const router = express.Router();

router.post("/signup",signup);

router.post("/login", login);

router.post("/logout",logout);

router.put("/profile", updateProfile)


export default router;