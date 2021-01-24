import { IDatabase } from "./interface"
console.log(process.env.DB_NAME)
const config: { [key: string]: IDatabase } = {
    development: {
        database: <string>process.env.DB_NAME,
        host: <string>process.env.DB_HOST,
        password: <string>process.env.DB_PASS,
        port: <string>process.env.DB_PORT,
        username: <string>process.env.DB_USER,
    },
    production: {
        database: <string>process.env.DB_NAME,
        host: <string>process.env.DB_HOST,
        password: <string>process.env.DB_PASS,
        port: <string>process.env.DB_PORT,
        username: <string>process.env.DB_USER,
    },
    test: {
        database: <string>process.env.DB_NAME,
        host: <string>process.env.DB_HOST,
        password: <string>process.env.DB_PASS,
        port: <string>process.env.DB_PORT,
        username: <string>process.env.DB_USER,
    }
}

export default config