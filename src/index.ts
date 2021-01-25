require('dotenv').config()

import * as http from 'http'
import app from './app'
import DatabaseService from './services/DatabaseService'
import Logger from './utils/Logger'
// Composition root

const logger: any = new Logger()

DatabaseService.getConnection().then(() => {
    const server = http.createServer(app).listen(parseInt(process.env.PORT || '3000', 10))
    server.on('listening', async () => {
        logger.log('info', `Sample app listening on ${JSON.stringify(server.address())}`)
    })
    logger.log('info', `Sample app listening on ${JSON.stringify(server.address())}`)
})