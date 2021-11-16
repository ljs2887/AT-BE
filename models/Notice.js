import mongoose from 'mongoose'
import moment from 'moment'
import shortId from 'shortid'

const dateSet = moment().format('YYYY-MM-DD')
const postId = shortId.generate()

const noticeSchema = new mongoose.Schema({
	postId: { type: String, default: postId },
	title: { type: String, required: true },
	content: { type: String, required: true },
	date: { type: String, default: dateSet },
	user: { type: String, required: true }
})

const Notice = mongoose.model('notice', noticeSchema)

export default Notice
