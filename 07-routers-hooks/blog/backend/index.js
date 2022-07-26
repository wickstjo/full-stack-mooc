const app = require('./app.js')
const config = require('./config.js')
const log = require('./funcs/logger.js')

// LAUNCH API SERVER
app.listen(config.api.port, () => {
    log.info(`API-SERVER RUNNING ON PORT ${ config.api.port }`)
})