import mongoose from 'mongoose'
import moment from 'moment'
import shortId from 'shortid'

const dateSet = moment().format('YYYY-MM-DD')
const postId = shortId.generate()

const suggestionSchema = new mongoose.Schema({
	postId: { type: String, default: postId },
	title: { type: String, required: true },
	content: { type: String, required: true },
	date: { type: String, default: dateSet },
	user: { type: String, required: true },
	hits: { type: Number, default: 0 }
})

const Suggestion = mongoose.model('suggestion', suggestionSchema)

export default Suggestion
