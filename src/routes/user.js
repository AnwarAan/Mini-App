import { Router } from "express";
import apiHandler from "../modules/user/api-handler.js";
import basicAuth from "../helpers/basic-auth.js";
import jwtAuth from "../helpers/jwt-auth.js";
import upload from "../helpers/multipart.js";

const router = Router();

router.get("/", basicAuth, apiHandler.getUsers);
router.get("/page", basicAuth, apiHandler.getUserPagination);
router.get("/:userId", basicAuth, apiHandler.getuserById);
router.post("/register", basicAuth, upload, apiHandler.registerUser);
router.post("/login", basicAuth, apiHandler.loginUser);
router.put("/:userId", jwtAuth, upload, apiHandler.updateUser);
router.delete("/:userId", jwtAuth, apiHandler.deleteUser);
router.delete("/", basicAuth, apiHandler.deleteUsers);

export default router;
