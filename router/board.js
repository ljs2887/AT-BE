import express from 'express'
import Board from '../models/Board'

const router = express.Router()

//
router.post('/', async (req, res) => {
	try {
		//req.body 는 front에서 오는거임
		const { title, content, user } = req.body

		if (!title || !content || !user) {
			return res.status(400).json({ message: '빈 값이 있으면 안됩니다.' })
		}

		const newPost = await Board.create({
			title: title, // 키 value가 같으면 title, 이렇게 써도된다.
			content: content,
			user: user
		})
		await newPost.save()
		return res.status(200).json({ message: '성공' })
	} catch (error) {
		console.error(error)
		return res.status(500).send(error)
	}
})

// 전체 게시물을 받아오는 api
router.get('/', async (req, res) => {
	try {
		const board = await Board.find()
		return res.status(200).send(board)
	} catch (error) {
		console.error(error)
		return res.status(500).send(error)
	}
})

// 해당 아이디 값의 게시물을 받아오는 api
router.get('/:id', async (req, res) => {
	try {
		const { id } = req.params
		const board = await Board.findOne({ postId: id })
		return res.status(200).send(board)
	} catch (error) {
		console.error(error)
		return res.status(500).send(error)
	}
})

router.delete('/:id', async (req, res) => {
	try {
		const { id } = req.params
		await Board.deleteOne({ postId: id })
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
			return res.status(400).send('빈 값이 있으면 안됩니다')
		}
		await Board.updateOne(
			{ postId: id },
			{ title: title, user: user, content: content }
		)
		return res.status(200).send('성공')
	} catch (error) {
		console.error(error)
		return res.status(500).send(error)
	}
})

export default router
