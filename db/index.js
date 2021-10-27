const mysql = require('mysql')

//Dabase info will be stored in a env file of course
const pool = mysql.createPool({
    password: 'root',
    user: 'root',
    database: 'keygroup',
    host: '127.0.0.1',
    port: '3306'
})

let songsdb = {}

songsdb.random = (artistId) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM songs WHERE artist_id = ? ORDER BY RAND() LIMIT 1', [artistId], (err, results) => {
            if (err) {
                return reject(err)
            }
            return resolve(results)
        })
    })
}

songsdb.one = (artistId, songId) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM songs WHERE artist_Id = ? AND id = ?', [artistId, songId], (err, results) => {
            if (err) {
                return reject(err)
            }
            return resolve(results)
        })
    })
}

songsdb.delete = (artistId, songId) => {
    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM songs WHERE artist_Id = ? AND id = ?', [artistId, songId], (err, results) => {
            if (err) {
                return reject(err)
            }
            if (results && results.affectedRows > 0) {
                return resolve('Song deleted!')
            } else {
                return resolve('could not delete song')
            }
        })
    })
}

songsdb.put = (artistId, songId, data) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = 'UPDATE songs SET name = ?, duration = ? WHERE artist_id = ? AND id = ?'
        pool.query(sqlQuery, [data.name, data.duration, artistId, songId], (err, results) => {
            if (err) {
                return reject(err)
            }

            if (results && results.affectedRows > 0) {
                return resolve('Song Updated')
            } else {
                return resolve('Could not update song')
            }
        })
    })
}

module.exports = songsdb