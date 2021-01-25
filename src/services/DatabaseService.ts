import EventEmitter = require("events")
import { createConnection } from "typeorm"
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
        return await createConnection({
            type: "mysql",
            host: "localhost",
            port: 3306,
            username: "root",
            password: "Asdfgh1@3",
            database: "pet-management",
            entities: [
                User,
            ],
            migrations: ["../migration/*.ts"],
            synchronize: true
        }).then(() => {
            console.log("Database connected successfully")
            DatabaseService.isConnected = true
            DatabaseService.logger.log("info", "database connected successfully")
        }).catch((err: Error) => {
            console.log(err)
            DatabaseService.logger.log("info", "database connection error...retrying")
            DatabaseService.emitter.emit("DB_CONNECT_ERROR")
        })
    }
    public static async handleConnectionError() {
        DatabaseService.emitter.on("DB_CONNECT_ERROR", async () => {
            DatabaseService.logger.log("info", "database connection error...retrying")
            setTimeout(async () => {
                await DatabaseService.createConnection()
            }, 3000)
        })
    }
}

export default DatabaseService
