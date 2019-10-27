
// 如果需要使用到mongodb
const mongoose = require('mongoose')
const DB_URL = 'mongodb://localhost:27017/test'

mongoose.set('useFindAndModify', false)
mongoose.connect(DB_URL, {useNewUrlParser: true})

const models = {
    // mock: {
    //     'url': {type :String,require:true},
    //     'desc':{type:String,require:true},
    //     'type':{type:String,require:true},
    //     'owner': {type: String, require: true}
    // },
    // user: {
    //     'nickname': {type: String, require: true},
    //     'pwd': {type: String, require: true}
    // }
}


for(let m in models){
    mongoose.model(m,new mongoose.Schema(models[m]))
}

module.exports = {
    getModel:function(name){
        return mongoose.model(name)
    }
}

mongoose.connection.on('connected',function(){
    console.log('mongo connect success')
})
