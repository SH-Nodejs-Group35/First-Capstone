const http = require('http')
const fs = require('fs')
const hostname = '127.0.0.1'
const port = 8000

const server = http.createServer((req, res)=>{
    if(req.url === "/"){
        fs.readFile('./pages/index.html', (err, file)=>{
            if(err) {
                res.writeHead(500,{"Content-Type": "text/plain"})
                return res.end("Oops! something went wrong")
            }
            res.writeHead(200,{"Content-Type": "text/html"})
            res.end(file)
        })
    }

})

server.listen(port, hostname, ()=> console.log(`Server ${hostname} running on port ${port}`))