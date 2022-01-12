// eslint-disable-next-line no-unused-vars
const dotenv = require("dotenv").config();

module.exports = {
  
	development: {
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_DATABASE,
		host: process.env.DB_HOST,
		dialect: "mysql",
		timezone: "+1:00"
	}
};

