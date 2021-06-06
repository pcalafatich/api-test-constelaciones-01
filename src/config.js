import { config } from "dotenv";
config();

export default {
//  MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost/apicompany",

  MONGODB_URI: process.env.MONGODB_URI || "mongodb+srv://pcalafatich:MardelPlata2019@raitnaudigital.sfum0.mongodb.net/api_company?retryWrites=true&w=majority",

  PORT: process.env.PORT || 4000,
  SECRET: 'products-api'
};
