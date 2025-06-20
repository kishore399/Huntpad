import express from 'express';

import { login,logout,signup,updateProfile, checkAuth, verifyEmail, forgotPassword, resetPassword } from "../controllers/auth.controller.js";
import { validateUser} from "../middlewares/auth.middleware.js";
 
const router = express.Router();

router.post("/signup",signup);
router.post("/login", login);
router.post("/logout",logout);

router.put("/profile",validateUser, updateProfile)

router.get("/validate", validateUser, checkAuth)

router.post("/verifyEmail", verifyEmail);
router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword", resetPassword);




export default router;