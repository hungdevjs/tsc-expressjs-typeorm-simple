import { Router } from "express"

import auth from "../middlewares/auth"

import userRoute from "./userRoute"
import accountRoute from "./accountRoute"

const routes = Router()

routes.use("/v1/account", accountRoute)

routes.use(auth)
routes.use("/v1/user", userRoute)

export default routes