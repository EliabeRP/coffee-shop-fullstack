const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  host: process.env.DATABASE_HOST,
  dialect: 'postgres',
  port: process.env.DATABASE_PORT,
  database: process.env.DATABASE,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
    'createdAt': 'created_at',
    'updatedAt': 'updated_at'
  }, 
};
