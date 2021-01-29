import { Router } from "express"
import userRoute from "./userRoute"
import accountRoute from "./accountRoute"

const routes = Router()

routes.use("/v1/user", userRoute)
routes.use("/v1/account", accountRoute)

export default routes