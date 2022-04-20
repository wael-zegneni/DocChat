const express = require('express'); 
const cors = require('cors'); // used for requests

const app = express();
const PORT = process.env.PORT || 5000;

require('dotenv').config(); // allows us to call the env variables in our node app

app.use(cors()); // make cross origin requests
app.use(express.json()) // allows us to pass JSON payloads from the front to back
app.use(express.urlencoded())

app.get('/', (req, res) => {
    res.send('Hello, World!')
})

app.listen(PORT, ()=> console.log(`server running on port ${PORT}`))

//PAUSED AT 1:14:35