import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import morgan from 'morgan'
import hpp from 'hpp'
import helmet from 'helmet'
import { PORT, MONGO_URI } from './config'
import board from './router/board'

const app = express()
const origin = 'http://localhost:3000'

app.use(hpp())
app.use(helmet())
app.use(cors({ origin, credentials: true }))
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const server = async () => {
	try {
		await mongoose.connect(MONGO_URI)
		console.log('몽구스 연결 확인')

		app.use('/board', board)

		app.listen(PORT, () => {
			return console.log(`express 서버 시작 ${PORT}`)
		})
	} catch (error) {
		console.error(error)
	}
}

server()
