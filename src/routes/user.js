import { Router } from "express";
import apiHandler from "../modules/user/api-handler.js";
import upload from "../helpers/multipart.js";

const router = Router();

router.get("/", apiHandler.getUser);
router.get("/:userId", apiHandler.getuserById);
router.post("/register", upload.single("photo"), apiHandler.registerUser);
router.post("/login", apiHandler.loginUser);
router.put("/:userId", upload.single("photo"), apiHandler.updateUser);
router.delete("/:userId", apiHandler.deleteUser);
router.delete("/", apiHandler.deleteUsers);

export default router;
