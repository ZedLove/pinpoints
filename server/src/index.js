const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()

const middlewares = require('./middlewares')
const logs = require('./api/logs')

const app = express()

mongoose
  .connect(
    process.env.DB_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    },
    () => {
      console.log('DB connected')
    }
  )
  .catch(err => console.log(err)) // TODO - not catching anything, even though this is from their docs

app.use(morgan('common'))
app.use(helmet())
app.use(
  cors({
    origin: process.env.CORS_ORIGN
  })
)
app.use(express.json())

app.get('/', (_, res) => {
  res.json({
    message: 'msg'
  })
})

app.use('/api/logs', logs)

app.use(middlewares.notFound)

app.use(middlewares.errorHandler)

const port = process.env.PORT || '0420'

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})
