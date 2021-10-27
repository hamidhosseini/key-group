const express = require('express')
const db = require('../db')

const router = express.Router()

router.get('/artists/:artistId/songs/random', async (req, res) => {
    try {
        const results = await db.random(req.params.artistId)
        res.json(results)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})

router.get('/artists/:artistId/songs/:songId', async (req, res) => {
    try {
        const results = await db.one(req.params.artistId, req.params.songId)
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



router.delete('/artists/:artistId/songs/delete/:songId', async (req, res) => {
    try {
        const results = await db.delete(req.params.artistId, req.params.songId)
        res.json(results)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})

router.put('/artists/:artistId/songs/:songId', async (req, res) => {
    if (!req.body.name || !req.body.duration) {
        res.status(400).send('Please provide valid date to update the song')
    }

    try {
        const results = await db.put(req.params.artistId, req.params.songId, req.body)
        res.send(results)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})

module.exports = router