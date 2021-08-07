const mongoose = require('mongoose')

const optionMongoose = { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true };
const connectMongodb = () => {
  const urlMongoData = `mongodb+srv://${process.env.MONGO_DATABASE_USERNAME}:${process.env.MONGO_DATABASE_PASSWORD}@social-network.5ndmp.mongodb.net/social-network`
  console.log(`Connecting to database...`)
  mongoose.connect(urlMongoData, optionMongoose)
    .then(() => {
      console.log("Successfully connected to the database")
    })
    .catch((err) => {
      console.log(`Could not connect to the database. Exiting now...\n ${err}`)
      process.exit()
    })
}

module.exports = connectMongodb