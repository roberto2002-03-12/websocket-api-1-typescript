require('dotenv').config();

const config = {
  dbMongo: {
    url: process.env.DATABASE_URL as string,
    databaseName: process.env.DATABASE_NAME as string,
    user: process.env.DATABASE_USERNAME as string,
    password: process.env.DATABASE_PASSWORD as string
  },
  jwtSignKey: process.env.JWT_SIGN_KEY as string
}

export default config;