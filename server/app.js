const express = require('express')
const app = express()
const port = 3000
const { MongoWrapper } = require('./classes/mongoWrapper.js');
let mongoWrapper

async function mongoGetter() {
  mongoWrapper = await new MongoWrapper("mydb");
};

mongoGetter();


app.get('/', async (req, res) => {
  const allDataPoints = await mongoWrapper.find("stockholm")
  console.log(allDataPoints)
  res.json(allDataPoints)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})