require('dotenv').config();

const env = {
  PORT: process.env.PORT || 3333,
  NODE_ENV: process.env.NODE_ENV || 'development',
  MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/mongo',
  REDECARD_TOKEN: process.env.REDECARD_TOKEN,
  REDECARD_PV: process.env.REDECARD_PV,
  AWS_BUCKET: process.env.AWS_BUCKET,
  AWS_REGION: process.env.AWS_REGION,
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  JWT_SECRET: process.env.JWT_SECRET,
};

export default env;
