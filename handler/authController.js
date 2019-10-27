const { Util } = require('../utils/tools')
const utils = require('utility')
const initStone = require('../utils/redis')
const CookieConfig = require('../utils/cookie')
const query = require('../utils/query')

function md5Pwd(pwd){
  const salt = 'yikesaiting'
  return utils.md5(utils.md5(pwd + salt))
}


function refreshToken(info) {
  const userInfo = info
  const token = Util.setToken(userInfo)
  return token
}

const Auth = {
  // login api
  async login(ctx, next) {
      try {
        const {username, pwd} = await Util.treamentFormData(ctx.req)
        const handlePsw = md5Pwd(pwd)
        const getCheckUserInfo = await query(
          `SELECT FROM users WHERE name = ${username} AND vkey = ${handlePsw}`
        )

        if (!getCheckUserInfo) {
          return ctx.body =({code: 1, msg: '用户名或密码错误'})
        } else {
          const userInfo = {username: findOneRes.username, vkey: findOneRes.vkey}
          const token = Util.setToken(userInfo)
          const redis = initStone() 
          redis.set(findOneRes.vkey, JSON.stringify(userInfo) , 'EX', 60 * 60 * 2) //秒为单位 2个小时redis失效
          const CookieOpt = CookieConfig()

          try {
            ctx.cookies.set('_token', findOneRes.vkey, CookieOpt)
          } catch(err) {
            console.log(err)
          }
          ctx.response.body = ({code: 0, data: {...findOneRes._doc, token}})
        }
      } catch (e) {
        ctx.response.body = e
      }
  },

  // 处理鉴权
  async accessToken(ctx, next) {
    try {
        const getCookie = ctx.request.header.cookie
       if (getCookie) {
          // redis.set('DD', 100, 'EX', 5) //秒为单位
          const parseCookie = Util.handleCookie(getCookie)
          const getCookieToken = parseCookie['_token']
          const redis = initStone() 
          const result = await redis.get(`${getCookieToken}`)
          if (result) {
            const userInfo = JSON.parse(result)
            const newToken = Util.setToken(userInfo)
            ctx.body = ({code: 0, msg: 'success' , data: {token: newToken, userInfo}})
          } else {
            const getUserInfo = await query(
              `SELECT FROM users WHERE vkey = ${handlePsw}`
            ) 
            if (getUserInfo) {
              redis.set(getUserInfo.vkey, JSON.stringify(getUserInfo) , 'EX', 60 * 60 * 2) //秒为单位 2个小时redis失效
              const newToken = Util.setToken(getUserInfo)
              ctx.body = ({code: 0, msg: 'success' , data: {token: newToken, getUserInfo}})
            } 
          }

       } else {
          ctx.status = 401
          ctx.body = ({code: -1, msg: 'fail'})
       }
    }  catch(e) {
       console.log(e)
    }
  }
}

module.exports = {
  Auth
}
