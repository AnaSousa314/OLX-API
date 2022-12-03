require('dotenv').config();
const path = require('path'); 
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileupload = require('express-fileupload');

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, console.log('Connected to MongoDB!!!!'));

mongoose.Promise = global.Promise;
mongoose.connection.on('error', (error) => {
  console.log("Erro: ", error.message);
});

const server = express();

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({extended: true}));
server.use(fileupload());

server.use(express.static(path.join(__dirname, './public')));

server.get('/ping', (req,res)=>{
  res.json({pong:true})
})

server.listen(process.env.PORT, ()=>{
  console.log(`🔥🔥🔥Server started at http://localhost:${process.env.PORT} `);
})