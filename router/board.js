import express from 'express'
import Board from '../models/Board'

const router = express.Router()

router.get('/', (req, res) => {
	return res.send('d')
})

router.post('/', async (req, res) => {
	try {
		const { title, content, user } = req.body

		if (!title || !content || !user) {
			return res.status(400).json({ message: '실패' })
		}

		const newPost = await Board.create({
			title,
			content,
			user
		})
		await newPost.save()
		return res.status(200).json({ message: '성공' })
	} catch (error) {
		console.error(error)
		return res.status(500).send(error)
	}
})

export default router
