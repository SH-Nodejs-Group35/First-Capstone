const http = require('http')
const fs = require('fs')
const hostname = '127.0.0.1'
const port = 8000
const os = require("os")

const server = http.createServer((req, res) => {
    // use js switch statement
    switch (req.url) {
        // this is the condition of the "/" route
        case "/":
            fs.readFile('./pages/index.html', (err, file) => {
                if (err) {
                    res.writeHead(500, { "Content-Type": "text/plain" })
                    return res.end("Oops! something went wrong")
                }
                res.writeHead(200, { "Content-Type": "text/html" })
                res.end(file)
            })
            break;
            // this is the condition of the "/about" route
        case "/about":
            fs.readFile('./pages/about.html', (err, file) => {
                if (err) {
                    res.writeHead(500, { "Content-Type": "text/plain" })
                    return res.end("Oops! something went wrong")
                }
                res.writeHead(200, { "Content-Type": "text/html" })
                res.end(file)
            })
            break;
            // this is the condition of the "/sys" route
        case "/sys":
            let osInfo = {
                hostname: os.hostname(),
                platform: os.platform(),
                architecture: os.arch(),
                numberOfCPUS: os.cpus().length,
                networkInterfaces: os.networkInterfaces(),
                uptime: os.uptime()
            }
            let data = JSON.stringify(osInfo, null, 2);
            fs.writeFile('osinfo.json', data, (err) => {
                if (err) {
                    res.writeHead(500, { "Content-Type": "text/plain" })
                    return res.end("Oops! something went wrong")
                }
                res.writeHead(201, { "Content-Type": "text/plain" })
                res.end("Your OS info has been saved successfully!")
            
            });
            break;
// this is the condition of any other route not created
        default:
            fs.readFile('./pages/404.html', (err, file) => {
                if (err) {
                    res.writeHead(500, { "Content-Type": "text/plain" })
                    return res.end("Oops! something went wrong")
                }
                res.writeHead(404, { "Content-Type": "text/html" })
                res.end("file")
            })

    }

})

server.listen(port, hostname, () => console.log(`Server ${hostname} running on port ${port}`))