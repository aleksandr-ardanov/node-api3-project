// require your server and launch it
require("dotenv").config();

const server = require('./api/server');

const port = process.env.PORT || 9000;


server.listen(port, () => {
    console.log(`server is up and running on port ${port}`)
})