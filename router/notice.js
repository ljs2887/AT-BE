import express from 'express'
import Notice from '../models/Notice'

const router = express.Router()

router.post('/', async (req, res) => {
	try {
		const { title, content, user } = req.body

		if (!title || !content || !user) {
			return res.status(400).json({ message: '빈 칸이 있으면 안됩니다.' })
		}

		const newNoticePost = await Notice.create({
			//db의 타이틀 : 프론트에서 받아온 타이틀
			title: title,
			content: content,
			user: user
		})
		await newNoticePost.save()
		return res.status(200).json({ message: '성공' })
	} catch (error) {
		console.error(error)
		return res.status(500).send(error)
	}
})

router.get('/', async (req, res) => {
	try {
		const notice = await Notice.find()
		return res.status(200).send(notice)
	} catch (error) {
		console.error(error)
		return res.status(500).send(error)
	}
})

// router.get('/:id', async (req, res) => {
// 	try {
// 		const { id } = req.params
// 		const notice = await Notice.findOne({ postId: id })
// 	} catch (error) {
// 		console.error(error)
// 		return req.status(500).send(error)
// 	}
// })

export default router
