import mongoose from 'mongoose'
import moment from 'moment'

const dateSet = moment().format('YYYY-MM-DD')

const commentSchema = new mongoose.Schema({
	content: { type: String, required: true },
	user: { type: String, required: true },
	date: { type: String, default: dateSet },
	board: { type: mongoose.Types.ObjectId, required: true, ref: 'board' }
})

const Comment = mongoose.model('comment', commentSchema)

export default Comment
