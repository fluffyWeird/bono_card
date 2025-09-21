import express from "express";
import multer from "multer";
import {
  checkUser,
  registerUser,
  getUserById,
  getAllUser,
} from "../controllers/userController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/input-id", checkUser); // return JSON instead of redirect
router.post("/register", registerUser);
router.get("/:telegramId", getUserById); // fetch by ObjectId
router.get("/", getAllUser);
export default router;
