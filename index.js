const koa = require('koa')
const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser')
const authRouter = require('./router/auth')
const { Util } = require('./utils/tools')
const app = new koa()

const unAuth = ['auth'] // 不鉴权的url

app.use(cors());
app.use(bodyParser())

app.use(authRouter.routes(), authRouter.allowedMethods())

// 鉴权中间件 
app.use(async (ctx,next)=> {
  const requestUrl = ctx.request.url
  if (unAuth.filter((item) => requestUrl.indexOf(item) > -1).length <= 0) {
    const authorization = ctx.header.authorization
    if (!ctx.header || !ctx.header.authorization) {
        ctx.status = 401
        ctx.body = ({code: -1, msg: '未登陆'})
        return
    }
    try {
      const result = await Util.checkToken(authorization)
    } catch (err) {
      ctx.status = 401
      ctx.body = ({code: -1, msg: '未登陆'})
      return
    }
  }
  await next()
})


app.listen(3000, () => {
  console.log('server run in port 3000')
})
