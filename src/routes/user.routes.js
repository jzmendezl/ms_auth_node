import {Router} from "express";
import {getUsers, updateUser, deleteUser, getUser} from "../controllers/user.controller.js";

const router = Router();

router.get("/", getUsers);

router.get("/:id", getUser);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

export default router;