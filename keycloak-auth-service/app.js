const express = require('express')
const cors = require('cors')
const app = express()
const port = 9000
app.use(cors())

app.get('/', (req, res) => {
    console.log(req);
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
