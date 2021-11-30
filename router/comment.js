import express from 'express'
import Comment from '../models/Comment'
import { isValidObjectId } from 'mongoose'
import Board from '../models/Board'

const router = express.Router()

router.post('/:id', async (req, res) => {
	try {
		const { id } = req.params
		const { content, user } = req.body
		if (!isValidObjectId(id)) {
			return res.status(400).json({ message: id })
		}
		const board = await Board.findById(id)
		const comment = await Comment.create({
			content: content,
			user: user,
			board: board
		})
		await comment.save()
		return res.status(200).json(comment)
	} catch (error) {
		console.error(error)
		return res.status(500).send(error)
	}
})

router.get('/:id', async (req, res) => {
	try {
		const { id } = req.params
		if (!isValidObjectId(id)) {
			return res.status(400).json({ message: '게시물이 없습니다.' })
		}
		const comment = await Comment.find({
			board: id
		})
		return res.status(200).json(comment)
	} catch (error) {
		console.error(error)
		return res.status(500).send(error)
	}
})

router.delete('/:id', async (req, res) => {
	try {
		const { id } = req.params
		await Comment.findByIdAndDelete(id)
		return res.status(200).send('삭제성공')
	} catch (error) {
		console.error(error)
		return res.status(500).send(error)
	}
})

router.get('/:id/one', async (req, res) => {
	try {
		const { id } = req.params
		if (!isValidObjectId(id)) {
			return res.status(400).json({ message: '게시물이 없습니다.' })
		}
		const comment = await Comment.findById(id)
		console.log(comment)
		return res.status(200).json(comment)
	} catch (error) {
		console.error(error)
		return res.status(500).send(error)
	}
})

router.put('/:id/one', async (req, res) => {
	try {
		const { id } = req.params
		const { content, user } = req.body
		if (content === '' || user === '') {
			return res.status(400).send('빈 값이 있으면 안됩니다')
		}
		await Comment.updateOne({ _id: id }, { user: user, content: content })
		return res.status(200).send('성공')
	} catch (error) {
		console.error(error)
		return res.status(500).send(error)
	}
})

export default router
