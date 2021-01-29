import jwt from "jsonwebtoken"

import Logger from "../utils/Logger"

const { ACCESS_TOKEN_SECRET_KEY } = process.env

export default (req: any, res: any, next: any) => {
    const token = req.headers.authorization
        ? req.headers.authorization.split(" ")[1]
        : ""

    const logger: any = new Logger()

    try {
        jwt.verify(token, ACCESS_TOKEN_SECRET_KEY)
        const userInfo = jwt.decode(token, { json: true })
        req.userId = userInfo.id
        next()
    } catch (err) {
        logger.log("error", err.message)
        res.sendStatus(401).end("Unauthorized")
    }
}