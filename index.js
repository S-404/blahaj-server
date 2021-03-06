const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
require('dotenv').config()

const authRouter = require('./routes/auth/auth-routes')
const teamsRouter = require('./routes/teams/teams-routes')
const tasksRouter = require('./routes/todos/tasks-routes')
const tasksHrefsRouter = require('./routes/todos/hrefs-routes')

const apiErrorMiddleware = require("./middlewares/error-middleware")
const authMiddleware = require("./middlewares/auth-middleware")

const PORT = process.env.PORT
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({credentials: true, origin: process.env.CLIENT_URL}))

app.use('/auth', authRouter)
app.use(authMiddleware)

app.use('/teams', teamsRouter)

app.use('/todos', tasksRouter)
app.use('/todos', tasksHrefsRouter)

app.use(apiErrorMiddleware)
app.listen(PORT, function () {
    console.log(`Server is running on port ${PORT}`)
})