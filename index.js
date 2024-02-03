const http = require('http')
const port = 5500;
const fs = require('fs')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, callBack){
        callBack(null, 'uploads/')
    },
    filename: function(req, file, callBack){
        callBack(null, file.originalname)
    }
})

const upload = multer({ storage })

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain' })
        res.write('Welcome you are now on our home page')
        res.end()
    } else if (req.url === '/about') {
        res.writeHead(200, { 'Content-Type': 'text/plain' })
        res.write('I appreciate that you want to know more about us. That is why the about page is here.')
        res.end()
    } else if (req.url === '/contact') {
        res.writeHead(200, { 'Content-Type': 'text/plain' })
        res.write('This is our contact page, and you are free to ask any questions you have about us.')
        res.end()
    } else if (req.url === '/file-write') {
        fs.writeFile('demo.txt', 'Hello World!', (error) => {
            if (error) {
                res.writeHead(200, { 'Content-Type': 'text/plain' })
                res.write('Opps! File Write is Failed')
                res.end()
            } else {
                res.writeHead(200, { 'Content-Type': 'text/plain' })
                res.write('Congratulations File Write is Success')
                res.end()
            }
        });
    } else if (req.method === 'POST' && req.url === '/uploads') {
        upload.single('myUpload')(req, res, (error) => { 
            if (error) {
                res.writeHead(500, { 'Content-Type': 'text/plain' })
                res.write('Opps! file upload is failed')
                res.end()
            } else {
                res.writeHead(200, { 'Content-Type': 'text/plain' })
                res.write('File upload is success')
                res.end()
            }
        })
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' })
        res.write('404 Error, page not found')
        res.end()
    }
})

server.listen(port, () => {
    console.log(`Server is running and listening on port 5500, Visit site here: http://localhost:${port}/`);
});