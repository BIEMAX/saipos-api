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
    applicationName: 'API Template',
    version: '1.0.0',
    port: process.env.PORT || '3001',
    environment: process.env.ENVIRONMENT || 'Development',
  }
}