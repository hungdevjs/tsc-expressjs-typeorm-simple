import { Router } from "express"
import userRoute from "./userRoute"

const routes = Router()

routes.use("/v1/user", userRoute)

export default routes