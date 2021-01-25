import express from "express"

import handleRequest from "./middlewares/handleRequest"
import handleError from "./middlewares/handleError"

import routes from "./routes/index"

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("*", handleRequest)

app.use("/api", routes)

app.get("/", (req, res) => {
    res.send("Server is runnning")
})

app.use(handleError)

export default app