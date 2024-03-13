import express from 'express'
import applicationRouter from './routes/applicationRouter'
import connectToDatabase from './connection/databaseConnection'

const app = express()

connectToDatabase()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(applicationRouter)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`connected ${PORT}`))