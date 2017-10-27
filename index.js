const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const config = require('./config/database');
const path = require('path');
const authentication = require('./routes/authentication')(router);
const authentication2 = require('./routes/authentication2')(router);
const bodyParser = require('body-parser');
const cors = require('cors');


mongoose.Promise = global.Promise;
mongoose.connect(config.uri,{ useMongoClient:true }, (err, db) => {
    if(err){
        console.log('Could not connected to database :', err);
    } else{
        console.log('Connected to database:' + config.db);
    } 
});


app.use(cors ({
    origin : 'http://localhost:4200'
}));

app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/client/dist/'));
app.use('/authentication', authentication);
app.use('/authentication2', authentication2);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/dist/index.html'));
});



app.listen(8080, () => {
    console.log('Listening to port 8080');
});