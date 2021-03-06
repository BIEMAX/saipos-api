require('dotenv').config()

module.exports = {
    /**
     * Contains the database connection
     */
    databaseConnection: {
        server: process.env.SERVER,
        server: process.env.PORT,
        server: process.env.USER,
        server: process.env.PASSWORD,
    },
    api: {
        port: process.env.PORT
    }
}