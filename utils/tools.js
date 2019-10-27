const jwt = require('jsonwebtoken')
const formidable = require("formidable")

const secret = 'saltKey'

const Util = {
    setToken:(payload)=>{
        return jwt.sign(payload, secret, { expiresIn: '2h' })
    },
    checkToken:(token)=>{
      return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, decoded) => {
          if (err) {
            reject(err)
            return
          }
          resolve(decoded)
        })
      })
    },
    handleCookie(cookie) {
       const getCookie = cookie.split(';')
       const newObj = {}
       getCookie.forEach((item) => {
            const objKey = item.split('=')[0].trim()
            const objRes = item.split('=')[1]
            newObj[objKey] = objRes
        })
        return newObj
    },
    treamentFormData: async(data) => {
      return new Promise((resolve, reject) => {
        const form = new formidable.IncomingForm()
        form.parse(data, async(err, fields, files) => {
            if(err){reject(err)}
            resolve(fields)
        });
      })
    },
}

module.exports ={
    Util
}


