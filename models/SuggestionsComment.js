import mongoose from 'mongoose'
import moment from 'moment'

const dateSet = moment().format('YYYY-MM-DD')

const suggestionsCommentSchema = new mongoose.Schema({
	content: { type: String, required: true },
	password: { type: String, required: true },
	user: { type: String, required: true },
	date: { type: String, default: dateSet },
	suggestions: {
		type: mongoose.Types.ObjectId,
		required: true,
		ref: 'suggestions'
	}
})

const suggestionsComment = mongoose.model(
	'suggestionsComment',
	suggestionsCommentSchema
)

export default suggestionsComment
