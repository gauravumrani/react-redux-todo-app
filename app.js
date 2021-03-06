require('dotenv').config();
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

var db = mongoose.connection;
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true});
mongoose.Promise = global.Promise;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log(`connected to ${process.env.MONGODB_URI}`)
});

app.use(cors());
// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', require('./server/routes/todo.js'));
// Point static path to dist
app.use(express.static(path.join(__dirname, 'build')));


// Catch all other routes and return the index file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build/index.html'));
});

/*app.set('views', __dirname + '/server/views');
app.set('view engine', 'ejs');*/
/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '8080';
app.set('port', port);

/**
 * Create HTTP server.
 */
//const server = http.createServer(app);
app.listen(port,()=>{
    console.log(`Site running on localhost:${port}`)
});
/**
 * Listen on provided port, on all network interfaces.
 */
//server.listen(port, () => console.log(`API running on localhost:${port}`));