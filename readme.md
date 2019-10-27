鉴权server 后端代码部分 

相关技术: Koa Redis Cookie

相关设想分享https://www.jianshu.com/p/9f308fb20e8a

```
前端授权逻辑：
前端登陆，服务端返回cookie，颁发token，
有一个接口专门用来处理这个事情，也就是session服务，
前端在其他接口访问的时候将这个token作为authorize头部带给后端校验
cookie用户前端session拿token服务，前端不存取其他用户信息

后端校验，cookie如果存在，token也存在，对得上号，放行，那么假使此时token过期了，再给用户重发一个新的token

数据库vkey在登陆的时候塞回用户cookie，作为access token接口的唯一凭据，如果这玩意过期了或者不对，就定向登陆

cookie向服务端比对vkey的时候，查一次，然后这玩意存redis，再设定一段期限，这样频繁访问的时候稳妥一点


流程：

前端登陆 --> (账号密码) --> 颁发token和cookie给前端 --> 后端存这个 cookie | vkey 到redis

接口鉴权 --> 请求头(cookie(默认)和token) --> token正确 && cookie存在(去redis查) --> 返回数据

前端退出 --> 清除redis和cookie
```

