const express = require('express')
const cors = require('cors')
var bodyParser = require('body-parser')
const app = express()
 
 

const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')
app.use('/docs-api', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use(cors({ 
    origin: "http:/localhost:4001"
}))
 
const db = require("./src/models")

// force: true this will truncate the tables in the database
db.sequelize.sync({ force: false }).then(() => {
    console.log("Drop and re-sync db.")
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get("/", (req, res ) => {
    res.json({ message: "Welcome to muhallidin G. Wali Application" })
})

require("./src/routes/turorial.routes")(app)
require("./src/routes/user.routes")(app)

const PORT = process.env.PORT || 4000
app.listen(PORT, () => { 
    console.log(`Server is running on Port ${PORT}`) 
})
