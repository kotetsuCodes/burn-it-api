const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const port = 3000;
const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'burnit',
    host: 'localhost',
    database: 'burnit',
    password: '',
    port: 5432
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true,
})
);

app.get('/', (req, res) => {
    res.json({ info: 'Node.js, Express, and Postgres API' });
});

app.listen(port, () => {
    console.log('Burn-It listening on port 3000!');
});
