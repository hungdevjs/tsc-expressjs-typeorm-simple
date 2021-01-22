import express from "express"
import { log } from "./utils"

const app = express()
const port = 3000
app.get("/", (req, res) => {
    log("error", "Hello from the other side")
    res.send("dsdsdsds")
})

app.listen(port, () => {
    console.log(`server is listening on ${port}`)
})