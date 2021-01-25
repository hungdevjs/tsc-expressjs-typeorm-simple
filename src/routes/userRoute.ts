
import { Router } from "express"
import UserController from "..//controllers/UserController"

const router = Router()

router.get("/", UserController.get)
router.get("/:id", UserController.getById)
router.post("/", UserController.add)

export default router