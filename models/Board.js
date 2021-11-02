import mongoose from 'mongoose'
import moment from 'moment'

const dateSet = moment().format('YYYY-MM-DD hh:mm:ss')

const boardSchema = new mongoose.Schema({
	title: { type: String, required: true },
	content: { type: String, required: true },
	date: { type: String, default: dateSet },
	user: { type: String, required: true }
})

const Board = mongoose.model('board', boardSchema)

export default Board
