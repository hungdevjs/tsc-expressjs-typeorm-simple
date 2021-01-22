import Logger from "./Logger"
import { getDateTimeNow } from "./helper"

export const log = (level: string, message: string) => {
    const logger = new Logger(getDateTimeNow())
    logger.log(level, message)
}