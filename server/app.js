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

const acceptedLocations = ["stockholm", "new york"]


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
    console.log(req.params.location)
    if(acceptedLocations.includes(req.params.location)) {
      const allDataPoints = await mongoWrapper.find(req.params.location)
      res.json(allDataPoints)
    } else {
      res.send("Cannot")
    }
  })
  .post((req, res) => {
    res.send('new coin')
  })
  .put((req, res) => {
    res.send('update coin')
  })


// Finished but needs token-verification
app.route('/achivements')
  .get( async (req, res) => {
    const allDataPoints = await mongoWrapper.find("achivements")
    res.json(allDataPoints)
  })
  .put(async (req, res) => {
    console.log(req.body)
    console.log({name: req.body.name})
    const allDataPoints = await mongoWrapper.updateOne("achivements", req.body._id, {name: req.body.name})
    console.log(allDataPoints)
    res.status(200).send("achivement updated");
  })
  .post(async (req, res) => {
    console.log(req.body)
    const allDataPoints = await mongoWrapper.insertOne("achivements", req.body)
    console.log(allDataPoints)
    res.status(200).send("achivement inserted");
  })
  .delete(async (req, res) => {
    console.log(req.body)
    const allDataPoints = await mongoWrapper.deleteOne("achivements", req.body._id)
    console.log(allDataPoints)
    res.status(200).send("achivement deleted");
  })

app.get('/allusers', async (req, res) => {
  const allDataPoints = await mongoWrapper.find("users")
  res.json(allDataPoints)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})