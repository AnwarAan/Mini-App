import { Router } from "express";
import mysqlUserHandler from "../../modules/mysql/user/api-handler.js";

const router = Router();

router.get("/", mysqlUserHandler.getUser);
router.get("/:userId", mysqlUserHandler.getUserById);

router.post("/register", mysqlUserHandler.registerUser);

router.put("/:userId", mysqlUserHandler.updateUser);

router.delete("/:userId", mysqlUserHandler.deleteUser);

export default router;
