const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');
const cors = require("cors");
const authRoute = require('./routes/auth.js')
const { MongoWrapper } = require('./classes/mongoWrapper.js');
let mongoWrapper

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/auth', authRoute)

async function mongoGetter() {
  mongoWrapper = await new MongoWrapper("mydb");
};

mongoGetter();


app.get('/', async (req, res) => {
  const allDataPoints = await mongoWrapper.find("stockholm")
  res.json(allDataPoints)
})

app.route('/userinfo/:userid')
  .get((req, res) => {
    res.send('Get user')
  })
  .put((req, res) => {
    res.send('update user')
  })

app.route('/:location/coins')
  .get( async (req, res) => {
    const allDataPoints = await mongoWrapper.find("stockholm")
    res.json(allDataPoints)
  })
  .post((req, res) => {
    res.send('new coin')
  })
  .put((req, res) => {
    res.send('update coin')
  })

app.route('/achivements')
  .get( async (req, res) => {
    const allDataPoints = await mongoWrapper.find("achivements")
    res.json(allDataPoints)
  })
  .put((req, res) => {
    res.send('new coin')
  })
  .post(async (req, res) => {
    console.log(req.body)
    const allDataPoints = await mongoWrapper.insertOne("achivements", req.body)
    res.status(200).send("achivement inserted");
  })
  .delete(async (req, res) => {
    console.log(req.body)
    const allDataPoints = await mongoWrapper.insertOne("achivements", req.body)
    res.status(200).send("achivement inserted");
  })

app.get('/allusers', async (req, res) => {
  const allDataPoints = await mongoWrapper.find("users")
  res.json(allDataPoints)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})