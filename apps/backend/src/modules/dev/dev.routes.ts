import { Router } from "express";
import { deleteUserByEmail } from "./dev.controller.js";

const router = Router();

router.delete("/users", deleteUserByEmail);

export default router;
