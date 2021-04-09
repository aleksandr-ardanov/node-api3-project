// require your server and launch it
const server = require('./api/server');

const port = require('./api/server')

server.listen(port, () => {
    console.log(`server is up and running on port ${port}`)
})