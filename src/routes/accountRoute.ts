
import { Router } from "express"
import AccountController from "../controllers/AccountController"

const router = Router()

router.post("/logIn", AccountController.logIn)

export default router