import winston from "winston"
const { createLogger, format, transports } = winston
const { combine, timestamp, prettyPrint } = format

class Logger {
    private logger: winston.Logger

    constructor(fileName: string) {
        this.logger = createLogger({
            format: combine(
                timestamp(),
                prettyPrint()
            ),
            transports: [
                new transports.File({ filename: `${fileName}.log` })
            ]
        })
    }

    public log(level: string, message: string) {
        this.logger.log(level, message)
    }
}

export default Logger
