import Logger from "../utils/Logger"

export default (req: any, res: any, next: any) => {
    const { errorCode, errorMessage } = req
    if (!errorCode || !errorMessage) {
        return res.end()
    }

    const logger: any = new Logger()

    logger.log("error", errorMessage)
    res.status(errorCode).send(errorMessage)
    res.end()
}