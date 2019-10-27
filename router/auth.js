const Router = require('koa-router');
const { Auth } = require('../handler/authController')

const router = new Router()

router.get('/auth/access_token', Auth.accessToken)

module.exports = router
