const express = require('express')
const multer = require('multer')
const upload = multer({
    dest: 'uploads/'
})
const cors = require('cors')

const app = express()

app.get('/', (req, res) => {
    res.send('hello nodejs')
})

app.options('/upload', cors())
app.post('/upload', cors(), upload.single('file'), (req, res) => {
    // res.set('Content-Type', 'text/event-stream')
    // upload.array('files', 12)

    let filename = req.file.filename
    let object = {
        id: filename
    }
    res.send(JSON.stringify(object))

    // res.send(JSON.stringify(req.files.map(file => file.filename)))
})

// app.get('/preview/:key', (req, res) => {
//     res.sendFile(`uploads/${req.params.key}`, {
//         root: __dirname,
//         headers: {
//             'Content-Type': 'image/jpeg'
//         }
//     }, (error) => {
//         res.status(404).send('file not found')
//     })
// })

app.get('/preview/:key', cors(), function (req, res, next) {
    res.sendFile(
        `uploads/${req.params.key}`, {
            root: __dirname,
            headers: {
                'Content-Type': 'image/jpeg'
            },
        },
        function (err) {
            if (err) {
                res.status(404).send('file not found')
                next(err)
            } else {
                console.log('Sent:', req.params.key)
            }
        })
})

var port = process.env.PORT || 3000
console.log(port)
app.listen(port)