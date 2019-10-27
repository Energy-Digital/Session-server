const mysql = require('mysql')

//mysql连接信息配置
const pool = mysql.createPool({
    host: "host",
    user: "username",
    password: "passord",
    database: "database",
    port: 'port'
})

// make Promsie callback by mysql
const query = function(sql, values) {
	return new Promise((resolve,reject)=>{
		pool.getConnection(function(err,connection){
			if(err) {
				reject(err)
			}else {
				connection.query(sql, values, (err, doc)=>{
					if(err) {
						rejecr(err)
					}else {
						resolve(doc)
					}
					connection.release()
				})
			}
		})
	})
}

module.exports = query