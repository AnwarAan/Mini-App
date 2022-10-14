import { Router } from "express";
import apiHandler from "../modules/user/api-handler.js";

const router = Router();

router.get("/", apiHandler.getUser);
router.get("/:userId", apiHandler.getuserById);
router.post("/register", apiHandler.registerUser);
router.post("/login", apiHandler.loginUser);
router.put("/:userId", apiHandler.updateUser);
router.delete("/:userId", apiHandler.deleteUser);
router.delete("/", apiHandler.deleteUsers);

export default router;
