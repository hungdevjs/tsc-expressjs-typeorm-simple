import EventEmitter = require("events")
import { ConnectionOptions, createConnection } from "typeorm"

import config from "../configs/config"
import Logger from "../utils/Logger"
import User from "../models/entities/User"

class DatabaseService {
    public static emitter: EventEmitter = new EventEmitter()
    public static isConnected = false
    public static logger: any = new Logger()

    public static async getConnection(callback = null, wait = false) {
        DatabaseService.handleConnectionError()
        return await DatabaseService.createConnection()
    }

    public static async createConnection() {
        const dbConfig = config[`${process.env.ENV}`]

        const connection: ConnectionOptions = {
            type: "mysql",
            host: dbConfig.host,
            port: parseInt(dbConfig.port),
            username: dbConfig.username,
            password: dbConfig.password,
            database: dbConfig.database,
            entities: [
                User,
            ],
            migrations: ["../migration/*.ts"],
            synchronize: true
        }

        return await createConnection(connection).then(() => {
            console.log("Database connected successfully")
            DatabaseService.isConnected = true
        }).catch((err: Error) => {
            console.log(err)
            console.log("Retrying...")
            DatabaseService.logger.log("info", "Database connection error. Retrying...")
            DatabaseService.emitter.emit("DB_CONNECT_ERROR")
        })
    }
    public static async handleConnectionError() {
        DatabaseService.emitter.on("DB_CONNECT_ERROR", async () => {
            DatabaseService.logger.log("info", "Datebase connection error. Retrying...")
            console.log("Datebase connection error. Retrying...")
            setTimeout(async () => {
                await DatabaseService.createConnection()
            }, 3000)
        })
    }
}

export default DatabaseService
