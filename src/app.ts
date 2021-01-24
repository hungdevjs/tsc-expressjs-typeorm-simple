import express from "express"

import Logger from "./utils/Logger"

const app = express()

const logger: any = new Logger()
app.get("/", (req, res) => {
    logger.log("error", "Hello from the other side")
    res.send("dsdsdsds")
})

export default app