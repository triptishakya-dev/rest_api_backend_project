import express from "express";
import {
  postUser,
  getUsers,
  getUserById,
  putUser,
  patchUser,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

// All routes under /api/users
router.post("/", postUser);       // Create user
router.get("/", getUsers);        // Get all users
router.get("/:id", getUserById);  // Get single user
router.put("/:id", putUser);      // Update full user
router.patch("/:id", patchUser);  // Update partially
router.delete("/:id", deleteUser); // Delete user

export default router;
