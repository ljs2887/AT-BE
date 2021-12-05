import express from 'express'
import Suggestion from '../models/Suggestions'

const router = express.Router()

router.post('/', async (req, res) => {
	try {
		const { title, content, user } = req.body

		if (!title || !content || !user) {
			return res.status(400).json({ message: '빈칸이 있으면 안됩니다.' })
		}

		const newSuggestionPost = await Suggestion.create({
			//db의 타이틀 : 프론트에서 받아온 타이틀
			title: title,
			content: content,
			user: user
		})
		await newSuggestionPost.save()
		return res.status(200).json({ message: '성공' })
	} catch (error) {
		return res.status(500).send(error)
	}
})

router.get('/', async (req, res) => {
	try {
		const suggestion = await Suggestion.find()
		return res.status(200).send(suggestion)
	} catch (error) {
		console.error(error)
		return res.status(500).send(error)
	}
})

router.get('/:id', async (req, res) => {
	try {
		const { id } = req.params
		await Suggestion.updateOne({ postId: id }, { $inc: { hits: 1 } })
		const suggestion = await Suggestion.findOne({ postId: id })
		return res.status(200).send(suggestion)
	} catch (error) {
		console.error(error)
		return res.status(500).send(error)
	}
})

router.delete('/:id', async (req, res) => {
	try {
		const { id } = req.params
		await Suggestion.deleteOne({ postId: id })
		return res.status(200).send('삭제성공')
	} catch (error) {
		console.error(error)
		return res.status(500).send(error)
	}
})

router.put('/:id', async (req, res) => {
	try {
		const { id } = req.params
		const { title, user, content } = req.body
		if (title === '' || user === '' || content === '') {
			return res.status(400).send('빈 값이 있으면 안됩니다.')
		}
		await Suggestion.updateOne(
			{ postId: id },
			{
				title: title,
				user: user,
				content: content
			}
		)
		return res.status(200).send('수정 성공')
	} catch (error) {
		console.error(error)
		return res.status(500).send(error)
	}
})

export default router
