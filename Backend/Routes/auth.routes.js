import express from "express";
const authRouter = express.Router();
import { signUp,login,logout } from "../Controllers/auth.controllers.js";
import { me } from "../Controllers/user.controllers.js";
import { authenticate } from "../middleware/auth.middleware.js";

authRouter.post("/signup", signUp);
authRouter.post("/login", login);
authRouter.post("/logout", logout);

// Current logged-in user
authRouter.get('/me', authenticate, me);
 
export default authRouter;