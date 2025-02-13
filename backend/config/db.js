const { Sequelize } = require("sequelize");
const {ENV_VARS}=require('./envVars.js')

const sequelize=new Sequelize(
    ENV_VARS.DB_NAME,
    ENV_VARS.DB_USER||'root',
    ENV_VARS.DB_PASSWORD
,{
    host:ENV_VARS.DB_HOST || 'localhost',
    dialect:"mysql"
});

module.exports={sequelize};