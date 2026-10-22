const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config();
const routes = require('./routes/routes.js');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const cors = require('cors');
app.use(cors());
app.use('/use',routes)
app.use('/admin/api', require('./routes/admin.js'));
app.use('/admin', express.static(path.join(__dirname, 'admin')));
app.get('/', (req, res) => {
    res.send('Hello, World!');
});
const  PORT = process.env.PORT || 3000 ;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
const mongo_connect = require('./model/mongo_connect.js')
const Create_Schema = require('./model/content_desc')
const Create_Schema_Second = require('./model/movie_pickup')


mongo_connect.mongo_connect();
Create_Schema.Create_Schema();
Create_Schema_Second.Create_Schema();
