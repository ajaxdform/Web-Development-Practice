const express = require('express')
const path = require('path')

const multer  = require('multer')

const {mergePDF}  = require('./testPDF')

const upload = multer({ dest: 'uploads/' })

const app = express()

app.use('/static', express.static('public'))


const port = 3000

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "./template/index.html"))
})

app.post('/merge', upload.array('pdfs', 2), async (req, res, next) => {
    console.log(req.files)

    let date = await mergePDF(path.join(__dirname, req.files[0].path), path.join(__dirname, req.files[1].path))
    res.redirect(`http://localhost:3000/static/${date}.pdf`)
    
    // res.send({data: req.files})
    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any
  })

app.listen(port, () => {
    console.log(`listning on port: http://localhost:${port}`)
})