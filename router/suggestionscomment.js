import express from 'express'
import SuggestionsComment from '../models/SuggestionsComment'
import { isValidObjectId } from 'mongoose'
import Suggestions from '../models/Suggestions'

const router = express.Router()

router.post('/:id', async (req, res) => {
	try {
		const { id } = req.params
		const { content, user, password } = req.body
		if (!isValidObjectId(id)) {
			return res.status(400).json({ message: id })
		}
		if (content === '' || user === '' || password === '') {
			return res.status(400).send('빈 값이 있으면 안됩니다')
		}
		// suggestions _id를 가지고옴
		const suggestions = await Suggestions.findById(id)
		const suggestionsComment = await SuggestionsComment.create({
			content: content,
			user: user,
			suggestions: suggestions,
			password: password
		})
		await suggestionsComment.save()
		return res.status(200).json(suggestionsComment)
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
		const suggestionsComment = await SuggestionsComment.find({
			suggestions: id
		})
		return res.status(200).json(suggestionsComment)
	} catch (error) {
		console.error(error)
		return res.status(500).send(error)
	}
})

router.delete('/:id', async (req, res) => {
	try {
		const { id } = req.params
		const { password } = req.query
		const suggestionsComment = await SuggestionsComment.findById(id)
		if (password !== suggestionsComment.password) {
			return res.status(400).send('비밀번호가 틀립니다')
		}
		await SuggestionsComment.findByIdAndDelete(id)
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
		const suggestionsComment = await SuggestionsComment.findById(id, {
			password: 0
		})
		return res.status(200).json(suggestionsComment)
	} catch (error) {
		console.error(error)
		return res.status(500).send(error)
	}
})

router.put('/:id/one', async (req, res) => {
	try {
		const { id } = req.params
		const { content, user, password } = req.body
		if (content === '' || user === '' || password === '') {
			return res.status(400).send('빈 값이 있으면 안됩니다')
		}
		const exsuggestionsComment = await SuggestionsComment.findById(id)
		if (password !== exsuggestionsComment.password) {
			return res.status(400).send('비밀번호가 틀립니다')
		}
		await SuggestionsComment.updateOne(
			{ _id: id },
			{ user: user, content: content }
		)
		return res.status(200).send('성공')
	} catch (error) {
		console.error(error)
		return res.status(500).send(error)
	}
})

export default router
