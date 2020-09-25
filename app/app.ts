import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import routes from "./routes"
import mongoose from "mongoose"
import { PORT, DATABASE_URI } from "./config"

const app: express.Application = express();

const options = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.set("useFindAndModify", false)

mongoose
  .connect(DATABASE_URI, options)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    )
  )
  .catch(error => {
    throw error
  })

// parse application/json
app.use(bodyParser.json())

// use body parser to grab info from a form
app.use(bodyParser.urlencoded({ extended: true }))

// Allowing resource to be access by browsers
app.use(cors())

// set the routes
app.use(routes)