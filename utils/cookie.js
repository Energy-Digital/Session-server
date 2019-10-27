const initCookieConf = {
    expires: new Date().getTime() + (1000 * 60 * 60 * 24 * 365),      //过期时间，unix时间戳
    maxAge:  (1000 * 60 * 60 * 24 * 365),       //cookie有效时长，单位：毫秒数
    path: "/",         //cookie保存路径, 默认是'/，set时更改，get时同时修改，不然会保存不上，服务同时也获取不到
    domain: "",       //cookie可用域名，“.”开头支持顶级域名下的所有子域名
    secure: false,       //默认false，设置成true表示只有https可以访问
    httpOnly: true,     //true，客户端不可读取
    overwrite: true,    //一个布尔值，表示是否覆盖以前设置的同名的 cookie (默认是 false). 如果是 true, 在同一个请求中设置相同名称的所有 Cookie（不管路径或域）是否在设置此Cookie 时从 Set-Cookie 标头中过滤掉。
}

const CookieConfig = function(conf) {
    const retOpt = {
        ...initCookieConf,
        ...conf
    }
    return retOpt
}

module.exports = CookieConfig
