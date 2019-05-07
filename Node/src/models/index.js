//modules imports
const fs = require("fs")
const path = require("path")
const Sequelize = require("sequelize")

let db = {}
//connection to database
let sequelize = new Sequelize(
    "postgres://ztetdqoh:CNmtyv-H9nQXTjlaEXD7knm97CaOr1sc@isilo.db.elephantsql.com:5432/ztetdqoh"
)
sequelize
    .authenticate() //check database connection
    .then(() => {
        console.log("connected to Postgres database")
    })
    .catch(err => {
        console.error("unable to connect to Postgres database:", err)
        return
    })

//associate models
fs.readdirSync(__dirname)
    .filter(file => file.indexOf(".") !== 0 && file !== "index.js")
    .forEach(file => {
        let model = sequelize.import(path.join(__dirname, file))
        console.log(file)
        db[model.name] = model
    })

Object.keys(db).forEach(modelName => {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db)
    }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
