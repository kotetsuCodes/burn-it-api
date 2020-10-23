import express from 'express'
import bodyParser from 'body-parser'
import * as env from 'env-var'
const app = express()
const port = 3000

import { User } from './models/User'
import Auth from './lib/Auth'
import { database } from './database'

require('dotenv').config()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true,
})
)

app.get('/', (req, res) => {
  res.json({ info: 'Node.js, Express, and Postgres API' })
})

app.post('/signin', async (req, res) => {
  const user = await User.findOne({ where: { email: req.body.email } })

  if (user === null) {
    return res.status(401).json({
      failed: 'Unauthorized Access. No user exists'
    })
  } else {
    Auth.comparePassword(req.body.password, user.password, (error: Error, result: boolean) => {
      if (error) {
        return res.status(401).json({
          failed: 'Unauthorized Access'
        })
      }

      if (result) {
        const jwtToken = Auth.generateJwt(user.email, user.id)

        return res.status(200).json({
          success: 'Welcome to the JWT',
          token: jwtToken
        })
      }

      return res.status(401).json({
        failed: 'Unauthorized Access'
      })
    })
  }

})

app.post('/createUser', (req, res) => {
  const authHeader: string = req.header("Authorization")

  if (typeof (authHeader) === 'undefined') {
    res.status(401).json({
      failed: 'No Authorization header was present'
    })
  }

  const decodedJwt = Auth.verifyJwt(authHeader)

  Auth.hashPassword(req.body.password, 12, (err, hash) => {
    if (err) {
      throw err
    }
    else {
      res.status(403).json({
        failed: 'User creation is disabled'
      })
    }
  })
})

app.listen(port, () => {
  console.log('Burn-It listening on port 3000!')
})
