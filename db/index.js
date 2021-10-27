const mysql = require('mysql')
const pool = mysql.createPool({
    password: 'root',
    user: 'root',
    database: 'keygroup',
    host: '127.0.0.1',
    port: '3306'
})

let songsdb = {}

songsdb.random = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM songs ORDER BY RAND() LIMIT 1', (err, results) => {
            if (err) {
                return reject(err)
            }
            return resolve(results)
        })
    })
}

songsdb.one = (id) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM songs WHERE id = ?', [id], (err, results) => {
            if (err) {
                return reject(err)
            }
            return resolve(results)
        })
    })
}

songsdb.delete = (id) => {
    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM songs WHERE id = ?', [id], (err, results) => {
            if (err) {
                return reject(err)
            }
            return resolve('Song deleted!')
        })
    })
}

songsdb.put = (id, data) => {
    return new Promise((resolve, reject) => {
        pool.query('UPDATE songs SET name = ?, duration = ?, artist = ? WHERE id = ?', [data.name, data.duration, data.artist, id], (err, results) => {
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