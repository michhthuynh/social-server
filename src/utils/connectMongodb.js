const mongoose = require('mongoose');

const optionMongoose = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};
const connectMongodb = (isProduction) => {
  const urlMongoData = isProduction
    ? process.env.MONGO_DB_PROD_URL
    : process.env.MONGO_DB_DEV_URL;
  console.log(`Connecting to database...`);
  mongoose
    .connect(urlMongoData, optionMongoose)
    .then(() => {
      console.log('Successfully connected to the database');
    })
    .catch((err) => {
      console.log(`Could not connect to the database. Exiting now...\n ${err}`);
      process.exit();
    });
};

module.exports = connectMongodb;
