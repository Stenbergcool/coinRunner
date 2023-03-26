const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');
const { MongoWrapper } = require('./classes/mongoWrapper.js');
let mongoWrapper

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

async function mongoGetter() {
  mongoWrapper = await new MongoWrapper("mydb");
};

mongoGetter();


app.get('/', async (req, res) => {
  const allDataPoints = await mongoWrapper.find("stockholm")
  console.log(allDataPoints)
  res.json(allDataPoints)
})

app.route('/userinfo/:userid')
  .get((req, res) => {
    res.send('Get user')
  })
  .put((req, res) => {
    res.send('update user')
  })

app.route('/:location/coints')
  .get( async (req, res) => {
    const allDataPoints = await mongoWrapper.find("stockholm")
    console.log(allDataPoints)
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
    const allDataPoints = await mongoWrapper.find("stockholm")
    console.log(allDataPoints)
    res.json(allDataPoints)
  })
  .put((req, res) => {
    res.send('new coin')
  })
  .post((req, res) => {
    res.send('new coin')
  })

app.get('/allusers', async (req, res) => {
  const allDataPoints = await mongoWrapper.find("stockholm")
  console.log(allDataPoints)
  res.json(allDataPoints)
})


app.post('/createaccount', (req, res) => {
  console.log(req.body)
  let data = req.body;
  res.send('Data Received: ' + JSON.stringify(data));
})
app.post('/login', (req, res) => {
  let data = req.body;
  res.send('Data Received: ' + JSON.stringify(data));
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})