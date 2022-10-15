import { Router } from "express";
import apiHandler from "../modules/user/api-handler.js";
import basicAuth from "../helpers/basic-auth.js";
import jwtAuth from "../helpers/jwt-auth.js";
import upload from "../helpers/multipart.js";

const router = Router();

router.get("/", basicAuth, apiHandler.getUser);
router.get("/:userId", basicAuth, apiHandler.getuserById);
router.post("/register", basicAuth, upload.single("photo"), apiHandler.registerUser);
router.post("/login", basicAuth, apiHandler.loginUser);
router.put("/:userId", upload.single("photo"), jwtAuth, apiHandler.updateUser);
router.delete("/:userId", jwtAuth, apiHandler.deleteUser);
router.delete("/", jwtAuth, apiHandler.deleteUsers);

export default router;
