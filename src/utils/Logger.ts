import winston from "winston"
const { createLogger, format, transports } = winston
const { combine, timestamp, prettyPrint } = format

import { getDateTimeNow } from "./helper"

class Logger {
    private logger: winston.Logger

    constructor() {
        this.logger = createLogger({
            format: combine(
                timestamp(),
                prettyPrint()
            ),
            transports: [
                new transports.File({ filename: `${getDateTimeNow()}.log` })
            ]
        })
    }

    public log(level: string, message: string) {
        this.logger.log(level, message)
    }
}

export default Logger
