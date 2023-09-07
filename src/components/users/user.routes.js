import { Router } from "express";
import { deleteUser, getAllUsers, getUserById, updateUser, uploadUser } from "./user.controllers.js";

const router = Router();

//obtener todos los usuarios

router.get('/users', getAllUsers);
router.post('/users', uploadUser);
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser)

export default router;