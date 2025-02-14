require("dotenv").config();

const ENV_VARS={
    DB_NAME:process.env.DB_NAME,
    DB_USER:process.env.DB_USER,
    DB_PASSWORD:process.env.DB_PASSWORD,
    DB_HOST:process.env.DB_HOST,
    PORT:process.env.PORT || 5000,
    JWT_SECRET:process.env.JWT_SECRET
}

module.exports={ENV_VARS}