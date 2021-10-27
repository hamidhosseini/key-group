const express = require('express')
const db = require('../db')

const router = express.Router()

router.get('/artists/songs/random', async (req, res) => {
    try {
        const results = await db.random()
        res.json(results)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})

router.get('/artists/songs/:id', async (req, res) => {
    try {
        const results = await db.one(req.params.id)
        if (!results.length) {
            res.send('Song not found')
        } else {
            res.json(results)
        }
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})

router.get('/', (req, res) => {
    res.send('Welcome to index page...')
})



router.delete('/artists/songs/delete/:id', async (req, res) => {
    try {
        const results = await db.delete(req.params.id)
        res.json(results)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})

router.put('/artists/songs/:id', async (req, res) => {
    if (!req.body.name || !req.body.duration || !req.body.artist) {
        res.status(400).send('Please provide valid date to update the song')
    }

    try {
        const results = await db.put(req.params.id, req.body)
        res.send(results)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})

module.exports = router