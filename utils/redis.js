const Redis = require('ioredis')

let BaseUrl = {
    port: 6379,
    host: '127.0.0.1'
}

let initRedis = {
    port: BaseUrl.port,          // Redis init config port
    host: BaseUrl.host,         // Redis init config host
    db: 0
}

const initStone = function(config) {
    initRedis = {
        ...initRedis,
        ...config,
    }

    return new Redis(initRedis)
}

module.exports = initStone