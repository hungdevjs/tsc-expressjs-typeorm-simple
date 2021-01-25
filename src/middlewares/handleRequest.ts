import Logger from "../utils/Logger"

import { RequestInfo } from "../types/RequestInfo"

export default (req: any, res: any, next: any) => {
    const logger: any = new Logger()

    const requestInfo: RequestInfo = {
        requestIP: req.ip,
        method: req.method,
        url: req.originalUrl,
        statusCode: req.statusCode,
        headers: req.headers,
        time: new Date()
    }

    logger.log("info", requestInfo)
    next()
}